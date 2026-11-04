import json,sys
from playwright.sync_api import sync_playwright
s=open(sys.argv[1]).read()
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page();errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.route('**/*',lambda r: r.abort() if r.request.url.startswith('http') else r.continue_())
    pg.set_content('<!doctype html><html><body>'+s+'</body></html>');pg.wait_for_timeout(800);print("PAGEERRORS",errs[:3])
    d=pg.evaluate("""()=>{const out={R:{},PARS,BLANKS,BUGS,lessons:LESSONS.map(l=>({id:l.id,week:l.week,title:l.title,w:[...l.el.querySelectorAll('[data-runner],[data-parsons],[data-blanks],[data-bug]')].map(e=>e.dataset.runner?['r',e.dataset.runner]:e.dataset.parsons?['p',e.dataset.parsons]:e.dataset.blanks?['b',e.dataset.blanks]:['g',e.dataset.bug])}))};
      for(const [k,v] of Object.entries(R))out.R[k]={code:v.code,sol:v.sol||null,stages:v.stages?v.stages.map(s=>s.sol):null,lvl:v.lvl||'',title:v.title,task:(v.stages?v.stages.map(s=>s.task).join(' '):v.task)||''};return out}""")
    json.dump(d,open(sys.argv[2],'w'));print('errors',errs[:3]);b.close()
