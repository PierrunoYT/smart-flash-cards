import http.server
import socketserver
import json
import os
from dotenv import load_dotenv
from urllib.parse import urlparse, parse_qs

# Load environment variables
load_dotenv()

PORT = 8000

class ConfigHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/config':
            # Send configuration data
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            config = {
                'OPENROUTER_API_KEY': os.getenv('OPENROUTER_API_KEY', ''),
                'SITE_URL': os.getenv('SITE_URL', 'https://github.com/yourusername/flash-card'),
                'SITE_NAME': os.getenv('SITE_NAME', 'Flash Card Language Learning App')
            }
            
            self.wfile.write(json.dumps(config).encode())
            return
        
        # Serve static files
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def end_headers(self):
        # Enable JavaScript modules
        self.send_header('Access-Control-Allow-Origin', '*')
        if self.path.endswith('.js'):
            self.send_header('Content-Type', 'application/javascript')
        super().end_headers()

print(f"Starting server at http://localhost:{PORT}")
with socketserver.TCPServer(("", PORT), ConfigHandler) as httpd:
    httpd.serve_forever()
