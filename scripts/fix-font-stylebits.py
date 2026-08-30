#!/usr/bin/env python3
"""Make head.macStyle agree with OS/2.fsSelection on the static faces.

Caveat 700 and Silkscreen 700 came out of `instancer.instantiateVariableFont`
with macStyle=1, which is the ITALIC bit set and the BOLD bit clear, while
fsSelection=160 says bold-and-not-italic. The two disagree, and the file is
therefore describing itself two different ways.

Chrome does not care: it trusts the @font-face descriptors. Firefox reads
macStyle during style matching, so a face that calls itself italic is the kind
of thing that can fail to match `font-style: normal`.

macStyle bit 0 = italic, bit 1 = bold.
fsSelection bit 0 = italic, bit 5 = bold.

Idempotent. Run from the repo root:  python3 scripts/fix-font-stylebits.py
"""
import os, sys
from fontTools.ttLib import TTFont

D = os.path.join(os.path.dirname(__file__), '..', 'public', 'fonts')
changed = []

for name in sorted(os.listdir(D)):
    if not name.endswith('.woff2'):
        continue
    path = os.path.join(D, name)
    f = TTFont(path)
    fs = f['OS/2'].fsSelection
    want = (fs & 1) | ((fs >> 5 & 1) << 1)      # italic from bit0, bold from bit5
    have = f['head'].macStyle
    if have == want:
        print(f'  ok      {name:26s} macStyle={have}')
        continue
    f['head'].macStyle = want
    f.flavor = 'woff2'
    f.save(path)
    changed.append(name)
    print(f'  FIXED   {name:26s} macStyle {have} -> {want}')

print(f'\n{len(changed)} file(s) rewritten' + (': ' + ', '.join(changed) if changed else ''))
