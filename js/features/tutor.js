/* Hint level 3 (AI tutor) */
/* ======================================================= HINTS + TUTOR */
let SAMPLE=null;(async()=>{try{if(window.claude&&window.claude.use)SAMPLE=await window.claude.use('sample')}catch(e){SAMPLE=null}})();
function mdLite(t){let h=esc(t);h=h.replace(/```(?:python)?\n?([\s\S]*?)```/g,(m,c)=>`<pre><code>${c}</code></pre>`);h=h.replace(/`([^`\n]+)`/g,'<code>$1</code>');h=h.replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>');return h.replace(/\n/g,'<br>')}
function hintPanel(el,id,d,getStage,getCode,getOut){
  const box=el.querySelector('.hintbox');const key=()=>getStage()==null?id:id+'#'+getStage();let level=0,shownFor=null;
  function weekOf(lessonId){const L=LESSONS.find(l=>l.id===lessonId);return L?L.week:null}
  function draw(){const H=HINTS[key()];const les=WIDGET_LESSON[id];const wk=weekOf(les);let h='';
    if(level>=1&&H){const main=H.t.filter(t=>weekOf(t[1])===wk||(wk==='proj'));const other=H.t.filter(t=>!main.includes(t));
      h+=`<div class="hint"><b>Hint 1 · Tools you'll need</b><ul>${(main.length?main:H.t).map(t=>`<li>${esc(t[0])} <a href="#${t[1]}" class="engine">(${esc(t[2])})</a></li>`).join('')}</ul>${main.length&&other.length?`<p class="engine">Also uses earlier basics: ${other.map(t=>esc(t[0])).join(', ')}.</p>`:''}</div>`}
    if(level>=2&&H&&H.s){h+=`<div class="hint"><b>Hint 2 · The outline</b><p class="engine">This is the shape of one working solution. Every <code>___</code> is something for you to fill in.</p><pre><code>${hlPy(H.s)}</code></pre></div>`}
    if(level>=3){h+=`<div class="hint tutor"><b>Hint 3 · Ask the tutor</b>${SAMPLE?`<p class="engine">The tutor sees the task, your code and your last output. It gives a nudge, not the answer, and only uses what you've learned so far. You can ask in English or Arabic.</p><textarea rows="2" placeholder="What are you stuck on? (optional)" aria-label="Your question for the tutor"></textarea><div class="row"><button class="btn sm pri" data-ask>Ask the tutor</button></div><div class="tutor-out" aria-live="polite"></div>`:`<p class="engine">The AI tutor works when this page is open in Claude. Otherwise, describe where you're stuck in the chat, or use the CS50 Duck at cs50.ai.</p>`}</div>`}
    box.innerHTML=h;box.hidden=!h;
    const b=el.querySelector('[data-a=hint]');if(b)b.textContent=level>=3?'Hints shown':level===0?'Hint':`Next hint (${level+1}/3)`;
    const ask=box.querySelector('[data-ask]');if(ask)ask.onclick=()=>askTutor(box,id,d,getStage,getCode,getOut)}
  return{next(){if(shownFor!==key()){level=0;shownFor=key()}if(level<3)level++;draw()},reset(){level=0;shownFor=null;box.innerHTML='';box.hidden=true;const b=el.querySelector('[data-a=hint]');if(b)b.textContent='Hint'}}}
async function askTutor(box,id,d,getStage,getCode,getOut){const out=box.querySelector('.tutor-out');const q=box.querySelector('textarea').value.trim();const btn=box.querySelector('[data-ask]');
  const st=getStage();const s=st==null?d:d.stages[st];const les=WIDGET_LESSON[id];const known=(LESSON_CONCEPTS[les]||[]).join(', ');
  const task=(s.task||'').replace(/<[^>]+>/g,'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  const prompt=`You are a patient Python tutor on a CS50P companion site, helping a beginner with one practice exercise (not a CS50 problem set).
Rules:
- Never give the full solution. Show at most one short line of code, or a fragment with ___ blanks.
- Prefer a guiding question. If their code has a bug, point to the exact line and explain why it's wrong.
- Only use these concepts, which the learner has already been taught: ${known}. Never suggest anything else.
- Reply in the same language as the learner's question (simple English if there is no question). Under 120 words.

Exercise: ${d.title}${st!=null?` (step ${st+1}: ${s.title})`:''}
Task: ${task}${s.spec?`\nExpected output example:\n${s.spec}`:''}

Learner's current code:
\`\`\`python
${getCode()}
\`\`\`
Last output / check results:
${getOut().slice(-1500)||'(they have not run it yet)'}

Learner's question: ${q||'(none: give the next most useful hint)'}`;
  btn.disabled=true;out.innerHTML='<span class="engine">Thinking…</span>';
  try{const r=await SAMPLE(prompt,{onText:({text})=>{out.innerHTML=mdLite(text)}});if(r&&r.text)out.innerHTML=mdLite(r.text)}
  catch(e){const c=e&&e.code;out.innerHTML=`<span class="engine">${c==='rate_limited'?'Too many questions in a short time. Try again in a minute.':c==='not_granted'?'The tutor needs your permission. Allow it from this page\'s Permissions menu.':'The tutor isn\'t available right now. Try again, or ask in the chat.'}</span>`}
  btn.disabled=false}
