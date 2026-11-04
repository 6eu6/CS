/* The exercise runner (editor + run + check + hints) */
/* ======================================================= runner (rewritten for the editor, files and staged projects) */
function mountRunner(el){
  const id=el.dataset.runner,d=R[id];if(!d)return;const draftKey='c50-code-'+id;
  const stages=d.stages||null;let stage=stages?Math.min(Math.max(prog.stage&&prog.stage[id]||0,LS.get('c50-stage-'+id,0)),stages.length-1):0;
  const carried=d.carry&&prog.ex[d.carry]?(LS.get('c50-code-'+d.carry,null)||(prog.drafts&&prog.drafts[d.carry]&&prog.drafts[d.carry].code)):null;
  const init={'main.py':carried||d.code,...(d.files||{})};const buf={...init,'main.py':LS.get(draftKey,null)??(prog.drafts&&prog.drafts[id]&&prog.drafts[id].code)??init['main.py']};
  const names=Object.keys(init);let active='main.py';
  const lvlName={l1:'Warm-up',l2:'Core',l3:'Challenge',l4:'Scenario',l5:'Boss',dbg:'Debug',proj:'Project'}[d.lvl]||'Try it';el.dataset.lvl=d.lvl||'';
  const hasIn=d.stdin!==undefined;
  el.innerHTML=`<div class="widget-h"><b>${esc(d.title)}</b><span class="row" style="gap:6px"><span class="badge ${d.lvl||''}">${lvlName}</span><span class="badge pass" data-pb ${prog.ex[id]?'':'hidden'}>Passed</span></span></div>
  ${stages?'<div class="stages" role="tablist"></div>':''}<div class="task"></div>
  <div class="ide"><div class="tabs"></div><div class="edhost"><div class="editor"><div class="gutter" aria-hidden="true"></div><textarea spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Code editor for ${esc(d.title)}" id="ed-${id}"></textarea></div></div>
  <div class="sigbar" hidden></div><div class="statusbar"><span data-pos>Ln 1, Col 1</span><span>Spaces: 4</span><span>UTF-8</span><span data-lang>Python</span></div></div>
  ${hasIn?`<div class="stdin-box"><label class="lbl" for="in-${id}">Input: what the user types, one line per input() call</label><textarea id="in-${id}" rows="${Math.max(1,String(d.stdin).split('\n').length)}" spellcheck="false" autocapitalize="off">${esc(d.stdin)}</textarea></div>`:''}
  <div class="row"><button class="btn pri" data-a="run">▶ Run</button>${(d.tests||stages)?'<button class="btn chk50" data-a="check">✓ Check</button>':''}<button class="btn" data-a="reset">Reset</button>${(d.sol||stages)?'<button class="btn" data-a="hint">Hint</button><button class="btn" data-a="sol">Solution</button>':''}<button class="btn" data-a="copy">Copy code</button><span class="engine kb">Ctrl+Enter runs · Ctrl+Space suggests · Ctrl+/ comments</span></div>
  <div class="hintbox" hidden></div><div class="console" aria-live="polite"><span class="dim">Run shows the output here. Check runs all the tests.</span></div><div class="filesout"></div><div class="resbox"></div>`;
  const tabs=el.querySelector('.tabs'),host=el.querySelector('.edhost'),ta=el.querySelector('#ed-'+id),gut=el.querySelector('.gutter'),con=el.querySelector('.console'),res=el.querySelector('.resbox'),fo=el.querySelector('.filesout'),sig=el.querySelector('.sigbar'),posEl=el.querySelector('[data-pos]'),langEl=el.querySelector('[data-lang]'),taskEl=el.querySelector('.task');
  let cm=null,docs={},errW=null,errLine=null;
  const getF=n=>cm&&docs[n]?docs[n].getValue():buf[n];
  function drawTask(){const s=stages?stages[stage]:d;taskEl.innerHTML=`<div>${s.task}</div>${s.spec?`<div class="spec">${esc(s.spec)}</div>`:''}`;
    if(stages){const sb=el.querySelector('.stages');sb.innerHTML=stages.map((s,i)=>{const done=prog.ex[id+'#'+i];const locked=i>0&&!prog.ex[id+'#'+(i-1)]&&i!==stage;return `<button class="stg ${i===stage?'on':''} ${done?'done':''}" data-s="${i}" ${locked?'disabled title="Pass the previous step first"':''}>${done?'✓ ':''}Step ${i+1}: ${esc(s.title)}</button>`}).join('')}}
  if(stages)el.querySelector('.stages').onclick=e=>{const b=e.target.closest('[data-s]');if(!b||b.disabled)return;stage=+b.dataset.s;LS.set('c50-stage-'+id,stage);prog.stage[id]=stage;drawTask();res.innerHTML=''};
  function drawTabs(){tabs.innerHTML=names.map(n=>{const L=langOf(n);return `<button class="tab ${n===active?'on':''}" data-tab="${esc(n)}"><span class="ft ft-${L.tag}">${L.tag==='py'?'py':L.tag}</span>${esc(n)}</button>`}).join('')}
  function fit(){const nl=ta.value.split('\n').length;gut.textContent=Array.from({length:nl},(_,i)=>i+1).join('\n');ta.rows=Math.min(Math.max(nl+1,5),28)}
  function load(){langEl.textContent=langOf(active).label;if(cm){if(!docs[active])docs[active]=CodeMirror.Doc(buf[active],langOf(active).mode);cm.swapDoc(docs[active]);updPos()}else{ta.value=buf[active];fit()}}
  function persist(){if(cm)buf[active]=cm.getValue();else buf[active]=ta.value;if(active==='main.py'){LS.set(draftKey,buf['main.py']);if(d.lvl==='proj'&&buf['main.py']!==(prog.drafts[id]&&prog.drafts[id].code)){prog.drafts[id]={code:buf['main.py'],at:Date.now()}}}}
  function updPos(){if(!cm)return;const c=cm.getCursor();posEl.textContent=`Ln ${c.line+1}, Col ${c.ch+1}`;const s=langOf(active).mode==='python'?sigAt(cm):null;if(s){sig.hidden=false;sig.innerHTML=renderSig(s)}else sig.hidden=true}
  function clearErr(){if(errW){errW.clear();errW=null}if(errLine!=null&&cm){cm.removeLineClass(errLine,'background','cm-errline');errLine=null}}
  function markErr(err){const m=/\(line (\d+)\)\s*$/.exec(err);if(!m||!cm)return;if(active!=='main.py'){active='main.py';drawTabs();load()}
    const ln=+m[1]-1;if(ln<0||ln>=cm.lineCount())return;clearErr();errLine=cm.addLineClass(ln,'background','cm-errline');const w=document.createElement('div');w.className='cm-errlens';w.textContent=err.replace(/\s*\(line \d+\)\s*$/,'');errW=cm.addLineWidget(ln,w,{coverGutter:false,noHScroll:true})}
  tabs.onclick=e=>{const b=e.target.closest('[data-tab]');if(!b)return;persist();active=b.dataset.tab;drawTabs();load()};
  ta.addEventListener('input',()=>{persist();fit()});ta.addEventListener('scroll',()=>{gut.scrollTop=ta.scrollTop});
  ta.addEventListener('keydown',e=>{if(e.key==='Tab'&&!e.shiftKey){e.preventDefault();ta.setRangeText('    ',ta.selectionStart,ta.selectionEnd,'end');persist();fit()}
    else if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();run()}
    else if(e.key==='Enter'){const s=ta.selectionStart;const ls=ta.value.lastIndexOf('\n',s-1)+1;const line=ta.value.slice(ls,s);let ind=/^ */.exec(line)[0];if(/:\s*$/.test(line))ind+='    ';e.preventDefault();ta.setRangeText('\n'+ind,s,ta.selectionEnd,'end');persist();fit()}});
  drawTabs();drawTask();load();
  el._upgrade=()=>{if(cm||!CMready)return;persist();gut.parentNode.hidden=true;cm=makeCM(host,run,()=>{clearErr();persist()});
    cm.on('cursorActivity',updPos);cm.on('blur',()=>{sig.hidden=true});cm.getWrapperElement().classList.add('cm-ide');load();setTimeout(()=>cm.refresh(),0)};
  const stdinEl=()=>el.querySelector('#in-'+id);
  function showOut(r){const parts=r.out.split(INP);let h='';parts.forEach((p,i)=>{h+=i%2?`<span class="inp">${esc(p)}</span>`:esc(p)});
    if(r.err)h+=`<span class="err">${esc(r.err)}</span>${explainErr(r.err)}`;con.innerHTML=h||'<span class="dim">(the program printed nothing)</span>';if(r.err)markErr(r.err);else clearErr()}
  async function ready(){if(engine==='loading')await new Promise(r=>waiters.push(r))}
  const dataFiles=()=>{const o={};names.slice(1).forEach(n=>o[n]=getF(n));return o};
  async function run(){persist();const b=el.querySelector('[data-a=run]');b.disabled=true;b.textContent='Running…';await ready();
    const files=dataFiles();const r=await runPython(getF('main.py'),files,hasIn?stdinEl().value:'');b.disabled=false;b.textContent='▶ Run';showOut(r);renderFiles(fo,files,r.files);res.innerHTML=''}
  async function check(){persist();const b=el.querySelector('[data-a=check]');b.disabled=true;b.textContent='Checking…';await ready();
    const tests=stages?stages[stage].tests:d.tests;const extra=stages?stages[stage].extra:d.extra;const code=getF('main.py');const files=dataFiles();
    const rows=[];let all=true;
    for(const t of tests){const r=await runPython(t.after?code+'\n'+t.after:code,t.files||files,t.inp);let ok,det;
      if(!r.ok){ok=false;det=`Error: ${r.err}`}
      else if(t.file){const f=r.files&&r.files[t.file];const got=f==null?null:norm(f);ok=got===norm(t.exp);det=ok?'':(got==null?`${t.file} was not created.`:`${t.file} differs. expected (first lines):\n${norm(t.exp).split('\n').slice(0,8).join('\n')}\nactual (first lines):\n${got.split('\n').slice(0,8).join('\n')}`)}
      else{const got=lastLines(r.out,t.exp.split('\n').length);ok=got===t.exp;det=ok?'':`expected:\n${t.exp}\nactual:\n${got||'(nothing)'}`}
      if(!ok)all=false;rows.push({ok,label:t.label||(t.inp?`input ${JSON.stringify(t.inp.replace(/\n/g,' ⏎ '))} → ${JSON.stringify(t.exp.split('\n')[0])}${t.exp.includes('\n')?'…':''}`:'prints the expected output'),det});
      if(t===tests[0]){showOut(r);renderFiles(fo,files,r.files)}}
    let note=null;if(all&&extra){note=extra(code);if(note)all=false}
    b.disabled=false;b.textContent='✓ Check';
    res.innerHTML=`<ul class="checks">${rows.map(x=>`<li class="${x.ok?'p':'f'}"><span class="ic">${x.ok?':)':':('}</span><span>${esc(x.label)}${x.det?`<div class="det">${esc(x.det)}</div>`:''}</span></li>`).join('')}${note?`<li class="f"><span class="ic">:|</span><span>${esc(note)}</span></li>`:''}</ul>`+
      (all?`<div class="result pass" style="margin-top:8px">${stages?(stage<stages.length-1?`Step ${stage+1} passed. Step ${stage+2} is unlocked.`:'Project complete. All steps passed.'):'All tests passed.'}</div>`:'');
    if(all){if(stages){passEx(id+'#'+stage);if(stage===stages.length-1){passEx(id);el.querySelector('[data-pb]').hidden=false}else{stage++;LS.set('c50-stage-'+id,stage);prog.stage[id]=stage;saveProg()}drawTask()}else{passEx(id);el.querySelector('[data-pb]').hidden=false}}}
  el.querySelector('[data-a=run]').onclick=run;const cb=el.querySelector('[data-a=check]');if(cb)cb.onclick=check;
  el.querySelector('[data-a=reset]').onclick=()=>{if(el._hp)el._hp.reset();Object.assign(buf,init);LS.set(draftKey,null);docs={};active='main.py';drawTabs();load();if(hasIn)stdinEl().value=d.stdin;res.innerHTML='';fo.innerHTML='';clearErr();con.innerHTML='<span class="dim">Reset to the starting code.</span>'};
  const sb=el.querySelector('[data-a=sol]');if(sb)sb.onclick=function(){if(!this.dataset.c){this.dataset.c=1;this.textContent='Really? Tap again';return}delete this.dataset.c;this.textContent='Solution';
    const sol=stages?stages[stage].sol:d.sol;const old=el.querySelector('details.solbox');if(old)old.remove();const pre=document.createElement('details');pre.className='more solbox';pre.open=true;
    pre.innerHTML=`<summary>One possible solution${stages?` (step ${stage+1})`:''}</summary><div><pre><code>${hlPy(sol)}</code></pre><p class="engine">Other correct answers exist. Read it, close it, then type your own version from memory.</p></div>`;sb.closest('.row').after(pre)};
  const hp=hintPanel(el,id,d,()=>stages?stage:null,()=>{persist();return getF('main.py')},()=>con.textContent+'\n'+res.textContent);
  el._hp=hp;const hb=el.querySelector('[data-a=hint]');if(hb)hb.onclick=()=>hp.next();
  el.querySelector('[data-a=copy]').onclick=function(){persist();const t=getF('main.py');const done=()=>this.textContent='Copied';const fail=()=>{if(cm){cm.focus();cm.execCommand('selectAll')}else{ta.focus();ta.select()}this.textContent='Selected: press Ctrl+C'};try{navigator.clipboard.writeText(t).then(done,fail)}catch(e){fail()}};
}
function upgradeIn(lesson){if(!lesson||!CMready)return;lesson.querySelectorAll('[data-runner]').forEach(w=>{if(w._upgrade&&!w.hidden)w._upgrade()})}
const _showLesson=show;show=function(id){_showLesson(id);upgradeIn($('.lesson.on'))};
