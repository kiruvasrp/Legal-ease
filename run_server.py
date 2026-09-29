#!/usr/bin/env python3
"""
LegalEase AI - Local Development Web Server
Runs a lightweight local HTTP server and launches the default browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

def find_available_port(start_port=8000, max_attempts=50):
    import socket
    for port in range(start_port, start_port + max_attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('127.0.0.1', port)) != 0:
                return port
    return start_port

def run():
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)
    port = find_available_port(8000)

    handler = http.server.SimpleHTTPRequestHandler
    
    # Enable socket address reuse
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", port), handler) as httpd:
        url = f"http://localhost:{port}"
        print("=" * 60)
        print(" LegalEase AI - Precision Legal Document Architect")
        print(f" Web Server Active at: {url}")
        print(f" Serving Directory: {web_dir}")
        print(" Press Ctrl+C to terminate the server.")
        print("=" * 60)
        
        # Open in default web browser
        try:
            webbrowser.open(url)
        except Exception:
            pass
            
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down LegalEase AI server...")
            httpd.shutdown()

if __name__ == "__main__":
    run()
