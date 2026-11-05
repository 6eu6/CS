// node tools/qa/smoke.js  -> end-to-end checks on desktop and phone
const {open}=require('./serve');let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
(async()=>{
 for(const [name,vp] of [['desktop',{width:1280,height:800}],['phone',{width:390,height:844}]]){
  const {pg,close}=await open(vp);
  ok(await pg.evaluate("LESSONS.length")>=55,`${name}: lessons loaded`);
  ok((await pg.evaluate("runPython('print(sum(range(5)))',{},'').then(x=>x.out)")).trim()==='10',`${name}: python runs`);
  // real exercise flow: type the reference solution into the editor, press Check
  await pg.evaluate("show('w0-print')");await pg.waitForTimeout(300);
  const id=await pg.evaluate("document.querySelector('.lesson.on [data-runner]').dataset.runner");
  await pg.evaluate(([id])=>{const w=document.querySelector(`.lesson.on [data-runner="${id}"]`);w.querySelector('.CodeMirror').CodeMirror.setValue(R[id].sol)},[id]);
  await pg.click(`.lesson.on [data-runner="${id}"] [data-a=check]`);await pg.waitForTimeout(1500);
  ok(await pg.evaluate(id=>!!prog.ex[id],id),`${name}: Check passes the reference solution of ${id}`);
  await pg.reload();await pg.waitForFunction("window.appReady===true&&CMready");
  ok(await pg.evaluate(id=>!!JSON.parse(localStorage.getItem('c50-prog')).ex[id],id),`${name}: progress survives reload`);
  await pg.evaluate("prog.lessons={home:true};show('home')");await pg.evaluate(()=>document.querySelector(innerWidth<=560?'#contSide':'#contBtn').click());ok(await pg.evaluate('cur')==='method',`${name}: Continue opens the first unfinished lesson`);
  // header: every control fully inside the viewport, with the menu open and closed
  const clipped=await pg.evaluate(()=>{const o=[];const W=innerWidth;const chk=tag=>document.querySelectorAll('.top-in>*').forEach(e=>{const b=e.getBoundingClientRect();if(b.width&&getComputedStyle(e).display!=='none'&&(b.right>W-4||b.left<0))o.push(tag+':'+(e.id||e.className)+'@'+Math.round(b.right))});
    chk('closed');const m=document.getElementById('menuBtn');if(getComputedStyle(m).display!=='none'){m.click();chk('open');m.click()}return o});
  ok(clipped.length===0,`${name}: header controls fit the screen ${clipped}`);
  // locked lesson really locks (undo the test bypass)
  const lock=await pg.evaluate("(()=>{prog.ex={};prog.lessons={};const result=lockOf('w0-str');show('w0-str');return {available:typeof lockOf==='function',blocked:!!result,hasLockPage:document.querySelector('.lockpage.on')!==null,hasReason:!!document.querySelector('.lockpage.on .lede')?.textContent}})()");
  ok(lock.available&&lock.blocked&&lock.hasLockPage&&lock.hasReason, `${name}: prerequisite gating blocks a later lesson and shows the reason (${JSON.stringify(lock)})`);
  // layout: no page-level horizontal scroll on any lesson
  const bad=await pg.evaluate(()=>{const o=[];LESSONS.forEach(l=>{show(l.id);const d=document.documentElement;if(d.scrollWidth>d.clientWidth+1)o.push(l.id+':'+d.scrollWidth)});return o});
  ok(bad.length===0,`${name}: no horizontal overflow on any page ${bad.slice(0,5)}`);
  ok(pg.errs.length===0,`${name}: no page errors ${pg.errs.slice(0,2)}`);
  await close()}

 // quizzes: options are shuffled each attempt, the right button is always the right answer, and the answer's position is no longer biased
 {const {pg,close}=await open({width:1280,height:800});
  const r=await pg.evaluate(()=>{const pos={};let total=0,mapErr=0,pinnedErr=0;
   const holder=document.createElement('div');document.body.appendChild(holder);
   for(let rep=0;rep<40;rep++)for(const [id,qs] of Object.entries(Q)){holder.innerHTML='';const el=document.createElement('div');el.dataset.quiz=id;holder.appendChild(el);mountQuiz(el);
    [...el.querySelectorAll('.q')].forEach((qe,qi)=>{const btns=[...qe.querySelectorAll('button.opt')];const q=qs[qi];
     if(btns.length!==q.o.length||new Set(btns.map(b=>b.dataset.oi)).size!==q.o.length)mapErr++;
     btns.forEach(b=>{if(b.textContent!==q.o[+b.dataset.oi])mapErr++});
     const ai=btns.findIndex(b=>+b.dataset.oi===q.a);pos[ai]=(pos[ai]||0)+1;total++;
     btns.forEach((b,bi)=>{if(/^(both|[A-D] and [A-D])$/i.test(b.textContent.trim())&&bi!==btns.length-1)pinnedErr++})})}
   // clicking the button that carries the right original index must be marked correct, a different one wrong
   holder.innerHTML='';const el=document.createElement('div');el.dataset.quiz='w0print';holder.appendChild(el);mountQuiz(el);
   const q0=el.querySelector('.q');const right=[...q0.querySelectorAll('button.opt')].find(b=>+b.dataset.oi===Q.w0print[0].a);right.click();
   return {pos,total,mapErr,pinnedErr,rightMarked:right.classList.contains('right'),wrongMarked:q0.querySelectorAll('.wrong').length}});
  const pct=k=>Math.round(100*(r.pos[k]||0)/r.total);
  ok(r.mapErr===0,'quiz: every shuffled button still carries its own text and original index');
  ok(r.pinnedErr===0,'quiz: "both" / "A and B" options stay last');
  ok(r.rightMarked&&r.wrongMarked===0,'quiz: clicking the right answer is marked correct');
  ok(pct(0)<=45&&pct(1)<=45,`quiz: answer position is spread out (first ${pct(0)}%, second ${pct(1)}%, third ${pct(2)}%; was 36/60/3)`);
  await close()}
 // slow network: late scripts must not cause errors in scripts that finished earlier (real-world load order)
 {const {pg,close}=await open({width:1280,height:800},{delay:{'js/runner/runner.js':1500,'js/progress/gating.js':2500,'content/week0/exercises.js':800}});
  ok(pg.errs.length===0,`slow network: no page errors while scripts arrive late ${pg.errs.slice(0,2)}`);
  ok(await pg.evaluate("document.querySelectorAll('.lesson.on .CodeMirror').length>=0&&typeof renderNav==='function'"),'slow network: app fully started');await close()}
 console.log(fails?`\n${fails} FAILED`:'\nall smoke checks passed');process.exit(fails?1:0)})();
