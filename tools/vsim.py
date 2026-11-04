import asyncio,re,threading,http.server,socketserver,functools
from playwright.async_api import async_playwright
import os
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
VEND=ROOT+'/tools/vendor/'
import glob
CMF={os.path.basename(f)[:-3]:f for f in glob.glob(VEND+'cm/**/*.js',recursive=True)}
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
socketserver.TCPServer.allow_reuse_address=True
srv=socketserver.TCPServer(('127.0.0.1',8791),functools.partial(Q,directory=ROOT));threading.Thread(target=srv.serve_forever,daemon=True).start()
async def route(r):
    u=r.request.url
    if 'skulpt' in u: return await r.fulfill(body=open(VEND+('sk120-skulpt-stdlib.js' if 'stdlib' in u else 'sk120-skulpt.min.js')).read(),content_type='application/javascript')
    m=re.search(r'codemirror@?/?5\.65\.16/(?:lib/|mode/python/|mode/|addon/[a-z]+/)?([a-z-]+)(?:\.min)?\.(js|css)',u)
    if m and m.group(2)=='js':
        try: return await r.fulfill(body=open(CMF[m.group(1)]).read(),content_type='application/javascript')
        except Exception: pass
    if u.startswith('http://127.0.0.1'): return await r.continue_()
    return await r.abort()
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();ctx=await b.new_context(viewport={'width':1280,'height':900});pg=await ctx.new_page()
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.route('**/*',route);await pg.goto('http://127.0.0.1:8791/')
        await pg.wait_for_function("()=>typeof engine!=='undefined'&&engine!=='loading'",timeout=40000)
        print('engine:',await pg.evaluate("engine"),'| CM:',await pg.evaluate("typeof CMready!=='undefined'&&CMready"))
        print('sync:',await pg.evaluate("document.querySelector('#syncStatus')?.textContent"))
        r=await pg.evaluate("runPython('print(sum(range(5)))',{},'').then(x=>x.out)");print('run:',repr(r))
        print('CAN_EMBED:',await pg.evaluate("CAN_EMBED"),'| embed buttons:',await pg.evaluate("document.querySelectorAll('[data-embed]').length"))
        print('SAMPLE:',await pg.evaluate("SAMPLE"))
        await pg.evaluate("passEx('quiz-w0test');saveProg()");await pg.reload()
        await pg.wait_for_function("()=>typeof prog!=='undefined'",timeout=20000)
        print('progress kept after reload:',await pg.evaluate("!!prog.ex['quiz-w0test']"))
        print('errors:',errs[:5])
        await b.close()
asyncio.run(main());srv.shutdown()
