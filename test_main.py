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

def test_alphanumeric_response() -> None:
    """Test the alphanumeric requirement."""
    json_data = '{"response":"hello123","confidence":87.0}'
    response, confidence = parse_ai_response(json_data)
    assert response.isalnum()
    assert confidence == 87.0

def test_confidence_is_float() -> None:
    """Test that confidence is returned as a float"""
    json_data = '{"response":"hello","confidence":89}'
    response, confidence = parse_ai_response(json_data)
    assert isinstance(response, str)
    assert isinstance(confidence, float)

def test_invalid_response_type() -> None:
    """Test that response must be a string."""
    json_data = '{"response":"123","confidence":89.3}'
    with pytest.raises(InvalidAIResponseError):parse_ai_response(json_data)

def text_invalid_json() -> None:
    """Test that invalid JSON raises an error."""
    json_data = '{"response":"hello","confidence":89.3}'
    with pytest.raises(InvalidJSONError):parse_ai_response(json_data)

def test_missing_confidence() -> None:
    """Test that missing confidence raises an error."""
    json_data = '{"response":"hello"}'
    with pytest.raises(MissingAIFieldError):parse_ai_response(json_data)

def test_top_level_json_must_be_object() -> None:
    """Test that top-level JSON value must be an object."""
    json_data = '["hello",89.3]'
    with pytest.raises(InvalidJSONError):parse_ai_response(json_data)
 def test_confidence_string_is_rejected() -> None:
     """Test that confidence cannot be arbitrary text"""
     json_data = '{"response":"hello","confidence":"high"}'
     with pytest.raises(InvalidConfidenceError):
         parse_ai_response(json_data)

def test_boolean_confidence_is_rejected() -> None:
    """Test that boolean confidence is rejected."""
    json_data = '{"response":"hello","confidence":true}'
    with pytest.raises(InvalidAIResponseError):parse_ai_response(json_data)

def test_confidence_above_range_is_rejected() -> None:
    """Test that confidence cannot exceed 100"""
    json_data = '{"response":"hello","confidence":101}'
    with pytest.raises(InvalidAIResponseError):parse_ai_response(json_data)

def test_negative_confidence_is_rejected() -> None:
    """Test that confidence cannot be negative"""
    json_data = '{"response":"hello","confidence":-1}'

    with pytest.raises(InvalidConfidenceError):parse_ai_response(json_data)

def test_empty_response_is_allowed() -> None:
    """Test that an empty response can be parsed."""
    json_data = '{"response":"","confidence":50}'
    response, confidence = parse_ai_response(json_data)
    assert response == ""
    assert confidence == 50.0

def test_response_whitespace_is_allowed() -> None:








