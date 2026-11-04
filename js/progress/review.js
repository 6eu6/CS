/* Spaced-repetition daily review: quiz questions (1, 3, 7, 14... days) and coding exercises you needed help with (2, 7, 21, 60 days) */
/* ======================================================= daily review page */
const EX_STEPS=[2,7,21,60];           // days between redo attempts of a coding exercise
const EX_FAILS_TO_REVIEW=3;            // failed Checks before the first pass that put an exercise into review
const isExKey=k=>k.startsWith('ex:');
const validRevKey=k=>isExKey(k)?!!R[k.slice(3)]:!!quizQ(k);
function noteFail(id){const a=prog.att[id]||(prog.att[id]={f:0,s:0});a.f++;LS.set('c50-prog',prog)}
function noteSolution(id){const a=prog.att[id]||(prog.att[id]={f:0,s:0});a.s=1;LS.set('c50-prog',prog)}
/* called right after an exercise is passed for the first time */
function scheduleExercise(id){const a=prog.att[id];const k='ex:'+id;if(a&&(a.f>=EX_FAILS_TO_REVIEW||a.s)&&!prog.rev[k])prog.rev[k]={iv:EX_STEPS[0],due:Date.now()+EX_STEPS[0]*DAY};saveProg()}
/* called when a review redo passes. clean = no solution used. Returns the message to show. */
function reviewResult(id,clean){const k='ex:'+id;const r=prog.rev[k];const i=r?EX_STEPS.indexOf(r.iv):-1;
  if(!clean){prog.rev[k]={iv:EX_STEPS[0],due:Date.now()+EX_STEPS[0]*DAY};saveProg();return`Passed, but you used the solution, so this one comes back in ${EX_STEPS[0]} days.`}
  if(i>=EX_STEPS.length-1){delete prog.rev[k];saveProg();return'Passed from a blank editor. You have mastered this one: it leaves your review list.'}
  const iv=EX_STEPS[Math.max(0,i)+1];prog.rev[k]={iv,due:Date.now()+iv*DAY};saveProg();return`Passed from a blank editor. It comes back in ${iv} days.`}
function dueList(all){const now=Date.now();return Object.entries(prog.rev).filter(([k,v])=>validRevKey(k)&&(all||v.due<=now)).sort((a,b)=>a[1].due-b[1].due).map(([k])=>k)}
function drawReviewCount(){const n=dueList().length;const b=$('#revBadge');if(b){b.textContent=n;b.hidden=!n}
  $$('#nav a[data-l="review"] span:first-child').forEach(s=>{s.innerHTML=`Daily review${n?` <small class="engine">${n} due</small>`:''}`})}
function drawReview(all){const box=$('#reviewBox');if(!box)return;const due=dueList(all);const total=Object.keys(prog.rev).filter(validRevKey).length;
  if(!due.length){box.innerHTML=`<div class="note real"><b>Nothing due ${all?'':'today'}</b><p>${total?`You have ${total} item${total>1?'s':''} scheduled for later days.`:'Quiz questions you get wrong, and coding exercises that took you several tries (or the solution), will appear here.'}</p></div>${total&&!all?'<button class="btn" data-revall>Practise all saved items now</button>':''}`;
    const b=box.querySelector('[data-revall]');if(b)b.onclick=()=>drawReview(true);return}
  const qs=due.filter(k=>!isExKey(k)),exs=due.filter(isExKey);box.innerHTML='';
  if(qs.length){const w=document.createElement('div');w.className='widget quiz';box.appendChild(w);mountQuiz(w,{items:qs.slice(0,15)})}
  exs.slice(0,3).forEach(k=>{const id=k.slice(3);const L=LESSONS.find(l=>l.id===WIDGET_LESSON[id]);const wrap=document.createElement('div');wrap.className='rev-ex';
    wrap.innerHTML=`<p class="engine"><b>Code review: solve it again from a blank editor.</b> ${L?`From <a href="#${L.id}">${esc(L.title)}</a>. `:''}You needed help the first time, so this is the best practice for you right now.</p>`;
    const w=document.createElement('div');w.className='widget runner';w.dataset.runner=id;w.dataset.review='1';wrap.appendChild(w);box.appendChild(wrap);mountRunner(w);if(CMready&&w._upgrade)w._upgrade()});
  if(exs.length>3)box.insertAdjacentHTML('beforeend',`<p class="engine">${exs.length-3} more coding exercise${exs.length-3>1?'s':''} due. Finish these first.</p>`)}
