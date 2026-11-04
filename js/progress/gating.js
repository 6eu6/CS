/* Progress engine: completion, locks, lock page */
/* ======================================================= PROGRESS ENGINE: automatic completion + locks */
prog.rev=prog.rev||{};prog.focus=prog.focus||{};
const GRADED='[data-runner],[data-parsons],[data-blanks],[data-bug],[data-quiz],[data-predict]';
function itemOf(w){
  if(w.dataset.runner){const d=R[w.dataset.runner];if(!d||!(d.tests||d.stages))return null;return{key:w.dataset.runner,label:d.title,kind:d.stages?'Project':'Exercise'}}
  if(w.dataset.parsons)return PARS[w.dataset.parsons]?{key:'pars-'+w.dataset.parsons,label:PARS[w.dataset.parsons].title,kind:'Arrange'}:null;
  if(w.dataset.blanks)return BLANKS[w.dataset.blanks]?{key:'blank-'+w.dataset.blanks,label:BLANKS[w.dataset.blanks].title,kind:'Fill in'}:null;
  if(w.dataset.bug)return BUGS[w.dataset.bug]?{key:'bug-'+w.dataset.bug,label:BUGS[w.dataset.bug].title,kind:'Bug hunt'}:null;
  if(w.dataset.quiz)return Q[w.dataset.quiz]?{key:'quiz-'+w.dataset.quiz,label:'Quiz (80% to pass)',kind:'Quiz'}:null;
  if(w.dataset.predict)return PRED[w.dataset.predict]?{key:'pred-'+w.dataset.predict,label:'Predict the output',kind:'Predict'}:null;return null}
const REQ={};LESSONS.forEach(l=>{REQ[l.id]=[];l.el.querySelectorAll(GRADED).forEach(w=>{const it=itemOf(w);if(it){it.el=w;REQ[l.id].push(it)}})});
const isBuiltWeek=wk=>wk==='intro'||wk==='tb'||wk==='proj'||!!WEEKS.find(w=>String(w.n)===wk&&w.built);
const isTest=id=>/-test$/.test(id);
function doneCount(id){return REQ[id].filter(i=>prog.ex[i.key]).length}
function lessonDone(id){const r=REQ[id];return r.length?r.every(i=>prog.ex[i.key]):!!prog.lessons[id]}
function weekDone(n){const ls=LESSONS.filter(l=>l.week===String(n));const t=ls.find(l=>isTest(l.id));return (t&&lessonDone(t.id))||ls.every(l=>lessonDone(l.id))}
function lockOf(id){const L=LESSONS.find(l=>l.id===id);if(!L||L.week==='intro'||L.week==='tb'||!isBuiltWeek(L.week))return null;
  if(L.week==='proj'){const nd=L.el.dataset.needs;if(nd!=null&&!weekDone(+nd)){const t=LESSONS.find(l=>l.week===nd&&isTest(l.id));return{why:`This part uses Week ${nd} tools, so it opens when you finish Week ${nd} (or pass the Week ${nd} test).`,go:t?t.id:null,goLabel:t?`Go to the Week ${nd} test`:''}}
    const ls=LESSONS.filter(l=>l.week==='proj');for(const l of ls){if(l.id===id)break;if(!lessonDone(l.id))return{why:`Finish “${l.title}” first. Each part builds on your code from the one before.`,go:l.id,goLabel:`Go to ${l.title}`,by:l.id}}return null}
  const wn=+L.week;const prev=WEEKS.filter(w=>w.built&&w.n<wn).map(w=>w.n);
  if(prev.length){const p=prev[prev.length-1];if(!weekDone(p)){const t=LESSONS.find(l=>l.week===String(p)&&isTest(l.id));return{why:`Week ${wn} unlocks when you finish Week ${p}, or pass the Week ${p} test (it works as a placement test).`,go:t?t.id:null,goLabel:t?`Take the Week ${p} test`:''}}}
  if(isTest(id))return null;
  const ls=LESSONS.filter(l=>l.week===L.week);for(const l of ls){if(l.id===id)break;if(isTest(l.id))continue;if(!lessonDone(l.id))return{why:`Finish “${l.title}” first.`,go:l.id,goLabel:`Go to ${l.title}`,by:l.id}}return null}

/* lesson progress strip + footer */
LESSONS.forEach(l=>{l.el.querySelectorAll('.lesson-foot').forEach(f=>f.remove());
  if(!isBuiltWeek(l.week))return;
  if(REQ[l.id].length){const s=document.createElement('div');s.className='lprog';s.dataset.lp=l.id;const meta=l.el.querySelector('.meta')||l.el.querySelector('h1');meta.after(s)}
  const f=document.createElement('div');f.className='lesson-foot';f.dataset.foot=l.id;l.el.appendChild(f)});
function drawLesson(id){const L=LESSONS.find(l=>l.id===id);if(!L)return;const r=REQ[id];
  const s=L.el.querySelector('[data-lp]');if(s){const k=doneCount(id),n=r.length;
    s.innerHTML=`<div class="lp-h"><b>${k===n?'✓ Lesson complete':'Lesson progress'}</b><span>${k} of ${n} done</span></div><div class="prog-bar"><i style="width:${n?k/n*100:0}%"></i></div><div class="lp-items">${r.map((it,i)=>`<button class="lpi ${prog.ex[it.key]?'ok':''}" data-jump="${i}" title="${esc(it.kind)}: ${esc(it.label)}">${prog.ex[it.key]?'✓':i+1}</button>`).join('')}</div><p class="engine">${k===n?'Everything here is passed.':'Pass every item to complete the lesson and unlock the next one. Tap a number to jump to it.'}</p>`}
  const f=L.el.querySelector('[data-foot]');if(!f)return;const i=LESSONS.indexOf(L);const p=LESSONS[i-1],n=LESSONS[i+1];
  const done=lessonDone(id);let mid='';
  if(!r.length)mid=`<button class="btn" data-read="${id}">${prog.lessons[id]?'✓ Read':'Mark as read'}</button>`;
  else mid=`<span class="engine">${done?'✓ Lesson complete':`${doneCount(id)} of ${r.length} done`}</span>`;
  let next='';if(n){const lk=lockOf(n.id);const sameWeek=n.week===L.week;
    if(lk&&sameWeek&&!done)next=`<button class="btn" disabled title="${esc(lk.why)}">🔒 ${esc(n.title)}</button>`;
    else next=`<a class="btn pri" href="#${n.id}">${lk?'🔒 ':''}${esc(n.title)} →</a>`}
  f.innerHTML=`${p?`<a class="btn" href="#${p.id}">← ${esc(p.title)}</a>`:'<span></span>'}${mid}${next}`}
document.addEventListener('click',e=>{const b=e.target.closest('[data-read]');if(b){const id=b.dataset.read;prog.lessons[id]=!prog.lessons[id];saveProg()}
  const j=e.target.closest('[data-jump]');if(j){const L=LESSONS.find(l=>l.id===cur);const it=REQ[cur][+j.dataset.jump];if(it&&it.el){it.el.scrollIntoView({behavior:'smooth',block:'start'})}}});

/* sidebar with locks and partial progress */
function renderNav(){
  const nav=$('#nav');let h='';
  GROUPS.forEach(g=>{const ls=LESSONS.filter(l=>l.week===g.key);if(!ls.length)return;const dn=ls.filter(l=>lessonDone(l.id)).length;const built=g.built;
    if(!built){h+=`<div class="wk"><a class="wk-h soon" href="#${ls[0].id}" data-l="${ls[0].id}"><span>${esc(g.label)}</span><span>soon</span></a></div>`;return}
    h+=`<div class="wk"><div class="wk-h ${built?'':'soon'}"><span>${esc(g.label)}</span>${g.key!=='intro'&&g.key!=='tb'?(built?`<span>${dn}/${ls.length}</span>`:'<span>soon</span>'):''}</div><ol class="toc">`;
    let sec=null;ls.forEach(l=>{if(l.section&&l.section!==sec&&built){h+=`<li class="sec">${esc(SECTION_LABELS[l.section]||l.section)}</li>`}sec=l.section;const lk=built?lockOf(l.id):null;const d=lessonDone(l.id);const r=REQ[l.id];const part=r.length&&!d?doneCount(l.id):0;
      h+=`<li><a href="#${l.id}" data-l="${l.id}" class="${l.id===cur?'on':''} ${built?'':'soon'} ${lk?'locked':''}"><span>${esc(l.title)}${part?` <small class="engine">${part}/${r.length}</small>`:''}</span><span class="chk ${d?'done':''} ${lk?'lockd':''} ${built?'':'lock'}"></span></a></li>`});
    h+='</ol></div>'});
  nav.innerHTML=h;
  const counted=LESSONS.filter(l=>isBuiltWeek(l.week)&&l.week!=='intro');const d=counted.filter(l=>lessonDone(l.id)).length;
  $('#progBar').style.width=(d/counted.length*100)+'%';
  $('#progTxt').textContent=`${d}/${counted.length} lessons · ${Object.keys(prog.ex).filter(k=>R[k]).length} exercises passed`;
  const road=$('#road');if(road)road.innerHTML=WEEKS.map(w=>{const ls=LESSONS.filter(l=>l.week===String(w.n));const dn=ls.filter(l=>lessonDone(l.id)).length;
    return `<a href="#w${w.n}-intro"><span class="n">WEEK ${w.n}</span><b>${esc(w.t)}</b><span>${esc(w.blurb)}</span><span class="st" style="color:${w.built?'var(--ok)':'var(--muted)'}">${w.built?`Ready · ${dn}/${ls.length} done`:'Coming next'}</span></a>`}).join('');
  LESSONS.forEach(l=>{if(isBuiltWeek(l.week))drawLesson(l.id)});drawReviewCount()}

/* lock page */
const lockPage=document.createElement('article');lockPage.className='lesson lockpage';$('#main').appendChild(lockPage);
show=function(id){if(!LESSONS.find(l=>l.id===id))id='home';const lk=lockOf(id);
  if(lk){cur=id;LESSONS.forEach(l=>l.el.classList.remove('on'));const L=LESSONS.find(l=>l.id===id);
    const by=lk.by?REQ[lk.by].filter(i=>!prog.ex[i.key]):[];
    lockPage.innerHTML=`<div class="eyebrow">Locked</div><h1>🔒 ${esc(L.title)}</h1><p class="lede">${esc(lk.why)}</p>${by.length?`<div class="note tip"><b>Still to do in “${esc(LESSONS.find(l=>l.id===lk.by).title)}”</b><ul>${by.map(i=>`<li>${esc(i.kind)}: ${esc(i.label)}</li>`).join('')}</ul></div>`:''}<div class="note why"><b>Why lessons lock</b><p>Each lesson builds on the one before. Skipping ahead feels faster but leaves gaps that show up later as "I don't get it". Passing every exercise is how you prove the idea is yours.</p></div>${lk.go?`<a class="btn pri" href="#${lk.go}">${esc(lk.goLabel)} →</a>`:''}`;
    lockPage.classList.add('on');renderNav();closeSide();window.scrollTo(0,0);return}
  lockPage.classList.remove('on');_showLesson(id);upgradeIn($('.lesson.on'));if(id==='review')drawReview()};
