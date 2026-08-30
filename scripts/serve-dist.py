#!/usr/bin/env python3
"""Serve dist/ on :4321 so what gets reviewed is what actually ships.

`astro dev` served stale CSS three times during the build, which cost real time
chasing bugs that only existed in the dev bundle. Review against the build.
"""
import http.server, functools, os, sys
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dist')
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
    def log_message(self, *a): pass
os.chdir(root)
http.server.HTTPServer(('127.0.0.1', 4321), H).serve_forever()
