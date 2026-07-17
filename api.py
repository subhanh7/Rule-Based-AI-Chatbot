import json
import logging
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse

from config import CHATBOT_NAME, WELCOME_MESSAGE
from input_handler import sanitize_input
from response_engine import get_response

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class ChatbotHTTPRequestHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        """Sets headers to allow cross-origin requests from the React dev server."""
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        """Handle preflight requests."""
        self.send_response(200, "ok")
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        """Handle GET requests (e.g., config fetch)."""
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == "/api/config":
            self.send_response(200)
            self._send_cors_headers()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            
            response_data = {
                "botName": CHATBOT_NAME,
                "welcomeMessage": WELCOME_MESSAGE
            }
            self.wfile.write(json.dumps(response_data).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        """Handle POST requests (e.g., chat messages)."""
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == "/api/chat":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode("utf-8"))
                user_message = data.get("message", "")
                
                sanitized_text = sanitize_input(user_message)
                
                if not sanitized_text:
                    bot_reply = "Please type something."
                else:
                    bot_reply = get_response(sanitized_text)
                
                response_data = {
                    "response": bot_reply
                }
                
                self.send_response(200)
                self._send_cors_headers()
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(response_data).encode("utf-8"))
                
            except json.JSONDecodeError:
                self.send_response(400)
                self._send_cors_headers()
                self.end_headers()
                self.wfile.write(b'{"error": "Invalid JSON"}')
        else:
            self.send_response(404)
            self.end_headers()


def run_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, ChatbotHTTPRequestHandler)
    logging.info(f"Starting API server on port {port}...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    logging.info("Stopping API server...\n")


if __name__ == "__main__":
    run_server()
