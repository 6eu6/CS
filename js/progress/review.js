/* Spaced-repetition daily review */
/* ======================================================= daily review page */
function dueList(all){const now=Date.now();return Object.entries(prog.rev).filter(([k,v])=>quizQ(k)&&(all||v.due<=now)).sort((a,b)=>a[1].due-b[1].due).map(([k])=>k)}
function drawReviewCount(){const n=dueList().length;const b=$('#revBadge');if(b){b.textContent=n;b.hidden=!n}
  $$('#nav a[data-l="review"] span:first-child').forEach(s=>{s.innerHTML=`Daily review${n?` <small class="engine">${n} due</small>`:''}`})}
function drawReview(all){const box=$('#reviewBox');if(!box)return;const due=dueList(all);const total=Object.keys(prog.rev).length;
  if(!due.length){box.innerHTML=`<div class="note real"><b>Nothing due ${all?'':'today'}</b><p>${total?`You have ${total} question${total>1?'s':''} scheduled for later days.`:'Questions you get wrong in any quiz will appear here.'}</p></div>${total&&!all?'<button class="btn" data-revall>Practise all saved questions now</button>':''}`;
    const b=box.querySelector('[data-revall]');if(b)b.onclick=()=>drawReview(true);return}
  box.innerHTML='<div class="widget quiz"></div>';mountQuiz(box.firstChild,{items:due.slice(0,15)})}
