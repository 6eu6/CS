import json,subprocess,re,sys
from playwright.sync_api import sync_playwright
s=open('master.html').read()
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page()
    pg.route('**/*',lambda r: r.abort() if r.request.url.startswith('http') else r.continue_())
    pg.set_content('<!doctype html><html><body>'+s+'</body></html>');pg.wait_for_timeout(800)
    jobs=pg.evaluate("""()=>{const out=[];for(const [id,d] of Object.entries(R)){const stages=d.stages||(d.tests?[{tests:d.tests,sol:d.sol}]:[]);
      stages.forEach((st,si)=>st.tests.forEach((t,ti)=>{const code=st.sol;out.push({id,si,ti,prog:prelude(t.files||d.files||{},t.inp)+'\\n'+(t.after?code+'\\n'+t.after:code)+'\\n_dump()\\n',exp:t.exp,file:t.file||null})}))}return out}""")
    b.close()
INP='⁣'
def norm(x): 
    x=x.replace('\r','');x=re.sub(r'[ \t]+$','',x,flags=re.M);return re.sub(r'^\n+|\n+$','',x)
bad=0
for j in jobs:
    r=subprocess.run(['python3','-I','-c',j['prog']],capture_output=True,text=True,timeout=10)
    out=r.stdout;k=out.rfind('@@VFS@@\n');user=out[:k] if k>=0 else out
    vfs={}
    if k>=0:
        for ch in out[k+8:].split('@@F@@')[1:]:
            nl=ch.index('\n');vfs[ch[:nl]]=re.sub(r'@@E@@\n?$','',ch[nl+1:])
    if r.returncode!=0: ok=False;got=r.stderr.strip().splitlines()[-1]
    elif j['file']: got=vfs.get(j['file']);ok=got is not None and norm(got)==norm(j['exp'])
    else:
        cleaned=re.sub(r'[^\n'+INP+r']*'+INP+'[^'+INP+r']*'+INP+r'\n?','',user)
        ls=norm(cleaned).split('\n');n=len(j['exp'].split('\n'));got='\n'.join(ls[-n:]);ok=got==j['exp']
    if not ok: bad+=1;print('MISMATCH',j['id'],j['si'],j['ti'],repr(got)[:200])
print('cpython tests',len(jobs),'mismatches',bad)
