"""Build HINTS (tools used + outline skeleton) and WIDGET_LESSON from the audit data.
usage: python3 tools/hints.py <data.json> content/hints.js tools/"""
import ast, json, sys, re
sys.path.insert(0, sys.argv[3])
import audit as A  # noqa  (re-uses concepts() and TAUGHT)

NAMES = {
 'print':'print()','print_sep_end':'print(sep=, end=)','input':'input()','fstring':'f-strings','str_basic':'string methods (strip, lower, split…)','index':'indexing [i]','slice':'slicing [a:b]','unpack':'unpacking (a, b = …)','len':'len()',
 'int':'int()','float':'float()','str()':'str()','round':'round()','fmt_spec':'format specs (:.2f, :,)','arith':'arithmetic (+ - * / // % **)','type':'type()',
 'def':'def (functions)','return':'return','default_arg':'default parameter values',
 'compare':'comparisons (== != < >)','chain':'chained comparisons','if':'if / elif / else','bool':'True / False',
 'boolop':'and / or','not':'not','in_str':'in (inside a string)','str_q':'string questions (isdigit, startswith…)',
 'ifexp':'conditional expression (x if c else y)','match':'match',
 'while':'while loops','augassign':'+= and -=','for':'for loops','range':'range()','break':'break','continue':'continue',
 'list':'lists','list_methods':'list methods (append, sort…)','sorted':'sorted()','sum_max_min':'sum() / max() / min()','enumerate':'enumerate()','enumerate_start':'enumerate(…, 1)','in_list':'in (inside a list)','listcomp':'list comprehensions','abs':'abs()',
 'dict':'dictionaries','dict_methods':'dict methods (get, items…)','del':'del','is':'is None','none':'None',
 'join':'join()','split_max':'split(sep, maxsplit)','tuple':'tuples','zip':'zip()','repr':'repr()','conv_r':'!r in f-strings',
 'lambda':'lambda','key_arg':'key= for sorting','reverse_arg':'reverse=True','minmax_key':'max/min with key=','default_kw':'default= in max/min',
 'any_all':'any() / all()','genexp':'generator expressions','dict_advanced':'setdefault / update / pop','align_fmt':'alignment in f-strings (:<10)',
 'with_open':'with open(…) as f','file_methods':'file read/write','splitlines':'splitlines()','chr_ord':'ord() / chr()',
}
SKIP = {'variable','comment','else','truthiness','str_concat','bool'}

def skeleton(sol, starter):
    keep = {l.rstrip() for l in (starter or '').splitlines() if l.strip()}
    try:
        tree = ast.parse(sol)
    except SyntaxError:
        return None
    lines = sol.splitlines()
    out = []
    def seg(n):
        return '\n'.join(lines[n.lineno-1:n.end_lineno])
    def emit(n, text):
        out.append(' ' * n.col_offset + text)
    def walk(body):
        for n in body:
            src = seg(n)
            if src.rstrip() in keep or lines[n.lineno-1].rstrip() in keep and n.lineno == n.end_lineno:
                out.extend(lines[n.lineno-1:n.end_lineno]); continue
            t = type(n).__name__
            if t == 'FunctionDef':
                out.append(lines[n.lineno-1]); walk(n.body)
            elif t == 'For':
                tgt = ast.get_source_segment(sol, n.target)
                emit(n, f'for {tgt} in ___:'); walk(n.body)
            elif t == 'While':
                cond = ast.get_source_segment(sol, n.test)
                emit(n, 'while True:' if cond == 'True' else 'while ___:'); walk(n.body)
            elif t == 'If':
                emit(n, 'if ___:'); walk(n.body)
                orelse = n.orelse
                while len(orelse) == 1 and isinstance(orelse[0], ast.If) and lines[orelse[0].lineno-1].lstrip().startswith('elif'):
                    e = orelse[0]; out.append(' ' * n.col_offset + 'elif ___:'); walk(e.body); orelse = e.orelse
                if orelse:
                    out.append(' ' * n.col_offset + 'else:'); walk(orelse)
            elif t == 'With':
                out.append(lines[n.lineno-1]); walk(n.body)
            elif t == 'Return':
                emit(n, 'return ___' if n.value is not None else 'return')
            elif t in ('Break', 'Continue', 'Pass'):
                emit(n, t.lower())
            elif t == 'Assign':
                tg = ', '.join(ast.get_source_segment(sol, x) for x in n.targets)
                emit(n, f'{tg} = ___')
            elif t == 'AugAssign':
                tg = ast.get_source_segment(sol, n.target); op = {'Add': '+=', 'Sub': '-=', 'Mult': '*=', 'Div': '/=', 'FloorDiv': '//='}.get(type(n.op).__name__, '+=')
                emit(n, f'{tg} {op} ___')
            elif t == 'Expr':
                v = n.value
                if isinstance(v, ast.Call):
                    fn = ast.get_source_segment(sol, v.func)
                    if not v.args and not v.keywords: emit(n, f'{fn}()')
                    else: emit(n, f'{fn}(___)')
                else:
                    emit(n, '___')
            elif t == 'Delete':
                emit(n, 'del ___')
            else:
                out.extend(lines[n.lineno-1:n.end_lineno])
    walk(tree.body)
    # tidy: collapse runs of identical lines
    res = []
    for l in out:
        if res and res[-1] == l and l.strip() == '___': continue
        res.append(l)
    return '\n'.join(res) + '\n'

def main():
    d = json.load(open(sys.argv[1]))
    order = [l['id'] for l in d['lessons']]
    pos = {l: i for i, l in enumerate(order)}
    pos['pj-a'] = pos['w0-test'] + .2; pos['pj-b'] = pos['w1-test'] + .2; pos['pj-c'] = pos['w2-test'] + .2; pos['pj-intro'] = pos['w0-test'] + .1
    titles = {l['id']: l['title'] for l in d['lessons']}
    wl = {}
    for l in d['lessons']:
        for k, i in l['w']: wl[(k, i)] = l['id']
    H = {}
    def tools(code):
        cs = A.concepts(code)
        out = []
        for c in sorted(cs, key=lambda c: (pos.get(A.TAUGHT.get(c) or '', 999), c)):
            if c in SKIP or c.startswith('SYNTAX') or c not in NAMES: continue
            les = A.TAUGHT.get(c)
            out.append([NAMES[c], les or '', titles.get(les, '')])
        return out
    for (k, wid), L in wl.items():
        if k != 'r': continue
        r = d['R'].get(wid)
        if not r: continue
        if r['stages']:
            for i, s in enumerate(r['stages']):
                H[f'{wid}#{i}'] = {'t': tools(s), 's': skeleton(s, r['code'])}
        elif r['sol']:
            H[wid] = {'t': tools(r['sol']), 's': skeleton(r['sol'], r['code'])}
    WL = {wid: L for (k, wid), L in wl.items() if k == 'r'}
    open(sys.argv[2], 'w').write('const HINTS=' + json.dumps(H, ensure_ascii=False) + ';\nconst WIDGET_LESSON=' + json.dumps(WL) + ';\n')
    print('hints', len(H))
    for key in ['w2l_stats', 'x1_validator', 'ledger_c#2']:
        if key in H: print('---', key, H[key]['t']); print(H[key]['s'])
main()
