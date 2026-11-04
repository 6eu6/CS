// node tools/qa/dump.js <outdir>  -> data.json (exercise data for audit.py), jobs.json (for cpycheck.py), fingerprint.json
const fs=require('fs');const {open}=require('./serve');
(async()=>{const out=process.argv[2]||'/tmp/qa';fs.mkdirSync(out,{recursive:true});const {pg,close}=await open();
const d=await pg.evaluate(()=>{const data={R:{},PARS,BLANKS,BUGS,lessons:LESSONS.map(l=>({id:l.id,week:l.week,title:l.title,w:[...l.el.querySelectorAll('[data-runner],[data-parsons],[data-blanks],[data-bug]')].map(e=>e.dataset.runner?['r',e.dataset.runner]:e.dataset.parsons?['p',e.dataset.parsons]:e.dataset.blanks?['b',e.dataset.blanks]:['g',e.dataset.bug])}))};
  for(const [k,v] of Object.entries(R))data.R[k]={code:v.code,sol:v.sol||null,stages:v.stages?v.stages.map(s=>s.sol):null,lvl:v.lvl||'',title:v.title,task:(v.stages?v.stages.map(s=>s.task).join(' '):v.task)||''};
  const jobs=[];for(const [id,d] of Object.entries(R)){const stages=d.stages||(d.tests?[{tests:d.tests,sol:d.sol}]:[]);
    stages.forEach((st,si)=>st.tests.forEach((t,ti)=>{const code=st.sol;jobs.push({id,si,ti,prog:prelude(t.files||d.files||{},t.inp)+'\n'+(t.after?code+'\n'+t.after:code)+'\n_dump()\n',exp:t.exp,file:t.file||null})}))}
  const hash=s=>{let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return h};
  const fp={lessons:LESSONS.map(l=>l.id),R:Object.keys(R).length,PARS:Object.keys(PARS).length,BLANKS:Object.keys(BLANKS).length,BUGS:Object.keys(BUGS).length,PRED:Object.keys(PRED).length,Q:Object.keys(Q).length,jobs:jobs.length,
    ANAT:typeof ANAT!=='undefined'?Object.keys(ANAT).length:0,lessonText:LESSONS.map(l=>[l.id,l.el.innerText.length]),hashR:hash(JSON.stringify(data.R)),hashJobs:hash(JSON.stringify(jobs.map(j=>[j.id,j.si,j.ti,j.exp])))};
  return {data,jobs,fp}});
fs.writeFileSync(out+'/data.json',JSON.stringify(d.data));fs.writeFileSync(out+'/jobs.json',JSON.stringify(d.jobs));fs.writeFileSync(out+'/fingerprint.json',JSON.stringify(d.fp,null,1));
console.log('lessons',d.fp.lessons.length,'R',d.fp.R,'jobs',d.fp.jobs,'PARS',d.fp.PARS,'BLANKS',d.fp.BLANKS,'BUGS',d.fp.BUGS,'PRED',d.fp.PRED,'Q',d.fp.Q,'pageerrors',pg.errs.slice(0,3));await close()})();
