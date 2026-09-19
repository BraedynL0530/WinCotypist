from collections.abc import Generator
from http.server import ThreadingHTTPServer
from threading import Thread

import pytest
import requests

from main import (AIrequestError,InvalidJSONError,parse_http_response,send_text_to_server)
from mock_server import MockAIHandler

@pytest.fixture()
def mock_server_url() -> Generator[str, None, None]:
    """Start a temporary mock AI server.
    The code after yield shuts the server down after each test
    """
    server = ThreadingHTTPServer(("127.0.0.1", 8000),MockAIHandler)
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    url = (f"http://127.0.0.1:"
           f"{server.server_port}/predict")
    yield url
    server.shutdown()
    server.server_close()
    thread.join()

def test_end_to_end_request(mock_server_url: str) -> None:
    """Test the complete request-to-parser flow."""
    http_response = send_text_to_server("hello123",mock_server_url)
    response, confidence = parse_http_response(http_response)

    assert response == "hello123"
    assert response.isalnum()
    assert confidence == 91.5

def test_unicode_end_to_end(mock_server_url: str) -> None:
    """Test that Unicode survives the complete process."""
    text ="नमस्ते"
    http_response = send_text_to_server(text,mock_server_url)
    response,confidence = parse_http_response(http_response)

