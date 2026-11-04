/* Mount all widgets and open the first lesson */
/* ======================================================= boot */
$$('pre code.py').forEach(c=>c.innerHTML=hlPy(c.textContent));
$$('[data-runner]').forEach(mountRunner);$$('[data-quiz]').forEach(mountQuiz);$$('[data-stepper]').forEach(mountStepper);$$('[data-anat]').forEach(mountAnat);$$('[data-predict]').forEach(mountPredict);$$('[data-parsons]').forEach(mountParsons);$$('[data-blanks]').forEach(mountBlanks);$$('[data-bug]').forEach(mountBug);setEdStatus();
/* ---- personal extras: continue, theme, export/import ---- */
(function(){
 const first=()=>{const l=LESSONS.find(l=>!prog.lessons[l.id]&&!lockOf(l.id)&&(l.week==='intro'||l.week==='tb'||isBuiltWeek(l.week)));return l?l.id:'home'};
 [$('#contBtn'),$('#contSide')].forEach(cb=>{if(cb)cb.onclick=e=>{e.preventDefault();e.stopPropagation();const id=first();try{history.replaceState(null,'','#'+id)}catch(_){}show(id)}});
 const tb=$('#themeBtn');if(tb)tb.onclick=()=>{const d=document.documentElement,dark=d.getAttribute('data-theme')==='dark'||(!d.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme: dark)').matches);const n=dark?'light':'dark';d.setAttribute('data-theme',n);try{localStorage.setItem('c50-theme',n)}catch(_){}};
 $('#expProg').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(prog,null,1)],{type:'application/json'}));a.download='cs50p-progress-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
 $('#impProg').onclick=()=>$('#impFile').click();
 $('#impFile').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const j=JSON.parse(await f.text());prog=mergeProg(prog,j);saveProg();location.reload()}catch(_){alert('That file is not a valid progress export.')}};
 if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
})();
show((location.hash||'').slice(1)||LS.get('c50-last','home'));
window.appReady=true;if(CMready)upgradeIn($('.lesson.on')); // everything is loaded and mounted
