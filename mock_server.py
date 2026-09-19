import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

class MockAIHandler(BaseHTTPRequestHandler):
    """Simple local server that imitates the AI backend"""
    def do_POST(self) -> None:
        """Handle Post requests"""
        if self.path == "/predict":
            self._handle_predict()
            return
        if self.path == "/invalid-json":
            self._send_invalid_json()
            return
        if self.path == "/server-error":
            self.send_error(500, "simulated server error")
            return
        self.send_error(404,"Endpoint not found")

    def _handle_predict(self) -> None:
        """Handle the normal prediction endpoint."""

        content_length = int(self.headers.get("Content-Length",0))
        body = self.rfile.read(content_length)

        try:
            data = json.loads(body)
        except json.JSONDecodeError:
            self.send_error(400,"Invalid JSON")
            return
        text = data.get("text")
        if not isinstance(text, str):
            self.send_error(400,"text must be a string")
            return
        ai_response = {
            "response": text,
            "confidence": 91.5,

        }
        self._send_json(200,ai_response)
    def _send_invalid_json(self) -> None:
        """Send an intentionally invalid JSON response"""
        response_body = b"{this is not a valid JSON"
        self.send_response(200)
        self.send_header ("Content-type", "application/json")
        self.send_header("Content-Length", str(len(response_body)))
        self.end_headers()
        self.wfile.write(response_body)
    def _send_json(self,status_code:int,data: dict[str, object]) -> None:
        """Send a JSON response."""
        response_body = json.dumps(data).encode("utf-8")

        self.send_response(status_code)
        self.send_header("Content-type", "application/json")
        self.send_header("Content-Length",str(len(response_body)))
        self.end_headers()
        self.wfile.write(response_body)
    def log_message(self,format: str,*args: object) -> None:
        """Disable the default HTTP server log"""
        return
def start_server() -> None:
        """Start the local mock AI server"""
        server = ThreadingHTTPServer(("127.0.0.1", 8000),MockAIHandler)
        print("Mock AI server running at "
              "http://127.0.0.1:8000")
        print ("Press Ctrl+C to stop")

        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nStopping server...")
        finally:
            server.server_close()
if __name__ == "__main__":
        start_server()







