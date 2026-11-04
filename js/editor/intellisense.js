/* Autocomplete, signature help, hover docs */
/* ---------- docs used by autocomplete, signature help and hover */
const DOC={
 print:['print(*values, sep=" ", end="\\n")','Show values in the terminal. sep goes between values, end goes after them.'],
 input:['input(prompt="") → str','Show the prompt, wait for the user, return what they typed as a str (always text).'],
 len:['len(obj) → int','Number of items in a list/dict, or characters in a str.'],
 int:['int(x) → int','Convert to a whole number. int("42") → 42. int(4.9) → 4 (cuts, doesn\'t round).'],
 float:['float(x) → float','Convert to a decimal number. float("4.5") → 4.5.'],
 str:['str(obj) → str','The human-friendly text version of a value.'],
 repr:['repr(obj) → str','The unambiguous, developer version of a value: shows quotes, spaces and escapes. Used for debugging and logging.'],
 range:['range(start=0, stop, step=1)','Whole numbers from start up to (not including) stop.'],
 enumerate:['enumerate(iterable, start=0)','Gives (position, item) pairs while looping. enumerate(items, 1) counts from 1.'],
 zip:['zip(*iterables)','Walks several sequences in step, giving tuples: zip(names, scores) → (name, score). Stops at the shortest.'],
 sorted:['sorted(iterable, key=None, reverse=False) → list','A new sorted list. key= is a function giving the value to sort by.'],
 reversed:['reversed(seq)','Walk a sequence backwards (without copying it).'],
 min:['min(iterable, key=None, default=…)','Smallest item. key= decides what "smallest" means.'],
 max:['max(iterable, key=None, default=…)','Largest item. max(d, key=d.get) gives the key with the biggest value.'],
 sum:['sum(iterable, start=0)','Add up numbers.'],
 abs:['abs(x)','Distance from zero: abs(-3) → 3.'],
 round:['round(number, ndigits=None)','Round to ndigits decimals. Exact halves go to the even number: round(2.5) → 2.'],
 any:['any(iterable) → bool','True if at least one item is truthy.'],
 all:['all(iterable) → bool','True if every item is truthy (and True for an empty list).'],
 list:['list(iterable) → list','Make a list, e.g. list("abc") → [\'a\', \'b\', \'c\'].'],
 dict:['dict(...) → dict','Make a dictionary, e.g. dict(zip(keys, values)).'],
 set:['set(iterable) → set','Unique values only, no order.'],
 tuple:['tuple(iterable) → tuple','An unchangeable sequence.'],
 type:['type(obj)','What kind of value this is: str, int, list…'],
 isinstance:['isinstance(obj, cls) → bool','Is obj of this type? isinstance(x, int).'],
 open:['open(file, mode="r") → file','Open a file. "r" read, "w" write (erases first), "a" append.'],
 divmod:['divmod(a, b) → (a // b, a % b)','Whole part and remainder together.'],
 ord:['ord(ch) → int','The number for a character: ord("a") → 97.'],
 chr:['chr(n) → str','The character for a number: chr(97) → "a".'],
 // str
 strip:['str.strip(chars=None) → str','Copy without spaces (or the given chars) at both ends.'],lstrip:['str.lstrip(chars=None) → str','Strip the left end only.'],rstrip:['str.rstrip(chars=None) → str','Strip the right end only.'],
 lower:['str.lower() → str','Lower-case copy.'],upper:['str.upper() → str','Upper-case copy.'],title:['str.title() → str','Capitalise every word.'],capitalize:['str.capitalize() → str','First character upper, the rest lower.'],
 replace:['str.replace(old, new, count=-1) → str','Copy with every old replaced by new.'],
 split:['str.split(sep=None, maxsplit=-1) → list','Cut into a list. No sep = split on any whitespace.'],
 join:['sep.join(iterable) → str','Glue strings with sep between: ", ".join(names).'],
 startswith:['str.startswith(prefix) → bool','Does it begin with prefix?'],endswith:['str.endswith(suffix) → bool','Does it end with suffix?'],
 find:['str.find(sub) → int','Position of sub, or -1 if missing.'],count:['.count(x) → int','How many times x appears.'],
 isdigit:['str.isdigit() → bool','Only digits 0–9?'],isalpha:['str.isalpha() → bool','Only letters?'],isalnum:['str.isalnum() → bool','Only letters and digits?'],isupper:['str.isupper() → bool','All cased letters upper?'],islower:['str.islower() → bool','All cased letters lower?'],isspace:['str.isspace() → bool','Only whitespace?'],
 zfill:['str.zfill(width) → str','Pad with zeros on the left: "7".zfill(3) → "007".'],center:['str.center(width, fill=" ")','Centre in width.'],ljust:['str.ljust(width, fill=" ")','Pad on the right.'],rjust:['str.rjust(width, fill=" ")','Pad on the left.'],
 splitlines:['str.splitlines() → list','Split at line breaks.'],partition:['str.partition(sep) → (before, sep, after)','Split once at the first sep.'],format:['str.format(*args)','Older way to fill {} placeholders. f-strings are preferred.'],
 // list
 append:['list.append(x)','Add x to the end (changes the list, returns None).'],extend:['list.extend(iterable)','Add every item from another list.'],insert:['list.insert(i, x)','Put x at position i.'],remove:['list.remove(x)','Remove the first x (ValueError if missing).'],
 pop:['.pop(i=-1) / dict.pop(key, default)','List: remove and return the item at i (last by default). Dict: remove a key and return its value.'],
 sort:['list.sort(key=None, reverse=False)','Sort in place. Returns None!'],reverse:['list.reverse()','Reverse in place.'],index:['.index(x) → int','Position of the first x (ValueError if missing).'],copy:['.copy()','A shallow copy.'],clear:['.clear()','Remove everything.'],
 // dict
 get:['dict.get(key, default=None)','Value for key, or default if missing. Never raises KeyError.'],items:['dict.items()','(key, value) pairs: for k, v in d.items().'],keys:['dict.keys()','All keys.'],values:['dict.values()','All values.'],
 setdefault:['dict.setdefault(key, default)','Return d[key]; if missing, first set it to default. Great for dict of lists.'],update:['dict.update(other)','Copy pairs from other into this dict.'],
 // file
 read:['file.read() → str','The whole file as one string.'],readline:['file.readline() → str','The next line.'],readlines:['file.readlines() → list','All lines as a list.'],write:['file.write(text)','Write text exactly as given (no automatic new line).'],close:['file.close()','Close the file (with does this for you).'],
};
const KWDOC={def:'Define a function.',return:'Send a value back and end the function.',if:'Run the block only if the condition is True.',elif:'"else if": checked only if earlier conditions were False.',else:'Runs when the conditions above were False.',for:'Loop over each item of a sequence.',while:'Loop as long as the condition is True.',in:'Membership test, or "taken from" in a for loop.',break:'Leave the innermost loop now.',continue:'Skip to the next iteration.',pass:'Do nothing (a placeholder).',and:'True only if both sides are True.',or:'True if either side is True.',not:'Flip True/False.',is:'Same object? Use for None: x is None.',None:'"No value".',True:'Boolean true.',False:'Boolean false.',with:'Open a resource and close it automatically.',as:'Name the thing being opened or imported.',import:'Load a module (Week 4).',from:'Import specific names from a module.',lambda:'A tiny one-line function.',try:'Try code that might fail (Week 3).',except:'Handle an error (Week 3).',raise:'Signal an error.',global:'Use a module-level variable inside a function.',del:'Delete a name, item or key.',class:'Define a new type (Week 8).'};
const METHODS={str:['strip','lstrip','rstrip','lower','upper','title','capitalize','replace','split','join','startswith','endswith','find','count','isdigit','isalpha','isalnum','isupper','islower','isspace','zfill','center','ljust','rjust','splitlines','partition','format'],
 list:['append','extend','insert','remove','pop','sort','reverse','index','count','copy','clear'],dict:['get','items','keys','values','setdefault','update','pop','copy','clear'],file:['read','readline','readlines','write','close']};
const SNIPS=[
 {t:'for',l:'for … in range(…):',s:'for i in range($0):\n    '},{t:'for',l:'for item in items:',s:'for $0item in items:\n    '},
 {t:'while',l:'while condition:',s:'while $0:\n    '},{t:'while',l:'while True: (validation loop)',s:'while True:\n    value = input("$0")\n    if value:\n        break\n'},
 {t:'if',l:'if … :',s:'if $0:\n    '},{t:'ifelse',l:'if … else',s:'if $0:\n    \nelse:\n    '},
 {t:'def',l:'def name(params):',s:'def $0():\n    '},{t:'main',l:'def main() + call',s:'def main():\n    $0\n\n\nmain()\n'},
 {t:'with',l:'with open(…) as f:',s:'with open("$0") as f:\n    '},{t:'ifmain',l:'if __name__ == "__main__":',s:'if __name__ == "__main__":\n    main()$0'},
];
const PYKWS=Object.keys(KWDOC);
function guessType(cm,lineNo,before){
  const b=before.replace(/\s+$/,'');if(/["']$/.test(b))return 'str';
  if(/\.(strip|lower|upper|title|replace|capitalize|lstrip|rstrip|read|input)\([^()]*\)$/.test(b)||/input\([^()]*\)$/.test(b))return 'str';
  if(/\.split\([^()]*\)$/.test(b)||/\.(readlines|keys|values)\(\)$/.test(b))return 'list';
  const m=/([A-Za-z_]\w*)$/.exec(b);if(!m)return null;const name=m[1];
  for(let i=lineNo;i>=0;i--){const L=cm.getLine(i);
    let r=new RegExp('^\\s*(?:for\\s+)?'+name+'\\s*=\\s*(.+)$').exec(L);
    if(r){const rhs=r[1].trim();
      if(/^[fFrR]?["']/.test(rhs)||/^(input|str)\(/.test(rhs)||/\.(strip|lower|upper|title|replace|capitalize|read)\(/.test(rhs))return 'str';
      if(/^\[/.test(rhs)||/^list\(/.test(rhs)||/\.split\(/.test(rhs)||/^sorted\(/.test(rhs))return 'list';
      if(/^\{/.test(rhs)||/^dict\(/.test(rhs))return 'dict';if(/^open\(/.test(rhs))return 'file';return null}
    if(new RegExp('\\bas\\s+'+name+'\\b').test(L)&&/open\(/.test(L))return 'file';
    if(new RegExp('def\\s+\\w+\\([^)]*\\b'+name+'\\b').test(L))return null}
  if(/^(word|line|name|text|s|ch|letter|email|answer|title)$/.test(name))return 'str';
  if(/^(words|items|names|nums|numbers|lines|scores|lst)$/.test(name))return 'list';
  if(/^(counts|d|menu|prices|tally|totals|stock|ages)$/.test(name))return 'dict';if(name==='f')return 'file';return null}
function mkItem(text,kind,detail,doc,snip){return{text,displayText:text,kind,detail,doc,snip,render(el){el.innerHTML=`<span class="hk hk-${kind}">${{fn:'ƒ',m:'ƒ',kw:'k',var:'x',snip:'⧉'}[kind]||'•'}</span><span class="hn">${esc(this.label||text)}</span><span class="hd">${esc(detail||'')}</span>`},
  hint(cm,data,c){if(c.snip){const from=data.from,to=data.to;const ind=/^\s*/.exec(cm.getLine(from.line))[0];let s=c.snip.replace(/\n/g,'\n'+ind);const k=s.indexOf('$0');s=s.replace('$0','');cm.replaceRange(s,from,to);const idx=cm.indexFromPos(from)+(k<0?s.length:k);cm.setCursor(cm.posFromIndex(idx))}
   else cm.replaceRange(c.text+(c.kind==='fn'||c.kind==='m'?'':''),data.from,data.to)}}}
function pyHint(cm){
  const cur=cm.getCursor(),line=cm.getLine(cur.line);const tok=cm.getTokenAt(cur);if(tok.type&&/comment|string/.test(tok.type))return null;
  let start=cur.ch;while(start>0&&/\w/.test(line[start-1]))start--;const word=line.slice(start,cur.ch);
  const dot=start>0&&line[start-1]==='.';let items=[];
  if(dot){const t=guessType(cm,cur.line,line.slice(0,start-1));const kinds=t?[t]:['str','list','dict'];const seen=new Set();
    kinds.forEach(k=>METHODS[k].forEach(m=>{if(seen.has(m))return;seen.add(m);const d=DOC[m]||['',''];const it=mkItem(m,'m',t?k+' method':k+' method',d);items.push(it)}))}
  else{if(!word||/^\d/.test(word))return null;
    SNIPS.forEach(s=>{const it=mkItem(s.t,'snip',s.l,['Snippet',s.l],s.s);it.label=s.t;it.snipLabel=s.l;items.push(it)});
    PYKWS.forEach(k=>items.push(mkItem(k,'kw','keyword',['keyword '+k,KWDOC[k]])));
    Object.keys(DOC).filter(k=>!Object.values(METHODS).some(a=>a.includes(k))||['open','sorted','len'].includes(k)).forEach(k=>{if(/^[a-z]/.test(k)&&!METHODS.str.includes(k)&&!METHODS.list.includes(k)&&!METHODS.dict.includes(k)&&!METHODS.file.includes(k))items.push(mkItem(k,'fn','built-in',DOC[k]))});
    const ids=new Set();const all=cm.getValue().match(/[A-Za-z_]\w{1,}/g)||[];all.forEach(w=>{if(w!==word&&!PYKWS.includes(w)&&!DOC[w])ids.add(w)});
    ids.forEach(w=>items.push(mkItem(w,'var','in this file',['name in this file','A name defined or used in your code.'])))}
  const lw=word.toLowerCase();
  let list=items.filter(i=>i.text.toLowerCase().startsWith(lw)&&!(i.text===word&&i.kind!=='snip'));
  if(!dot&&list.length===0)return null;
  const rank={var:0,fn:1,m:1,kw:2,snip:3};list.sort((a,b)=>(a.text.length===word.length?-1:0)-(b.text.length===word.length?-1:0)||rank[a.kind]-rank[b.kind]||a.text.localeCompare(b.text));
  list=list.slice(0,40);if(!list.length)return null;
  list.forEach(i=>{if(i.kind==='snip')i.displayText=i.text});
  const data={list,from:CodeMirror.Pos(cur.line,start),to:CodeMirror.Pos(cur.line,cur.ch)};
  CodeMirror.on(data,'select',(c,el)=>showDocBox(c,el));CodeMirror.on(data,'close',hideDocBox);return data}
let docBox=null;
function showDocBox(c,el){if(!docBox){docBox=document.createElement('div');docBox.className='cm-docbox';document.body.appendChild(docBox)}
  const d=c.doc||['',''];docBox.innerHTML=`<div class="ds">${esc(c.kind==='snip'?c.snipLabel||c.detail:d[0])}</div><div>${esc(c.kind==='snip'?'Inserts:\n'+c.snip.replace('$0','▮'):d[1]||'')}</div>`;
  const ul=el.parentNode.getBoundingClientRect();docBox.style.display='block';const w=Math.min(300,window.innerWidth-24);docBox.style.width=w+'px';
  let left=ul.right+6;if(left+w>window.innerWidth-8)left=Math.max(8,ul.left-w-6);let top=ul.top;
  if(left<ul.right&&left+w>ul.left){left=Math.max(8,Math.min(ul.left,window.innerWidth-w-8));top=ul.bottom+6}
  docBox.style.left=left+'px';docBox.style.top=(top+window.scrollY)+'px'}
function hideDocBox(){if(docBox)docBox.style.display='none'}

/* signature help: find the open call around the cursor */
function sigAt(cm){const cur=cm.getCursor();const text=cm.getRange(CodeMirror.Pos(Math.max(0,cur.line-3),0),cur);let depth=0,commas=0;
  for(let i=text.length-1;i>=0;i--){const c=text[i];if(c===')'||c===']'||c==='}')depth++;else if(c==='('||c==='['||c==='{'){if(depth===0){if(c!=='(')return null;const m=/([A-Za-z_]\w*)\s*$/.exec(text.slice(0,i));if(!m||!DOC[m[1]])return null;return{name:m[1],arg:commas}}depth--}else if(c===','&&depth===0)commas++;else if(c==='\n'&&depth===0&&i<text.length-1&&/:\s*$/.test(text.slice(0,i)))return null}return null}
function renderSig(s){const d=DOC[s.name];const m=/^([^(]*\()(.*)(\)[^)]*)$/.exec(d[0]);if(!m)return esc(d[0]);
  const ps=m[2].split(/,\s*/);return esc(m[1])+ps.map((p,i)=>i===Math.min(s.arg,ps.length-1)?`<b>${esc(p)}</b>`:esc(p)).join(', ')+esc(m[3])+`<span class="sgd"> — ${esc(d[1])}</span>`}
