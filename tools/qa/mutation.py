import ast,json,sys,subprocess,re,copy,concurrent.futures as cf
ex=json.load(open(sys.argv[1]));INP='⁣'
def norm(x):
    x=x.replace('\r','');x=re.sub(r'[ \t]+$','',x,flags=re.M);return re.sub(r'^\n+|\n+$','',x)
def run(pre,code,after,exp,file):
    prog=pre+'\n'+(code+'\n'+after if after else code)+'\n_dump()\n'
    try: r=subprocess.run(['python3','-I','-c',prog],capture_output=True,text=True,timeout=5,input='')
    except subprocess.TimeoutExpired: return False
    out=r.stdout;k=out.rfind('@@VFS@@\n');user=out[:k] if k>=0 else out
    if r.returncode!=0: return False
    if file:
        vfs={}
        for ch in out[k+8:].split('@@F@@')[1:]:
            nl=ch.index('\n');vfs[ch[:nl]]=re.sub(r'@@E@@\n?$','',ch[nl+1:])
        g=vfs.get(file);return g is not None and norm(g)==norm(exp)
    cleaned=re.sub(r'[^\n'+INP+r']*'+INP+'[^'+INP+r']*'+INP+r'\n?','',user)
    ls=norm(cleaned).split('\n');n=len(exp.split('\n'));return '\n'.join(ls[-n:])==exp
CMP={ast.Lt:ast.LtE,ast.LtE:ast.Lt,ast.Gt:ast.GtE,ast.GtE:ast.Gt,ast.Eq:ast.NotEq,ast.NotEq:ast.Eq,ast.In:ast.NotIn,ast.NotIn:ast.In}
BIN={ast.Add:ast.Sub,ast.Sub:ast.Add,ast.Mult:ast.Add,ast.FloorDiv:ast.Div,ast.Div:ast.FloorDiv,ast.Mod:ast.FloorDiv,ast.Pow:ast.Mult}
STRM={'strip','lstrip','rstrip','lower','upper','title','capitalize','sort','reverse'}
def sites(tree):
    s=[]
    for n in ast.walk(tree):
        if isinstance(n,ast.Compare):
            for i,o in enumerate(n.ops):
                if type(o) in CMP: s.append(('cmp',n,i))
        elif isinstance(n,ast.BinOp) and type(n.op) in BIN: s.append(('bin',n,0))
        elif isinstance(n,ast.BoolOp): s.append(('bool',n,0))
        elif isinstance(n,ast.UnaryOp) and isinstance(n.op,ast.Not): s.append(('not',n,0))
        elif isinstance(n,ast.Constant) and type(n.value) is int: s.append(('int',n,0))
        elif isinstance(n,ast.Constant) and isinstance(n.value,str) and 0<len(n.value)<40 and n.value.strip(): s.append(('str',n,0))
        elif isinstance(n,(ast.Break,ast.Continue)): s.append(('drop',n,0))
        elif isinstance(n,ast.AugAssign) and type(n.op) in (ast.Add,ast.Sub): s.append(('aug',n,0))
        elif isinstance(n,ast.Call) and isinstance(n.func,ast.Attribute) and n.func.attr in STRM: s.append(('meth',n,0))
    return s
def mutants(code,cap=14):
    try: tree=ast.parse(code)
    except SyntaxError: return []
    n=len(sites(tree));out=[]
    idxs=list(range(n)) if n<=cap else [round(i*(n-1)/(cap-1)) for i in range(cap)]
    for k in dict.fromkeys(idxs):
        t=copy.deepcopy(tree);kind,node,i=sites(t)[k]
        desc=''
        if kind=='cmp': node.ops[i]=CMP[type(node.ops[i])]();desc='comparison flipped'
        elif kind=='bin': node.op=BIN[type(node.op)]();desc='arithmetic operator changed'
        elif kind=='bool': node.op=ast.Or() if isinstance(node.op,ast.And) else ast.And();desc='and/or swapped'
        elif kind=='not':
            t=ast.fix_missing_locations(t);
            class R(ast.NodeTransformer):
                def visit_UnaryOp(s,x):
                    return x.operand if x is node else s.generic_visit(x)
            t=R().visit(t);desc='"not" removed'
        elif kind=='int': node.value=node.value+1;desc=f'number {node.value-1} -> {node.value}'
        elif kind=='str': node.value=node.value+'#';desc=f'text "{node.value[:-1][:20]}" altered'
        elif kind=='drop':
            class D(ast.NodeTransformer):
                def visit(s,x):
                    return ast.Pass() if x is node else s.generic_visit(x)
            t=D().visit(t);desc='break/continue removed'
        elif kind=='aug': node.op=ast.Sub() if isinstance(node.op,ast.Add) else ast.Add();desc='+= / -= swapped'
        elif kind=='meth':
            class M(ast.NodeTransformer):
                def visit_Call(s,x):
                    return x.func.value if x is node else s.generic_visit(x)
            t=M().visit(t);desc=f'.{node.func.attr}() removed'
        try: out.append((desc,ast.unparse(ast.fix_missing_locations(t))))
        except Exception: pass
    return out
def job(e):
    base=[run(t['pre'],e['code'],t['after'],t['exp'],t['file']) for t in e['tests']]
    if not all(base): return {'id':e['id'],'si':e['si'],'bad_base':True}
    ms=mutants(e['code']);surv=[];killed=0
    for desc,mc in ms:
        if mc.strip()==ast.unparse(ast.parse(e['code'])).strip(): continue
        ok=all(run(t['pre'],mc,t['after'],t['exp'],t['file']) for t in e['tests'])
        if ok: surv.append((desc,mc))
        else: killed+=1
    return {'id':e['id'],'si':e['si'],'lvl':e['lvl'],'title':e['title'],'nt':len(e['tests']),'mut':killed+len(surv),'killed':killed,'surv':[s[0] for s in surv],'survcode':[s[1] for s in surv][:3]}
if __name__=='__main__':
    with cf.ProcessPoolExecutor(8) as p: res=list(p.map(job,ex))
    json.dump(res,open(sys.argv[2],'w'))
    tot=sum(r.get('mut',0) for r in res);k=sum(r.get('killed',0) for r in res)
    print('exercise-stages',len(res),'mutants',tot,'killed',k,'score %.1f%%'%(100*k/max(1,tot)),'bad_base',sum(1 for r in res if r.get('bad_base')))
