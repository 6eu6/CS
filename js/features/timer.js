/* Pomodoro focus timer */
/* ======================================================= focus timer (Pomodoro) */
(function(){const T=LS.get('c50-timer',{mode:'idle',end:0,left:25*60,count:0,date:''});const today=new Date().toISOString().slice(0,10);if(T.date!==today){T.count=0;T.date=today}
  const L={focus:25*60,break:5*60,long:15*60};const el=$('#timer');let tick=null;
  const fmt=s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
  const left=()=>T.mode==='idle'||T.paused?T.left:Math.max(0,Math.round((T.end-Date.now())/1000));
  function beep(){try{const a=new (window.AudioContext||window.webkitAudioContext)();[0,0.25,0.5].forEach(t=>{const o=a.createOscillator(),g=a.createGain();o.frequency.value=880;g.gain.value=0.08;o.connect(g);g.connect(a.destination);o.start(a.currentTime+t);o.stop(a.currentTime+t+0.15)})}catch(e){}}
  function save(){LS.set('c50-timer',T)}
  function draw(){const s=left();const lbl=T.mode==='idle'?'Focus':T.mode==='focus'?'Focus':T.mode==='long'?'Long break':'Break';
    el.innerHTML=`<span class="tm-mode ${T.mode}">${lbl}</span><b class="tm-time">${fmt(s)}</b><button class="btn sm" data-t="go">${T.mode==='idle'||T.paused?'Start':'Pause'}</button>${T.mode!=='idle'?'<button class="btn sm" data-t="reset" aria-label="Reset timer">↺</button>':''}<span class="tm-count" title="Focus sessions completed today">${T.count} today</span>`;
    if(T.mode!=='idle'&&!T.paused&&s===0)finish()}
  function start(mode){T.mode=mode;T.paused=false;T.end=Date.now()+L[mode==='long'?'long':mode]*1000;T.left=L[mode==='long'?'long':mode];save();run()}
  function finish(){beep();if(T.mode==='focus'){T.count++;prog.focus[today]=(prog.focus[today]||0)+1;LS.set('c50-prog',prog);flash(T.count%4===0?'Great work. Take a 15-minute break: stand up, look away from the screen.':'Focus session done. Take a 5-minute break.');start(T.count%4===0?'long':'break')}else{flash('Break over. Start the next focus session when you\'re ready.');T.mode='idle';T.left=L.focus;save();stop();draw()}}
  function flash(m){let f=$('#tmFlash');if(!f){f=document.createElement('div');f.id='tmFlash';f.className='tm-flash';f.setAttribute('role','status');document.body.appendChild(f)}f.textContent=m;f.hidden=false;clearTimeout(f._t);f._t=setTimeout(()=>f.hidden=true,8000)}
  function run(){stop();tick=setInterval(draw,1000);draw()}function stop(){clearInterval(tick);tick=null}
  el.onclick=e=>{const b=e.target.closest('[data-t]');if(!b)return;if(b.dataset.t==='reset'){T.mode='idle';T.paused=false;T.left=L.focus;save();stop();draw();return}
    if(T.mode==='idle')start('focus');else if(T.paused){T.paused=false;T.end=Date.now()+T.left*1000;save();run()}else{T.left=left();T.paused=true;save();stop();draw()}};
  if(T.mode!=='idle'&&!T.paused)run();else draw()})();
