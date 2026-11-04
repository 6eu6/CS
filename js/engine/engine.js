/* Python in the browser: REAL CPython 3.12 (Pyodide) running in a Web Worker.
   The worker is terminated if a program runs too long (a "while True" can never freeze the page). */
let engine='loading';const waiters=[];
function setEngine(s){engine=s;const e=$('#engineStatus');if(e)e.textContent=s==='ready'?'Python engine: ready ✓ (real CPython 3.12)':s==='failed'?'Python engine could not load. Use Copy code and run in your Codespace.':'Python engine: loading… (first visit downloads about 13 MB)';waiters.splice(0).forEach(f=>f())}
function loadScript(src){return new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s)})}

function prelude(files,stdin){
  const L=['_VFS = {}',...Object.entries(files||{}).map(([k,v])=>`_VFS[${JSON.stringify(k)}] = ${JSON.stringify(v)}`),
  `_STDIN = ${JSON.stringify(stdin==null?[]:String(stdin).replace(/\r/g,'').split('\n'))}`,
  '_STDPOS = [0]',
  '_orig_sorted = sorted',
  'def sorted(iterable, key=None, reverse=False):',
  '    items = list(iterable)',
  '    if reverse:',
  '        items.reverse()',
  '        result = _orig_sorted(items, key=key)',
  '        result.reverse()',
  '        return result',
  '    return _orig_sorted(items, key=key)',
  'def input(prompt=""):',
  '    if _STDPOS[0] >= len(_STDIN):',
  '        print(prompt)',
  '        raise EOFError("EOF when reading a line (the program asked for more input than was given)")',
  '    v = _STDIN[_STDPOS[0]]',
  '    _STDPOS[0] = _STDPOS[0] + 1',
  '    print(str(prompt) + "\\u2063" + v + "\\u2063")',
  '    return v',
  'try:','    FileNotFoundError','except NameError:','    class FileNotFoundError(Exception):','        pass',
  'class _VFile:',
  '    def __init__(self, name, mode):',
  '        self.name = name','        self.mode = mode','        self._pos = 0',
  '        if "r" in mode:',
  '            if name not in _VFS:','                raise FileNotFoundError("[Errno 2] No such file or directory: \'" + name + "\'")',
  '        elif "w" in mode:','            _VFS[name] = ""',
  '        elif "a" in mode:','            if name not in _VFS:','                _VFS[name] = ""',
  '    def read(self):','        d = _VFS[self.name][self._pos:]','        self._pos = len(_VFS[self.name])','        return d',
  '    def readlines(self):','        out = []','        cur = ""','        for ch in self.read():','            cur = cur + ch','            if ch == "\\n":','                out.append(cur)','                cur = ""','        if cur != "":','            out.append(cur)','        return out',
  '    def __iter__(self):','        return iter(self.readlines())',
  '    def write(self, s):','        if not isinstance(s, str):','            raise TypeError("write() argument must be str, not " + type(s).__name__)','        _VFS[self.name] = _VFS[self.name] + s','        return len(s)',
  '    def close(self):','        pass','    def __enter__(self):','        return self','    def __exit__(self, a, b, c):','        return False',
  'def open(name, mode="r", encoding=None, newline=None):','    return _VFile(name, mode)',
  'def _dump():','    print("@@VFS@@")','    for k in _VFS:','        print("@@F@@" + k)','        print(_VFS[k] + "@@E@@")',''];
  return L.join('\n')}
const INP='\u2063';
function parseRun(out){const k=out.lastIndexOf('@@VFS@@\n');const user=k>=0?out.slice(0,k):out.replace(/@@VFS@@[\s\S]*$/,'');const vfs={};
  if(k>=0)out.slice(k+8).split('@@F@@').slice(1).forEach(ch=>{const nl=ch.indexOf('\n');vfs[ch.slice(0,nl)]=ch.slice(nl+1).replace(/@@E@@\n?$/,'')});return{user,vfs}}

/* ---- worker client ---- */
const RUN_LIMIT_MS=5000;
let pyWorker=null;const pyJobs=new Map();let pySeq=0;
function spawnPython(){
  setEngine('loading');
  try{pyWorker=new Worker('js/engine/pyodide-worker.js')}catch(e){setEngine('failed');return}
  const w=pyWorker;
  w.onmessage=ev=>{if(w!==pyWorker)return;const m=ev.data;
    if(m.type==='ready')setEngine('ready');
    else if(m.type==='fail'){console.error('Pyodide failed:',m.error);setEngine('failed')}
    else if(m.type==='start'){const j=pyJobs.get(m.id);if(j)j.timer=setTimeout(()=>killPython(m.id),RUN_LIMIT_MS)}
    else if(m.type==='result'){const j=pyJobs.get(m.id);if(!j)return;clearTimeout(j.timer);pyJobs.delete(m.id);j.finish(m)}};
  w.onerror=ev=>{if(w===pyWorker){console.error(ev.message||ev);setEngine('failed')}}}
function killPython(id){ // the program ran too long: stop the worker, answer the job, start a fresh engine
  const j=pyJobs.get(id);try{pyWorker.terminate()}catch(_){}
  pyJobs.forEach((x,k)=>{clearTimeout(x.timer);if(k===id)x.resolve({ok:false,out:'',err:'Your program ran too long. Is it waiting forever, or stuck repeating?',files:null});else x.resolve({ok:false,out:'',err:'The Python engine restarted. Run it again.',files:null})});
  pyJobs.clear();spawnPython()}
function runPython(code,files,stdin){return new Promise(resolve=>{
  if(engine!=='ready'){resolve({ok:false,out:'',err:'The Python engine is not available. Copy the code into your Codespace to run it.',files:null});return}
  const pre=prelude(files,stdin);const preLines=pre.split('\n').length;const uLines=code.split('\n').length;
  const full=pre+'\n'+code.replace(/\t/g,'    ')+'\n_dump()\n';const id=++pySeq;
  const finish=m=>{const p=parseRun(m.out||'');
    if(!m.err){resolve({ok:true,out:p.user,err:'',files:p.vfs});return}
    const L=m.line!=null&&m.line-preLines>0&&m.line-preLines<=uLines?m.line-preLines:null;
    resolve({ok:false,out:p.user,err:m.err+(L!==null?` (line ${L})`:''),files:null})};
  pyJobs.set(id,{resolve,finish,timer:null});pyWorker.postMessage({id,src:full})})}
spawnPython();
function explainErr(e){
  const m=[[/NameError: name '(\w+)'/,n=>`Python doesn't know <b>${esc(n)}</b>. Check the spelling, check it's defined before this line, and check it's not inside another function (scope). If you meant text, put it in quotes.`],
   [/EOFError/,()=>`The program called input() more times than there were lines in the Input box.`],
   [/ValueError: invalid literal for int/,()=>`int() was given text that isn't a whole number (like "4.5" or "abc"). Use float() for decimals, or check the input.`],
   [/ValueError: could not convert string to float/,()=>`float() was given text that isn't a number.`],
   [/ValueError.*unpack/,()=>`split() produced a different number of pieces than the variables on the left.`],
   [/IndentationError|expected an indented block|unindent/,()=>`The spaces at the start of a line don't fit. A def body needs 4 spaces more than the def line, consistently.`],
   [/SyntaxError/,()=>`Python can't read the shape of this line. Look for a missing bracket, quote, colon or comma, on that line or the one above.`],
   [/TypeError:.*concatenate|can only concatenate|unsupported operand.*str/,()=>`You mixed text and a number with +. Convert with int()/float() for maths, or use an f-string to build text.`],
   [/NoneType/,()=>`A value is None. Usually a function printed instead of returning.`],
   [/TypeError:.*argument/,()=>`A function got the wrong number of arguments. Compare the call with the def line.`],
   [/AttributeError/,()=>`That kind of value doesn't have that method. For example, numbers have no .upper().`],
   [/ZeroDivisionError/,()=>`You divided by zero.`]];
  for(const[re,f]of m){const x=re.exec(e);if(x)return `\n<span class="why">→ ${f(x[1])}</span>`}return ''}
