/* Quizzes (80% pass, wrong answers go to review) */
/* ======================================================= quizzes: 80% pass, wrong answers go to the review queue */
const DAY=86400000;
function schedule(qk,correct){const r=prog.rev[qk];if(correct){if(!r)return;const iv=r.iv>=1?(r.iv===1?3:r.iv===3?7:Math.min(60,r.iv*2)):1;prog.rev[qk]={iv,due:Date.now()+iv*DAY}}else prog.rev[qk]={iv:1,due:Date.now()+DAY}}
function quizQ(qk){const [qid,i]=qk.split(':');return Q[qid]&&Q[qid][+i]}
function mountQuiz(el,opts){const id=el.dataset.quiz,qs=opts?opts.items:Q[id];if(!qs)return;let score=0,ans=0;const review=!!opts;
  el.innerHTML=`<div class="widget-h"><b>${review?'Review questions':'Check your understanding'}</b><span class="row" style="gap:6px"><span class="badge">${review?qs.length+' due':'Quiz · '+qs.length+' · 80% to pass'}</span>${review?'':`<span class="badge pass" data-pb ${prog.ex['quiz-'+id]?'':'hidden'}>Passed</span>`}</span></div>`;
  qs.forEach((it0,qi)=>{const it=review?quizQ(it0):it0;if(!it)return;const qk=review?it0:id+':'+qi;const d=document.createElement('div');d.className='q';
    d.innerHTML=`<b>${qi+1}. ${esc(it.q)}</b>${it.c?`<pre class="qcode"><code>${hlPy(it.c)}</code></pre>`:''}<div style="display:flex;flex-direction:column;gap:6px"></div><div class="fb" aria-live="polite"></div>`;
    const box=d.querySelector('div'),fb=d.querySelector('.fb');let done=false;
    it.o.forEach((t,oi)=>{const b=document.createElement('button');b.className='opt';b.textContent=t;b.onclick=()=>{if(done)return;done=true;ans++;const ok=oi===it.a;
      if(ok){b.classList.add('right');score++;fb.innerHTML=`<span class="ok-t">Correct.</span> ${esc(it.e)}`}else{b.classList.add('wrong');box.children[it.a].classList.add('right');fb.innerHTML=`<span class="bad-t">Not quite.</span> ${esc(it.e)}${review?'':' <span class="engine">(added to your daily review)</span>'}`}
      schedule(qk,ok);LS.set('c50-prog',prog);
      if(ans===qs.length){const pass=score/qs.length>=0.8;const s=document.createElement('div');s.className='result '+(pass?'pass':'hint');
        s.innerHTML=review?`Review done: ${score} of ${qs.length}. Correct answers come back later (3, 7, 14… days); wrong ones tomorrow. <button class="btn sm" data-again>Back to review</button>`:`You scored ${score} of ${qs.length} (${Math.round(score/qs.length*100)}%). ${pass?'Passed.':'You need 80% to pass. Re-read the explanations, then retake.'} <button class="btn sm" data-retake>Retake</button>`;
        el.appendChild(s);const rt=s.querySelector('[data-retake]');if(rt)rt.onclick=()=>mountQuiz(el);const ag=s.querySelector('[data-again]');if(ag)ag.onclick=()=>drawReview();
        if(!review&&pass)passEx('quiz-'+id);else saveProg()}};box.appendChild(b)});
    el.appendChild(d)})}
