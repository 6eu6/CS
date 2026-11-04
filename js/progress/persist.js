/* Progress is stored in this browser (localStorage). Export/Import in the sidebar moves it between devices; merging is a union, so it never deletes progress. */
prog.stage=prog.stage||{};prog.drafts=prog.drafts||{};prog.ck=prog.ck||{};prog.att=prog.att||{};
function mergeProg(a,b){a=a||{};b=b||{};const out={lessons:{},ex:{},ck:{},rev:{},focus:{},stage:{},drafts:{},att:{}};
  const aa=a.att||{},ab=b.att||{};for(const k of new Set([...Object.keys(aa),...Object.keys(ab)]))out.att[k]={f:Math.max((aa[k]||{}).f||0,(ab[k]||{}).f||0),s:Math.max((aa[k]||{}).s||0,(ab[k]||{}).s||0)};
  ['lessons','ex'].forEach(f=>{[a[f]||{},b[f]||{}].forEach(o=>{for(const k in o)if(o[k])out[f][k]=true})});
  const ca=a.ck||{},cb=b.ck||{};for(const k of new Set([...Object.keys(ca),...Object.keys(cb)]))out.ck[k]=!!(ca[k]||cb[k]);
  const ra=a.rev||{},rb=b.rev||{};for(const k of new Set([...Object.keys(ra),...Object.keys(rb)])){const x=ra[k],y=rb[k];out.rev[k]=!x?y:!y?x:(y.iv>x.iv||(y.iv===x.iv&&y.due>x.due))?y:x}
  const fa=a.focus||{},fb=b.focus||{};for(const k of new Set([...Object.keys(fa),...Object.keys(fb)]))out.focus[k]=Math.max(fa[k]||0,fb[k]||0);
  const sa=a.stage||{},sb=b.stage||{};for(const k of new Set([...Object.keys(sa),...Object.keys(sb)]))out.stage[k]=Math.max(sa[k]||0,sb[k]||0);
  const da=a.drafts||{},dbb=b.drafts||{};for(const k of new Set([...Object.keys(da),...Object.keys(dbb)])){const x=da[k],y=dbb[k];out.drafts[k]=!x?y:!y?x:(y.at>x.at?y:x)}
  return out}
