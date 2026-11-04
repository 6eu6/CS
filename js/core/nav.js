/* Lessons, progress object, sidebar, navigation, placeholder weeks */
// placeholder pages for weeks not built yet
(function(){const box=$('#futureWeeks');WEEKS.filter(w=>!w.built).forEach(w=>{
  const a=document.createElement('article');a.className='lesson';a.dataset.id='w'+w.n+'-intro';a.dataset.week=String(w.n);a.dataset.title='Week '+w.n+' overview';
  a.innerHTML=`<div class="eyebrow">Week ${w.n} · ${esc(w.t)}</div><h1>Week ${w.n}: ${esc(w.t)}</h1><p class="lede">Coming next: ${esc(w.blurb)}.</p>
  <div class="note tip"><b>Not built yet</b><p>This week will be built in the same depth as Week 0 (every line explained, decision guides, scenarios, a 4-level auto-tested lab, a week test and checklist). When you reach it in CS50P, come back to the chat and say <b>"build Week ${w.n}"</b>. It will appear right here, and your progress on earlier weeks stays.</p></div>
  <div class="note why"><b>Get ready</b><p>Before starting Week ${w.n}, make sure every box on the previous week's mastery checklist is ticked. Each week assumes the last one is solid.</p></div>`;
  box.parentNode.insertBefore(a,box)});box.remove()})();

const LESSONS=$$('.lesson').map(a=>({id:a.dataset.id,week:a.dataset.week,section:a.dataset.section||'',title:a.dataset.title,el:a}));
let prog=LS.get('c50-prog',{lessons:{},ex:{},ck:{}});prog.ck=prog.ck||{};
let cur='home';
function saveProg(){LS.set('c50-prog',prog);renderNav()}
function show(id){if(!LESSONS.find(l=>l.id===id))id='home';cur=id;LESSONS.forEach(l=>l.el.classList.toggle('on',l.id===id));renderNav();closeSide();window.scrollTo(0,0);LS.set('c50-last',id)}
LESSONS.forEach((l,i)=>{if(l.week!=='intro'&&!WEEKS.find(w=>String(w.n)===l.week)?.built)return;
  const f=document.createElement('div');f.className='lesson-foot';const p=LESSONS[i-1],n=LESSONS[i+1];
  f.innerHTML=`${p?`<a class="btn" href="#${p.id}">← ${esc(p.title)}</a>`:'<span></span>'}<button class="btn" data-done="${l.id}">${prog.lessons[l.id]?'✓ Completed':'Mark lesson complete'}</button>${n?`<a class="btn pri" href="#${n.id}">${esc(n.title)} →</a>`:''}`;l.el.appendChild(f)});
document.addEventListener('click',e=>{
  const d=e.target.closest('[data-done]');if(d){const id=d.dataset.done;prog.lessons[id]=!prog.lessons[id];d.textContent=prog.lessons[id]?'✓ Completed':'Mark lesson complete';saveProg()}
  const a=e.target.closest('a[href^="#"]');if(a){e.preventDefault();const id=a.getAttribute('href').slice(1);try{history.replaceState(null,'','#'+id)}catch(_){}show(id)}});
function closeSide(){$('#side').classList.remove('open');$('#menuBtn').setAttribute('aria-expanded','false');$('#menuBtn').textContent='Menu';const s=$('.scrim');if(s)s.remove()}
$('#menuBtn').onclick=()=>{const s=$('#side'),b=$('#menuBtn');if(s.classList.contains('open')){closeSide();b.textContent='Menu';return}s.classList.add('open');b.setAttribute('aria-expanded','true');b.textContent='Close menu';window.scrollTo(0,0)};
$('#resetProg').onclick=function(){if(this.dataset.c){prog={lessons:{},ex:{},ck:{}};saveProg();this.textContent='Progress cleared';delete this.dataset.c;$$('[data-done]').forEach(b=>b.textContent='Mark lesson complete');$$('.cklist input').forEach(i=>i.checked=false)}else{this.dataset.c=1;this.textContent='Tap again to confirm'}};
function passEx(id){if(!prog.ex[id]){prog.ex[id]=1;saveProg()}}
$$('.cklist input').forEach(i=>{i.checked=!!prog.ck[i.id];i.onchange=()=>{prog.ck[i.id]=i.checked;saveProg()}});
