#!/usr/bin/env python3
"""Generate src/data/cv.json from ~/career-ops/cv.md.

cv.md is the private master. It carries a phone number, a personal email and a
long trail of HTML comments recording corrections and do-not-claim notes. NONE
of that may reach a public site, so this script strips rather than filters:
everything between <!-- and --> goes, and the contact line is dropped whole.

Run it whenever cv.md changes:   python3 scripts/build-cv.py
The generated JSON is committed, so the site builds without the private repo.
"""
import json, os, re, sys

SRC = os.path.expanduser('~/career-ops/cv.md')
OUT = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'cv.json')

raw = open(SRC, encoding='utf-8').read()

# 1. every HTML comment, including the multi-line do-not-claim blocks
body = re.sub(r'<!--.*?-->', '', raw, flags=re.S)

# 2. the contact line: phone, personal email, profile URLs
body = re.sub(r'^.*617-834-2779.*$', '', body, flags=re.M)
body = re.sub(r'^.*joinhandshake.*$', '', body, flags=re.M)

def clean(t):
    t = re.sub(r'\s*\n\s*', ' ', t).strip()
    return re.sub(r'  +', ' ', t)

sections, cur, sub = [], None, None
para = []          # buffer for consecutive non-bullet lines

def flush(target):
    """Join buffered lines into one paragraph. Markdown source wraps at ~80
    columns, so a paragraph is a run of lines, not a single line."""
    global para
    if para:
        target.append(clean(' '.join(para)))
        para = []

for line in body.split('\n'):
    if line.startswith('## '):
        if cur is not None: flush(sub['summary_lines'] if sub else cur['intro'])
        cur = {'title': line[3:].strip(), 'intro': [], 'entries': []}
        sections.append(cur); sub = None
    elif line.startswith('### ') and cur is not None:
        flush(sub['summary_lines'] if sub else cur['intro'])
        sub = {'org': line[4:].strip(), 'meta': '', 'summary_lines': [], 'bullets': []}
        cur['entries'].append(sub)
    elif line.startswith('- ') and cur is not None:
        flush(sub['summary_lines'] if sub else cur['intro'])
        (sub['bullets'] if sub else cur['intro']).append(line[2:].strip())
    elif not line.strip():
        if cur is not None: flush(sub['summary_lines'] if sub else cur['intro'])
    elif cur is not None:
        s_ = line.strip()
        # An entry's meta can span several lines, e.g. Olin Shop carries both
        # "**Shop Assistant** ..." and "**Summer Fellow** ...". Absorb every
        # leading emphasised line, otherwise the extras fall into the summary
        # and render with their asterisks showing.
        if sub is not None and not sub['summary_lines'] and not sub['bullets'] \
           and (s_.startswith('**') or s_.startswith('*')):
            piece = clean(s_)
            if sub['meta']:
                # Only add a separator if the previous line does not already
                # end in one, otherwise the join produces " ·  · ".
                joiner = '  ' if sub['meta'].rstrip().endswith('·') else '  ·  '
                sub['meta'] = sub['meta'].rstrip() + joiner + piece
            else:
                sub['meta'] = piece
        elif sub is not None and sub['bullets'] and not s_.startswith('**'):
            sub['bullets'][-1] += ' ' + s_          # continuation of the last bullet
        else:
            para.append(s_)
if cur is not None: flush(sub['summary_lines'] if sub else cur['intro'])

for sec in sections:
    sec['intro'] = [clean(i) for i in sec['intro']]
    for e in sec['entries']:
        e['summary'] = ' '.join(clean(x) for x in e['summary_lines'])
        del e['summary_lines']
        e['bullets'] = [clean(b) for b in e['bullets']]

# 3. refuse to ship if anything private survived
blob = json.dumps(sections)
LEAKS = ['617-834-2779', 'ramzey.burdette2005', 'joinhandshake', '<!--', 'DO NOT', 'DO_NOT']
bad = [l for l in LEAKS if l in blob]
if bad:
    sys.exit(f'ABORT: private content survived stripping: {bad}')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
json.dump(sections, open(OUT, 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
print(f'wrote {OUT}')
for s in sections:
    print(f'  {s["title"]:14s} intro={len(s["intro"]):2d} entries={len(s["entries"]):2d} '
          f'bullets={sum(len(e["bullets"]) for e in s["entries"]):3d}')
