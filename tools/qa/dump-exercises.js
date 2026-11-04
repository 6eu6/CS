const {open}=require('./serve');const fs=require('fs');
(async()=>{const {pg,close}=await open();
const d=await pg.evaluate(()=>{const out=[];for(const [id,d] of Object.entries(R)){const stages=d.stages||(d.tests?[{tests:d.tests,sol:d.sol,task:d.task}]:[]);
 stages.forEach((st,si)=>out.push({id,si,lvl:d.stages?'proj':(d.lvl||''),title:d.title,code:st.sol,starter:d.code||'',hasInput:st.tests.some(t=>t.inp),
  tests:st.tests.map(t=>({pre:prelude(t.files||d.files||{},t.inp),after:t.after||null,exp:t.exp,file:t.file||null,inp:t.inp||'',label:t.label||''}))}))}return out});
fs.writeFileSync(process.argv[2],JSON.stringify(d));console.log('exercise-stages',d.length,'tests',d.reduce((a,x)=>a+x.tests.length,0));await close()})();
