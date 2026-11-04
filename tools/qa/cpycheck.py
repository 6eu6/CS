"""Run every reference solution against its tests in real CPython. usage: python3 tools/qa/cpycheck.py <jobs.json>"""
import json,subprocess,re,sys
jobs=json.load(open(sys.argv[1]))
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
sys.exit(1 if bad else 0)
