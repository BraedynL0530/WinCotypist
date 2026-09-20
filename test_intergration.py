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
    server = ThreadingHTTPServer(("127.0.0.1", 0), MockAIHandler)
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    url = (f"http://127.0.0.1:"
           f"{server.server_port}/predict")
    yield url
    server.shutdown()
    server.server_close()
    thread.join()
def test_health_endpoint(mock_server_url: str) -> None:
    """Test that the mock server health endpoint works."""

    url = mock_server_url.replace("/predict","/health")
    response = requests.get(url, timeout=5)

    assert response.status_code ==  200
    assert response.json() == {"status": "ok"}

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
    assert response == text
    assert confidence == 91.5
def test_spaces_are_normalized(mock_server_url: str,) -> None:
    """Test response normalization through HTTP."""
    http_response = send_text_to_server(" hello123 ",mock_server_url)
    response, confidence = parse_http_response(http_response)
    assert response == "hello123"
    assert confidence == 91.5
def test_server_returns_json(mock_server_url: str,) -> None:
    """Test that server returns json response."""
    http_response = send_text_to_server("hello",mock_server_url)
    data = http_response.json()
    assert isinstance (data, dict)
    assert "response" in data
    assert "confidence" in data
def test_invalid_json_response() -> None:
    """Test handling of invalid JSON from the server."""
    server = ThreadingHTTPServer(("127.0.0.1",0),MockAIHandler)
    thread = Thread(target=server.serve_forever, daemon=True,)
    thread.start()
    url = (f"http://127.0.0.1:"
           f"{server.server_port}/invalid-json")
    try:
        http_response = send_text_to_server("hello", url,)
        with pytest.raises(InvalidJSONError):
            parse_http_response(http_response)
    finally:
        server.shutdown()
        server.server_close()
        thread.join()
def test_server_error_is_not_silently_accepted() -> None:
    """Test that a server-side error is surfaced."""
    server = ThreadingHTTPServer(("127.0.0.1",0),MockAIHandler)
    thread = Thread(target=server.serve_forever,daemon=True,)
    thread.start()
    url = (f"http://127.0.0.1:"
           f"{server.server_port}/server-error")
    try:
        with pytest.raises(requests.HTTPError):
            send_text_to_server("hello", url,max_retires=0)
    finally:
        server.shutdown()
        server.server_close()
        thread.join()
def test_unreachable_server() -> None:
    """Test that connection failure becomes an AIRequestError."""

    with pytest.raises(AIrequestError):
        send_text_to_server("hello","http://127.0.0.1:1/predict", max_retires=0)




