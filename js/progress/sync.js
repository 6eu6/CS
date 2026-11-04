/* Progress persistence + merge (union, never deletes progress) */
/* ======================================================= PROGRESS SYNC (private per account) + plan page + week 1 widgets */
prog.stage=prog.stage||{};prog.drafts=prog.drafts||{};prog.ck=prog.ck||{};
const SYNC={ref:null,state:'local',timer:null,busy:false,again:false,last:''};
function setSync(s){SYNC.state=s;const e=$('#syncStatus');if(e)e.textContent={local:'Progress: saved on this device only',connecting:'Progress: connecting to your account…',synced:'Progress: synced to your account ✓',saving:'Progress: saving…',error:'Progress: can\'t reach your account right now (saved on this device)'}[s]||''}
function mergeProg(a,b){a=a||{};b=b||{};const out={lessons:{},ex:{},ck:{},rev:{},focus:{},stage:{},drafts:{}};
  ['lessons','ex'].forEach(f=>{[a[f]||{},b[f]||{}].forEach(o=>{for(const k in o)if(o[k])out[f][k]=true})});
  const ca=a.ck||{},cb=b.ck||{};for(const k of new Set([...Object.keys(ca),...Object.keys(cb)]))out.ck[k]=!!(ca[k]||cb[k]);
  const ra=a.rev||{},rb=b.rev||{};for(const k of new Set([...Object.keys(ra),...Object.keys(rb)])){const x=ra[k],y=rb[k];out.rev[k]=!x?y:!y?x:(y.iv>x.iv||(y.iv===x.iv&&y.due>x.due))?y:x}
  const fa=a.focus||{},fb=b.focus||{};for(const k of new Set([...Object.keys(fa),...Object.keys(fb)]))out.focus[k]=Math.max(fa[k]||0,fb[k]||0);
  const sa=a.stage||{},sb=b.stage||{};for(const k of new Set([...Object.keys(sa),...Object.keys(sb)]))out.stage[k]=Math.max(sa[k]||0,sb[k]||0);
  const da=a.drafts||{},dbb=b.drafts||{};for(const k of new Set([...Object.keys(da),...Object.keys(dbb)])){const x=da[k],y=dbb[k];out.drafts[k]=!x?y:!y?x:(y.at>x.at?y:x)}
  return out}
function applyProg(){LS.set('c50-prog',prog);renderNav();
  $$('[data-runner]').forEach(w=>{const b=w.querySelector('[data-pb]');if(b)b.hidden=!prog.ex[w.dataset.runner]});
  $$('.cklist input, #planBox input').forEach(i=>{i.checked=!!prog.ck[i.id]});if(typeof drawPlan==='function')drawPlan()}
async function pushProg(){if(!SYNC.ref)return;if(SYNC.busy){SYNC.again=true;return}SYNC.busy=true;setSync('saving');
  try{const j=JSON.stringify(prog);SYNC.last=j;await SYNC.ref.set({p:JSON.parse(j),at:Date.now()});setSync('synced')}catch(e){setSync('error')}
  SYNC.busy=false;if(SYNC.again){SYNC.again=false;pushProg()}}
function queueSync(){if(!SYNC.ref)return;clearTimeout(SYNC.timer);SYNC.timer=setTimeout(pushProg,1500)}
saveProg=function(){LS.set('c50-prog',prog);renderNav();queueSync()};
(async()=>{if(!window.claude||!window.claude.use){setSync('local');return}setSync('connecting');
  let db=null,user=null;try{db=await window.claude.use('db');user=await window.claude.use('user')}catch(e){}
  if(!db||!user){setSync('local');return}
  let uid=null;try{uid=await user.id()}catch(e){}if(!uid){setSync('local');return}
  SYNC.ref=db.collection('data/users/'+uid).doc('progress');
  let first=true;const t=setTimeout(()=>{if(first)setSync('error')},10000);
  SYNC.ref.onSnapshot(snap=>{const remote=snap.exists?(snap.data()||{}).p:null;
      if(first){first=false;clearTimeout(t);const before=JSON.stringify(prog);if(remote)prog=mergeProg(prog,remote);applyProg();
        if(!remote||JSON.stringify(prog)!==JSON.stringify(mergeProg({},remote))||before!==JSON.stringify(prog))pushProg();else setSync('synced');return}
      if(!remote||snap.hasPendingWrites)return;const j=JSON.stringify(remote);if(j===SYNC.last)return;
      prog=mergeProg(prog,remote);applyProg();setSync('synced')},
    e=>{clearTimeout(t);setSync('error')})})();
