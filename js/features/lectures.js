/* Lecture card rendering */
const slug=t=>t.toLowerCase().replace(/[`]/g,'').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-');
const CAN_EMBED=(()=>{try{return window.top===window.self}catch(e){return false}})();
function lectureCard(id){const L=LESSONS.find(l=>l.id===id);if(!L)return null;const m=LECT_MAP[id];const wk=+L.week;
  const lec=LECTURES[wk];if(!lec)return null;
  const c=document.createElement('div');c.className='lect';
  if(!m){c.classList.add('lect-x');c.innerHTML=`<span class="lect-ic" aria-hidden="true">▶</span><span><b>Beyond the lecture.</b> Extra depth and practice built on ${esc(lec.title)}. No video for this lesson.</span>`;return c}
  const yt=`https://www.youtube.com/watch?v=${lec.yt}${m.t?`&t=${m.t}s`:''}`;
  const notes=m.all?lec.notes:lec.notes+'#'+slug(m.s[0]);
  c.innerHTML=`<div class="lect-h"><span class="lect-ic" aria-hidden="true">▶</span><div><b>${m.all?'Watch first: ':''}${esc(lec.title)}</b><div class="engine">${m.all?'The whole lecture. The lessons below follow it in the same order.':'This lesson covers: '+m.s.map(esc).join(' · ')}</div></div></div>
   <div class="row"><a class="btn sm pri" href="${yt}" target="_blank" rel="noopener">Watch on YouTube</a><a class="btn sm" href="${notes}" target="_blank" rel="noopener">Read the notes${m.all?'':' for this part'}</a>${CAN_EMBED?'<button class="btn sm" data-embed>Play here</button>':''}</div><div class="lect-v" hidden></div>
   <p class="engine">${m.all?'Tip: watch with your Codespace open and type every example.':'Watch this part of the lecture, then work through the lesson below.'}</p>`;
  const eb=c.querySelector('[data-embed]');if(eb)eb.onclick=()=>{const v=c.querySelector('.lect-v');if(!v.hidden){v.hidden=true;v.innerHTML='';eb.textContent='Play here';return}
    v.innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${lec.yt}?rel=0${m.t?`&start=${m.t}`:''}" title="${esc(lec.title)}" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>`;v.hidden=false;eb.textContent='Hide video'};
  return c}
LESSONS.forEach(l=>{if(!/^\d+$/.test(l.week))return;const c=lectureCard(l.id);if(!c)return;const meta=l.el.querySelector('.meta')||l.el.querySelector('h1');meta.after(c)});
