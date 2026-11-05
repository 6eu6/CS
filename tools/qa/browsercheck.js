// node tools/qa/browsercheck.js
// 1) every reference solution passes every test THROUGH THE SITE'S OWN ENGINE (worker + prelude + same comparison as the Check button)
// 2) engine behaviour: errors with line numbers, infinite loop is stopped and the engine recovers, output cap, match statement, input echo
const {open}=require('./serve');let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
(async()=>{const {pg,close}=await open();
 const res=await pg.evaluate(async()=>{const bad=[];let n=0,extraBad=[];
  for(const [id,d] of Object.entries(R)){const stages=d.stages||(d.tests?[{tests:d.tests,sol:d.sol,extra:d.extra}]:[]);
   for(const [si,st] of stages.entries()){
    if(st.extra){const note=st.extra(st.sol);if(note)extraBad.push(id+':'+si+' '+note)}
    for(const [ti,t] of st.tests.entries()){n++;const files={...(d.files||{})};
     const r=await runPython(t.after?st.sol+'\n'+t.after:st.sol,t.files||files,t.inp);let good;
     if(!r.ok)good=false;
     else if(t.file){const f=r.files&&r.files[t.file];good=f!=null&&norm(f)===norm(t.exp)}
     else good=lastLines(r.out,t.exp.split('\n').length)===t.exp;
     if(!good)bad.push(`${id} stage${si} test${ti}: ${r.ok?'wrong output':r.err}`)}}}
  return {n,bad,extraBad}});
 const lessonInventory=await pg.evaluate(()=>{const ids=LESSONS.map(l=>l.id);const missing=[];LESSONS.forEach(l=>{if(l.el.dataset.id!==l.id)missing.push(l.id+': data-id mismatch');l.el.querySelectorAll('[data-runner],[data-parsons],[data-blanks],[data-bug],[data-quiz],[data-predict]').forEach(w=>{const pairs=[['runner',R],['parsons',PARS],['blanks',BLANKS],['bug',BUGS],['quiz',Q],['predict',PRED]];for(const [attr,registry] of pairs){const id=w.dataset[attr];if(id&&!(id in registry))missing.push(l.id+': '+attr+' '+id)}})});return {duplicates:ids.filter((id,i)=>ids.indexOf(id)!==i),missing,empty:LESSONS.filter(l=>!l.title||!l.el.querySelector('h1')).map(l=>l.id)}});
 ok(lessonInventory.duplicates.length===0, `lesson IDs are unique ${lessonInventory.duplicates}`);
 ok(lessonInventory.missing.length===0, `every mounted interactive widget resolves to a registry entry ${lessonInventory.missing.slice(0,5)}`);
 ok(lessonInventory.empty.length===0, `every manifest lesson has a title and h1 ${lessonInventory.empty}`);
 ok(res.bad.length===0,`all ${res.n} reference tests pass in the in-browser engine ${res.bad.slice(0,5).join(' | ')}`);
 ok(res.extraBad.length===0,`every reference solution satisfies its extra() rule ${res.extraBad.slice(0,3)}`);
 const inventory=await pg.evaluate(()=>({items:REQ['w0-vars'].map(x=>x.kind),labels:REQ['w0-vars'].map(x=>x.label)}));
 ok(inventory.items.filter(x=>x==='Exercise').length===5&&inventory.items.filter(x=>x==='Quiz').length===1&&inventory.items.length===6,`Week 0 Variables inventory is explicit: 5 coding exercises + 1 quiz (${inventory.items.join(', ')})`);
 const run=(code,stdin)=>pg.evaluate(([c,s])=>runPython(c,{},s||''),[code,stdin]);
 let r=await run('print("hi")\nx = 5\nprint(y)');ok(!r.ok&&/NameError: name 'y' is not defined \(line 3\)/.test(r.err)&&r.out.trim()==='hi',`NameError reported with the user's line number and partial output kept (${r.err})`);
 r=await run('print("a")\n\ndef f(:\n    pass');ok(!r.ok&&/SyntaxError/.test(r.err)&&/\(line 3\)/.test(r.err),`SyntaxError line number is the user's (${r.err})`);
 r=await run('n = int(input())\nprint(n * 2)','21');ok(r.ok&&r.out.replace(/[^\n]*⁣[^⁣]*⁣\n?/g,'').trim()==='42',`input() reads the Input box and echoes it (${JSON.stringify(r.out)})`);
 r=await run('a = input()\nb = input()','one');ok(!r.ok&&/EOFError/.test(r.err),`asking for more input than was given is a clear EOFError (${r.err})`);
 r=await run('match 3:\n    case 1:\n        print("one")\n    case 3:\n        print("three")');ok(r.ok&&r.out.trim()==='three',`match statement works (${r.ok?r.out.trim():r.err})`);
 r=await run('import sys\nprint("before")\nsys.exit()\nprint("after")');ok(r.ok&&r.out.trim()==='before',`sys.exit() ends the program quietly`);
 r=await run('print(0.1+0.2)\nprint(round(2.675,2))\nprint(f"{1/3:.3f}")');ok(r.out.trim()==='0.30000000000000004\n2.67\n0.333',`float output identical to CPython (${JSON.stringify(r.out)})`);
 r=await run('name="Ali"\nprint(f"{name=}")');ok(r.ok&&r.out.trim()==="name='Ali'",`f"{x=}" works (was unsupported in Skulpt)`);
 r=await run('print("abc".removeprefix("a"))');ok(r.ok&&r.out.trim()==='bc','removeprefix works');
 const t0=Date.now();r=await run('while True:\n    pass');const dt=Date.now()-t0;
 ok(!r.ok&&/ran too long/.test(r.err)&&dt<9000,`infinite loop is stopped after ~5 s (${dt} ms): ${r.err}`);
 await pg.waitForFunction("engine==='ready'",{timeout:30000});
 r=await run('print("alive again")');ok(r.ok&&r.out.trim()==='alive again',`engine recovers after a killed program`);
 r=await run('while True:\n    print("x"*100)');ok(!r.ok&&/Too much output/.test(r.err),`runaway output is capped (${r.err.slice(0,60)})`);
 r=await run('import os\nprint(os.getcwd() is not None)');ok(r.ok,'standard library imports work');
 ok(pg.errs.length===0,`no page errors ${pg.errs.slice(0,2)}`);
 console.log(fails?`\n${fails} FAILED`:'\nall browser-engine checks passed');await close();process.exit(fails?1:0)})();
