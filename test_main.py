import pytest
from main import (InvalidAIResponseError,InvalidConfidenceError,InvalidJSONError,MissingAIFieldError,
                normalize_response_text,parse_ai_response,validate_input_text,validate_server_url,  )

def test_normal_response() -> None:
    """Test a normal AI response."""
    json_data = '{"response":"hello","confidence":89.3}'
    response, confidence = parse_ai_response(json_data)
    assert response == "hello"
    assert confidence == 89.3

def test_unicode_response() -> None:
    """Test a response containing Unicode characters."""
    json_data = '{"response":"cafe","confidence":95.5}'
    response, confidence = parse_ai_response(json_data)
    assert response == "cafe"
    assert confidence == 95.5

def test_non_english_response() -> None:
    """Test a response containing non-English characters."""
    json_data = '{"response":"नमस्ते","confidence":91.2}'
    response, confidence = parse_ai_response(json_data)
    assert response == "नमस्ते"
    assert confidence == 91.2

