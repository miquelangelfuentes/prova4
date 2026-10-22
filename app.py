#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Servidor local per a l'App del Taller de Docents.
Repositori: miquelangelfuentes/prova4
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    global PORT
    # Canvia al directori del projecte
    os.chdir(DIRECTORY)

    # Cerca un port lliure si 8080 estigués ocupat
    max_attempts = 10
    httpd = None
    for attempt in range(max_attempts):
        try:
            httpd = socketserver.TCPServer(("", PORT), Handler)
            break
        except OSError:
            print(f"El port {PORT} està ocupat, provant {PORT + 1}...")
            PORT += 1

    if not httpd:
        print("No s'ha pogut obrir cap port per al servidor.")
        sys.exit(1)

    url = f"http://localhost:{PORT}"
    print("=" * 60)
    print(f"🎓 App del Taller de Docents en marxa!")
    print(f"📍 Obrint al navegador: {url}")
    print(f"Prem Ctrl+C per aturar el servidor.")
    print("=" * 60)

    # Obre el navegador automàticament
    webbrowser.open(url)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor aturat correctament. Fins aviat!")
        httpd.server_close()

if __name__ == "__main__":
    run()
