#!/usr/bin/env bash
# Full QA: exercise data dump -> real-CPython check of every reference solution -> concept audit -> browser smoke test.
# usage: bash tools/qa/check.sh   (needs: node + playwright, python3)
set -e
cd "$(dirname "$0")/../.."
OUT=${TMPDIR:-/tmp}/cs50p-qa; rm -rf "$OUT"; mkdir -p "$OUT"
NODE_PATH=${NODE_PATH:-$(npm root -g)} node tools/qa/dump.js "$OUT"
(cd "$OUT" && python3 -I "$OLDPWD/tools/qa/cpycheck.py" jobs.json)
(cd "$OUT" && python3 "$OLDPWD/tools/audit.py" data.json "$OLDPWD/tools/allow.json" | tail -3)
NODE_PATH=${NODE_PATH:-$(npm root -g)} node tools/qa/smoke.js
