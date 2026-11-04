// node tools/qa/review-test.js  -> experiments on the coding-exercise review loop (real UI, real engine)
const {open}=require('./serve');let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
(async()=>{
 const {pg,close}=await open();const ev=(f,a)=>pg.evaluate(f,a);
 const WRONG='print("nope")';
 const setCode=(id,code)=>ev(([id,c])=>{const w=document.querySelector(`.lesson.on [data-runner="${id}"]`);w.querySelector('.CodeMirror').CodeMirror.setValue(c)},[id,code]);
 const check=async id=>{await pg.click(`.lesson.on [data-runner="${id}"] [data-a=check]`);await pg.waitForFunction(id=>{const b=document.querySelector(`.lesson.on [data-runner="${id}"] [data-a=check]`);return b&&!b.disabled},id,{timeout:15000});};
 await ev("show('w0-str')");await pg.waitForTimeout(400);
 const [A,B,C,D]=await ev(()=>REQ['w0-str'].filter(i=>i.kind==='Exercise').map(i=>i.key));
 const sol=id=>ev(id=>R[id].sol,id);
 // A: fail 3 times, then pass -> scheduled for review in 2 days
 for(let i=0;i<3;i++){await setCode(A,WRONG);await check(A)}
 ok(await ev(A=>prog.att[A].f,A)===3,'3 failed checks are counted');
 ok(await ev(A=>!prog.rev['ex:'+A],A),'not scheduled while still failing');
 await setCode(A,await sol(A));await check(A);
 const rv=await ev(A=>prog.rev['ex:'+A],A);ok(!!rv&&rv.iv===2&&Math.abs(rv.due-Date.now()-2*86400000)<60000,`needed 3 tries -> redo scheduled in 2 days (${JSON.stringify(rv)})`);
 // B: pass first try -> NOT scheduled
 await setCode(B,await sol(B));await check(B);
 ok(await ev(B=>!!prog.ex[B]&&!prog.rev['ex:'+B],B),'passing on the first try is not scheduled');
 // C: one fail, then pass -> NOT scheduled (below threshold)
 await setCode(C,WRONG);await check(C);await setCode(C,await sol(C));await check(C);
 ok(await ev(C=>!!prog.ex[C]&&!prog.rev['ex:'+C],C),'1 failed try then pass is not scheduled');
 // D: open the solution before passing -> scheduled
 await ev(D=>document.querySelector(`.lesson.on [data-runner="${D}"] [data-a=sol]`).click(),D);await ev(D=>document.querySelector(`.lesson.on [data-runner="${D}"] [data-a=sol]`).click(),D);
 await setCode(D,await sol(D));await check(D);
 ok(await ev(D=>!!prog.rev['ex:'+D],D),'viewing the solution before passing schedules a redo');
 // already-passed exercise: later failures must not schedule anything new
 await setCode(B,WRONG);await check(B);
 ok(await ev(B=>!prog.rev['ex:'+B]&&(prog.att[B]||{f:0}).f===0,B),'failing an exercise that is already passed changes nothing');
 // not due yet -> nothing in the review list or badge
 await ev(()=>{show('review')});await pg.waitForTimeout(300);
 ok(await ev(()=>dueList().filter(isExKey).length===0&&document.getElementById('revBadge').hidden),'nothing due today: empty list and no badge');
 // time travel: make A due. The review page shows a runner with BLANK starter code (not the learner's earlier solution)
 await ev(A=>{prog.rev['ex:'+A].due=Date.now()-1000;saveProg();show('review')},A);await pg.waitForTimeout(600);
 ok(await ev(()=>document.getElementById('revBadge').textContent==='1'&&!document.getElementById('revBadge').hidden),'badge shows 1 due');
 const starter=await ev(A=>R[A].code.trim(),A);
 const shown=await ev(A=>document.querySelector(`#reviewBox [data-runner="${A}"] .CodeMirror`).CodeMirror.getValue().trim(),A);
 ok(shown===starter,`review redo starts from the blank starter (${JSON.stringify(shown.slice(0,30))})`);
 ok(await ev(A=>(LS.get('c50-code-'+A,'')||'').includes('print'),A),'the lesson draft is untouched by the review attempt');
 // wrong answer in review: nothing changes, still due
 const rsel=`#reviewBox [data-runner="${A}"]`;
 const rcheck=async()=>{await pg.click(rsel+' [data-a=check]');await pg.waitForFunction(s=>{const b=document.querySelector(s+' [data-a=check]');return b&&!b.disabled},rsel,{timeout:15000})};
 const rset=code=>ev(([s,c])=>document.querySelector(s+' .CodeMirror').CodeMirror.setValue(c),[rsel,code]);
 await rset(WRONG);await rcheck();
 ok(await ev(A=>prog.rev['ex:'+A].iv===2&&prog.rev['ex:'+A].due<Date.now(),A),'a wrong redo leaves it due');
 // clean passes climb 2 -> 7 -> 21 -> 60 -> mastered (removed)
 const seq=[];
 for(let step=0;step<4;step++){
  await ev(A=>{const r=prog.rev['ex:'+A];if(r){r.due=Date.now()-1000;saveProg()}show('review')},A);await pg.waitForTimeout(500);
  await rset(await sol(A));await rcheck();
  seq.push(await ev(A=>prog.rev['ex:'+A]?prog.rev['ex:'+A].iv:'mastered',A))}
 ok(seq.join(',')==='7,21,60,mastered',`clean redos: interval 2 -> ${seq.join(' -> ')}`);
 // using the solution in a redo resets to 2 days
 await ev(D=>{prog.rev['ex:'+D].iv=21;prog.rev['ex:'+D].due=Date.now()-1000;saveProg();show('review')},D);await pg.waitForTimeout(500);
 const dsel=`#reviewBox [data-runner="${D}"]`;
 await ev(s=>{const b=document.querySelector(s+' [data-a=sol]');b.click();b.click()},dsel);
 await ev(([s,c])=>document.querySelector(s+' .CodeMirror').CodeMirror.setValue(c),[dsel,await sol(D)]);
 await pg.click(dsel+' [data-a=check]');await pg.waitForFunction(s=>{const b=document.querySelector(s+' [data-a=check]');return b&&!b.disabled},dsel,{timeout:15000});
 ok(await ev(D=>prog.rev['ex:'+D].iv===2,D),'a redo that used the solution goes back to 2 days');
 // merge between devices: union of attempts and review entries, never loses anything
 const m=await ev(()=>{const a={att:{x:{f:2,s:0}},rev:{'ex:x':{iv:7,due:5}},ex:{x:true}},b={att:{x:{f:1,s:1},y:{f:4,s:0}},rev:{'ex:x':{iv:2,due:9}},ex:{y:true}};const r=mergeProg(a,b);return {att:r.att,rev:r.rev['ex:x'],ex:Object.keys(r.ex)}});
 ok(m.att.x.f===2&&m.att.x.s===1&&m.att.y.f===4&&m.rev.iv===7&&m.ex.length===2,`mergeProg keeps the most progress (${JSON.stringify(m)})`);
 ok(pg.errs.length===0,`no page errors ${pg.errs.slice(0,2)}`);
 console.log(fails?`\n${fails} FAILED`:'\nall review-loop checks passed');await close();process.exit(fails?1:0)})();
