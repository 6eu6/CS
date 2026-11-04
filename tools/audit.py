"""Concept audit: every exercise may only use concepts taught at or before its lesson."""
import ast, json, sys, re

TAUGHT = {
 'print':'w0-print','print_sep_end':'w0-print','comment':'w0-print',
 'input':'w0-vars','variable':'w0-vars','fstring':'w0-vars',
 'str_basic':'w0-str','index':'w0-str','slice':'w0-str','unpack':'w0-str','len':'w0-str','str_concat':'w0-str',
 'int':'w0-num','float':'w0-num','str()':'w0-num','round':'w0-num','fmt_spec':'w0-num','arith':'w0-num','type':'w0-num',
 'def':'w0-func','return':'w0-func','default_arg':'w0-func',
 'compare':'w1-if','chain':'w1-if','if':'w1-if','elif':'w1-if','else':'w1-if','bool':'w1-if',
 'boolop':'w1-logic','not':'w1-logic','in_str':'w1-logic','str_q':'w1-logic','truthiness':'w1-logic',
 'ifexp':'w1-func','match':'w1-func',
 'while':'w2-while','augassign':'w2-while',
 'for':'w2-for','range':'w2-for',
 'break':'w2-valid','continue':'w2-valid',
 'list':'w2-lists','list_methods':'w2-lists','sorted':'w2-lists','sum_max_min':'w2-lists','enumerate':'w2-lists','in_list':'w2-lists','listcomp':'w2-lists','abs':'tb-minmax',
 'dict':'w2-dicts','dict_methods':'w2-dicts','del':'w2-dicts','is':'w2-patterns','none':'w2-patterns',
 'join':'tb-join','split_max':'tb-join','enumerate_start':'w2-lists',
 'tuple':'tb-enum','zip':'tb-zip','repr':'tb-repr','conv_r':'tb-repr',
 'lambda':'tb-sorted','key_arg':'tb-sorted','reverse_arg':'tb-sorted',
 'minmax_key':'tb-minmax','default_kw':'tb-minmax',
 'any_all':'tb-anyall','genexp':'tb-anyall',
 'dict_advanced':'tb-dict','align_fmt':'tb-format',
 'with_open':'w2-capstone','file_methods':'w2-capstone','splitlines':'w2-capstone',
 # never taught yet in built weeks:
 'set':None,'reversed':None,'chr_ord':None,'recursion':None,'class':None,'import':None,'try':None,'global':None,'dictcomp':None,'nested_func':None,'starred':None,'divmod':None,'isinstance':None,'str_misc':None,'list()':None,
}
BUILTIN_CALL = {'print':'print','input':'input','int':'int','float':'float','str':'str()','round':'round','len':'len','type':'type','range':'range','sorted':'sorted',
 'sum':'sum_max_min','max':'sum_max_min','min':'sum_max_min','enumerate':'enumerate','zip':'zip','repr':'repr','any':'any_all','all':'any_all','open':'with_open',
 'set':'set','reversed':'reversed','ord':'chr_ord','chr':'chr_ord','abs':'abs','divmod':'divmod','isinstance':'isinstance','list':'list()','dict':'dict','bool':'bool','tuple':'tuple'}
METHOD = {}
for m in 'strip lstrip rstrip lower upper title capitalize replace split'.split(): METHOD[m]='str_basic'
for m in 'isdigit isalpha isalnum isupper islower isspace startswith endswith count find'.split(): METHOD[m]='str_q'
for m in 'append insert remove pop sort extend index reverse copy clear'.split(): METHOD[m]='list_methods'
for m in 'get items keys values'.split(): METHOD[m]='dict_methods'
for m in 'setdefault update'.split(): METHOD[m]='dict_advanced'
for m in 'read write readlines readline'.split(): METHOD[m]='file_methods'
METHOD['join']='join'; METHOD['splitlines']='splitlines'
for m in 'zfill center ljust rjust format partition removeprefix'.split(): METHOD[m]='str_misc'

def concepts(code):
    out=set()
    try: tree=ast.parse(code)
    except SyntaxError as e: return {'SYNTAX:'+str(e)}
    funcs=[]
    for n in ast.walk(tree):
        t=type(n).__name__
        if t=='Call':
            f=n.func
            if isinstance(f,ast.Name) and f.id in BUILTIN_CALL:
                out.add(BUILTIN_CALL[f.id])
                kws={k.arg for k in n.keywords}
                if f.id=='print' and kws & {'sep','end'}: out.add('print_sep_end')
                if 'key' in kws: out.add('minmax_key' if f.id in('max','min') else 'key_arg')
                if 'reverse' in kws: out.add('reverse_arg')
                if 'default' in kws: out.add('default_kw')
                if f.id=='enumerate' and (len(n.args)>1 or 'start' in kws): out.add('enumerate_start')
            elif isinstance(f,ast.Attribute):
                a=f.attr
                if a in METHOD: out.add(METHOD[a])
                if a=='split' and len(n.args)>1: out.add('split_max')
                if a=='sort':
                    kws={k.arg for k in n.keywords}
                    if 'key' in kws: out.add('key_arg')
                    if 'reverse' in kws: out.add('reverse_arg')
                if a=='pop' and len(n.args)==2: out.add('dict_advanced')
        elif t=='If': out.add('if');
        elif t=='IfExp': out.add('ifexp')
        elif t=='Compare':
            out.add('compare')
            if len(n.ops)>1: out.add('chain')
            for op,cmp in zip(n.ops,n.comparators):
                o=type(op).__name__
                if o in('In','NotIn'):
                    out.add('in_list' if isinstance(cmp,(ast.List,ast.Tuple)) else 'in_str')
                if o in('Is','IsNot'): out.add('is')
        elif t=='BoolOp': out.add('boolop')
        elif t=='UnaryOp' and isinstance(n.op,ast.Not): out.add('not')
        elif t=='While': out.add('while')
        elif t=='For': out.add('for')
        elif t=='Break': out.add('break')
        elif t=='Continue': out.add('continue')
        elif t=='AugAssign': out.add('augassign')
        elif t=='List': out.add('list')
        elif t=='ListComp': out.add('listcomp')
        elif t=='Dict': out.add('dict')
        elif t=='DictComp': out.add('dictcomp')
        elif t=='Tuple' and isinstance(n.ctx,ast.Load): out.add('tuple')
        elif t=='GeneratorExp': out.add('genexp')
        elif t=='Lambda': out.add('lambda')
        elif t=='With': out.add('with_open')
        elif t=='Delete': out.add('del')
        elif t=='Match': out.add('match')
        elif t in('Set','SetComp'): out.add('set')
        elif t=='JoinedStr': out.add('fstring')
        elif t=='FormattedValue':
            if n.conversion==114: out.add('conv_r')
            if n.format_spec is not None:
                out.add('fmt_spec')
                spec=''.join(v.value for v in n.format_spec.values if isinstance(v,ast.Constant))
                if re.search(r'[<>^]',spec) or any(isinstance(v,ast.FormattedValue) for v in n.format_spec.values): out.add('align_fmt')
        elif t=='Constant' and n.value is None: out.add('none')
        elif t=='Subscript': out.add('slice' if isinstance(n.slice,ast.Slice) else 'index')
        elif t=='FunctionDef':
            out.add('def'); funcs.append(n)
            if n.args.defaults: out.add('default_arg')
            for c in ast.walk(n):
                if isinstance(c,ast.Call) and isinstance(c.func,ast.Name) and c.func.id==n.name: out.add('recursion')
                if c is not n and isinstance(c,ast.FunctionDef): out.add('nested_func')
        elif t=='Return': out.add('return')
        elif t=='Assign' and any(isinstance(x,ast.Tuple) for x in n.targets): out.add('unpack')
        elif t=='ClassDef': out.add('class')
        elif t in('Import','ImportFrom'): out.add('import')
        elif t=='Try': out.add('try')
        elif t=='Global': out.add('global')
        elif t=='Starred': out.add('starred')
    return out

def main():
    d=json.load(open(sys.argv[1]))
    order=[l['id'] for l in d['lessons']]
    pos={l:i for i,l in enumerate(order)}
    # project parts sit after their week's test
    pos['pj-intro']=pos['w0-test']+0.1; pos['pj-a']=pos['w0-test']+0.2; pos['pj-b']=pos['w1-test']+0.2; pos['pj-c']=pos['w2-test']+0.2
    widget_lesson={}
    for l in d['lessons']:
        for kind,i in l['w']: widget_lesson[(kind,i)]=l['id']
    allow=json.load(open(sys.argv[2])) if len(sys.argv)>2 else {}
    report=[];tags={}
    def check(kind,wid,code,label):
        L=widget_lesson.get((kind,wid))
        if not L or code is None: return
        cs=concepts(code)
        tags.setdefault(wid,set()).update(cs)
        for c in sorted(cs):
            if c.startswith('SYNTAX'): report.append((L,wid,label,c,'')); continue
            t=TAUGHT.get(c,'??')
            if c in allow.get(wid,[]): continue
            if t is None or t=='??' or pos.get(t,999)>pos[L]:
                report.append((L,wid,label,c,t))
    for (kind,wid),L in widget_lesson.items():
        if kind=='r':
            r=d['R'].get(wid)
            if not r: continue
            check('r',wid,r['code'],'starter')
            if r['sol']: check('r',wid,r['sol'],'solution')
            for i,s in enumerate(r['stages'] or []): check('r',wid,s,f'step {i+1} solution')
        elif kind=='p': check('p',wid,'\n'.join(d['PARS'][wid]['lines']),'arrange')
        elif kind=='b':
            b=d['BLANKS'][wid];code=re.sub(r'⟦(\d+)⟧',lambda m:b['ans'][int(m.group(1))][0],b['code']);check('b',wid,code,'fill-in')
        elif kind=='g': g=d['BUGS'][wid];check('g',wid,g['code'],'bug code');check('g',wid,g['fix'] if not g['fix'].startswith(' ') else 'if True:\n'+g['fix'],'bug fix')
    report.sort(key=lambda x:(pos[x[0]],x[1]))
    for r in report: print(f"{r[0]:14} {r[1]:22} {r[2]:16} uses {r[3]:15} (taught in {r[4]})")
    print('TOTAL',len(report))
    json.dump({k:sorted(v) for k,v in tags.items()},open('tags.json','w'))
if __name__ == "__main__":
    main()
