import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

class MockAIHandler(BaseHTTPRequestHandler):
    """Simple local server that imitates the AI backend"""
    def do_post(self) -> None:
        """Handle Post requests"""
        if self.path == "/predict":
            self._handle_predict()
            return
        if self.path == "/invalid-json":
            self._send_invalid_json()
            return
        self.send_error(404, "endpoint not found")
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





