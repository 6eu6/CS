/* Learning plan page */
/* ---------------- plan page */
const PLAN=[
 {t:'Stage 1 · Foundations',time:'2–3 months',src:'CS50P + this companion',items:['Week 2 problem set done on my own','Week 3 problem set','Week 4 problem set','Week 5 problem set','Week 6 problem set','Week 7 problem set','Week 8 problem set','Week 9 problem set','CS50P final project submitted','Free CS50 certificate received (70%+ on every problem and the final project)','Pocket Ledger parts A–J finished','Pocket Ledger pushed to my GitHub with a README']},
 {t:'Stage 2 · Python in depth',time:'2–3 months',src:'Companion stage 2 + Exercism Python track',items:['Tuples, sets and comprehensions in depth','Iterators and generators','Functions in depth: *args, **kwargs, closures, decorators','OOP in depth: dunder methods, inheritance, dataclasses','Standard library: collections, itertools, datetime, pathlib','Algorithm basics and Big-O (searching, sorting, recursion)','Git properly: branches, commits, pull requests','Two polished projects on GitHub']},
 {t:'Stage 3 · Professional tools',time:'1–2 months',src:'CS50 SQL + companion stage 3',items:['SQL and SQLite','JSON and calling web APIs','Virtual environments and pip','Testing with pytest','Logging and clean code (PEP 8)','A full app with a database and tests on GitHub']},
 {t:'Stage 4 · Specialisation',time:'3–4 months',src:'One track, chosen at the end of stage 3',items:['Track chosen (data analysis recommended)','Core libraries learned (e.g. pandas, charts, SQL)','Portfolio project 1 on real UK open data','Portfolio project 2','Portfolio project 3','Track certificate (e.g. freeCodeCamp Data Analysis with Python)']},
 {t:'Stage 5 · Your open-source platform',time:'In parallel from stage 3',src:'This companion → GitHub',items:['Repository created and code organised into files','Running on GitHub Pages with a real Python engine (Pyodide)','Licences added (MIT for code, CC BY-SA for content)','Arabic explanation layer','Public launch and first outside users']},
];
function drawPlan(){const box=$('#planBox');if(!box)return;let h='';
  PLAN.forEach((s,i)=>{const ids=s.items.map((_,j)=>`plan-${i}-${j}`);const done=ids.filter(id=>prog.ck[id]).length;
    h+=`<div class="plstage"><div class="lp-h"><b>${esc(s.t)}</b><span>${done}/${s.items.length} · ${esc(s.time)}</span></div><div class="prog-bar"><i style="width:${done/s.items.length*100}%"></i></div><p class="engine">Main source: ${esc(s.src)}</p><ul class="cklist">${s.items.map((it,j)=>`<li><input type="checkbox" id="plan-${i}-${j}" ${prog.ck[`plan-${i}-${j}`]?'checked':''}><label for="plan-${i}-${j}">${esc(it)}</label></li>`).join('')}</ul></div>`});
  box.innerHTML=h}
document.addEventListener('change',e=>{const i=e.target;if(i.matches&&i.matches('.cklist input')){prog.ck[i.id]=i.checked;saveProg();if(i.id.startsWith('plan-'))drawPlan()}});
drawPlan();
