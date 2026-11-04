#!/usr/bin/env bash
# Mutation testing of the exercise tests: inject small bugs into every reference solution and check the tests catch them.
# A surviving mutant means a wrong solution could pass. Prints the overall score and the weakest exercises.
set -e
cd "$(dirname "$0")/../.."
OUT=${TMPDIR:-/tmp}/cs50p-mut; mkdir -p "$OUT"
NODE_PATH=${NODE_PATH:-$(npm root -g)} node tools/qa/dump-exercises.js "$OUT/ex.json"
python3 -I tools/qa/mutation.py "$OUT/ex.json" "$OUT/mut.json"
python3 - "$OUT/mut.json" <<'PY'
import json,sys
r=json.load(open(sys.argv[1]))
w=sorted([x for x in r if x.get('mut',0)>=4 and x['killed']/x['mut']<0.6],key=lambda x:x['killed']/x['mut'])
print('exercises below 60%:',len(w))
for x in w[:15]: print(f"  {x['id']} stage {x['si']}: {x['killed']}/{x['mut']} survivors: {x['surv'][:3]}")
PY
