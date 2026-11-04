/* Web Worker that runs real CPython (Pyodide). One program per message; output and errors come back as data. */
const BASE=new URL('../../vendor/pyodide/',self.location.href).href;
importScripts(BASE+'pyodide.js');
const HARNESS=`
import sys, io
class _Out(io.StringIO):
    LIMIT = 200000
    def write(self, s):
        if self.tell() + len(s) > self.LIMIT:
            raise RuntimeError("Too much output (more than 200,000 characters). Is a loop printing forever?")
        return super().write(s)
def _run(src):
    out = _Out(); old = sys.stdout; sys.stdout = out
    err = None; line = None
    try:
        exec(compile(src, "<user>", "exec"), {"__name__": "__main__"})
    except SystemExit:
        pass
    except SyntaxError as e:
        err = type(e).__name__ + ": " + str(e.msg); line = e.lineno
    except BaseException as e:
        msg = str(e)
        err = type(e).__name__ + (": " + msg if msg else "")
        tb = e.__traceback__
        while tb is not None:
            if tb.tb_frame.f_code.co_filename == "<user>":
                line = tb.tb_lineno
            tb = tb.tb_next
    finally:
        sys.stdout = old
    return (out.getvalue(), err, line)
`;
let py=null;
loadPyodide({indexURL:BASE}).then(p=>{py=p;py.runPython(HARNESS);postMessage({type:'ready'})}).catch(e=>postMessage({type:'fail',error:String(e&&e.message||e)}));
onmessage=ev=>{const {id,src}=ev.data;postMessage({type:'start',id});let r;
  try{const fn=py.globals.get('_run');const res=fn(src);r=res.toJs();res.destroy();fn.destroy()}catch(e){r=['',String(e&&e.message||e),null]}
  postMessage({type:'result',id,out:r[0],err:r[1],line:r[2]})};
