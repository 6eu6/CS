/* Loader: fetches the lesson pages and data files listed in content/manifest.json, then runs the
   scripts in the listed order. To add or reorder lessons, edit content/manifest.json only. */
(async function(){
  const main=document.getElementById('main');
  try{
    const m=await (await fetch('content/manifest.json',{cache:'no-cache'})).json();
    const [texts,...pages]=await Promise.all([
      fetch(m.texts).then(r=>r.text()),
      ...m.lessons.map(l=>fetch('content/'+l.file).then(r=>{if(!r.ok)throw new Error(l.file+' '+r.status);return r.text()}))]);
    document.body.insertAdjacentHTML('beforeend',texts);
    document.getElementById('loading').remove();
    main.insertAdjacentHTML('beforeend',pages.join('\n')+'\n<div id="futureWeeks"></div>');
    m.lessons.forEach(l=>{const a=main.querySelector(`article[data-id="${l.id}"]`);if(!a)throw new Error('Lesson file does not contain article '+l.id);
      if(l.section)a.dataset.section=l.section;if(l.week)a.dataset.week=l.week});
    await new Promise((resolve,reject)=>{
      m.scripts.forEach((src,i)=>{const s=document.createElement('script');s.src=src;s.async=false;
        s.onerror=()=>reject(new Error('Could not load '+src));if(i===m.scripts.length-1)s.onload=resolve;document.body.appendChild(s)})});
  }catch(e){
    main.innerHTML='<p class="lede">Something went wrong while loading the course: '+String(e.message||e)+'. Reload the page; if it keeps happening, check your connection.</p>';
    console.error(e)}
})();
