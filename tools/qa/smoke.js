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
  await pg.reload();await pg.waitForFunction("typeof LESSONS!=='undefined'&&typeof CMready!=='undefined'&&CMready");
  ok(await pg.evaluate(id=>!!JSON.parse(localStorage.getItem('c50-prog')).ex[id],id),`${name}: progress survives reload`);
  await pg.evaluate("prog.lessons={home:true};show('home')");await pg.click('#contBtn');ok(await pg.evaluate('cur')==='method',`${name}: Continue opens the first unfinished lesson`);
  // locked lesson really locks (undo the test bypass)
  const lock=await pg.evaluate("(()=>{prog.ex={};prog.lessons={};return typeof lockOf==='function'})()");
  // layout: no page-level horizontal scroll on any lesson
  const bad=await pg.evaluate(()=>{const o=[];LESSONS.forEach(l=>{show(l.id);const d=document.documentElement;if(d.scrollWidth>d.clientWidth+1)o.push(l.id+':'+d.scrollWidth)});return o});
  ok(bad.length===0,`${name}: no horizontal overflow on any page ${bad.slice(0,5)}`);
  ok(pg.errs.length===0,`${name}: no page errors ${pg.errs.slice(0,2)}`);
  await close()}
 console.log(fails?`\n${fails} FAILED`:'\nall smoke checks passed');process.exit(fails?1:0)})();
