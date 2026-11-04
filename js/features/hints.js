/* Two levels of hints: (1) the tools you need, linked to the lessons that taught them; (2) an outline of one solution with ___ blanks. No solutions are ever shown here. */
function hintPanel(el,id,d,getStage,getCode,getOut){
  const box=el.querySelector('.hintbox');const key=()=>getStage()==null?id:id+'#'+getStage();let level=0,shownFor=null;
  function weekOf(lessonId){const L=LESSONS.find(l=>l.id===lessonId);return L?L.week:null}
  function draw(){const H=HINTS[key()];const les=WIDGET_LESSON[id];const wk=weekOf(les);let h='';
    if(level>=1&&H){const main=H.t.filter(t=>weekOf(t[1])===wk||(wk==='proj'));const other=H.t.filter(t=>!main.includes(t));
      h+=`<div class="hint"><b>Hint 1 · Tools you'll need</b><ul>${(main.length?main:H.t).map(t=>`<li>${esc(t[0])} <a href="#${t[1]}" class="engine">(${esc(t[2])})</a></li>`).join('')}</ul>${main.length&&other.length?`<p class="engine">Also uses earlier basics: ${other.map(t=>esc(t[0])).join(', ')}.</p>`:''}</div>`}
    if(level>=2&&H&&H.s){h+=`<div class="hint"><b>Hint 2 · The outline</b><p class="engine">This is the shape of one working solution. Every <code>___</code> is something for you to fill in.</p><pre><code>${hlPy(H.s)}</code></pre></div>`}
    box.innerHTML=h;box.hidden=!h;
    const b=el.querySelector('[data-a=hint]');if(b)b.textContent=level>=2?'Hints shown':level===0?'Hint':`Next hint (${level+1}/2)`;
}
  return{next(){if(shownFor!==key()){level=0;shownFor=key()}if(level<2)level++;draw()},reset(){level=0;shownFor=null;box.innerHTML='';box.hidden=true;const b=el.querySelector('[data-a=hint]');if(b)b.textContent='Hint'}}}
