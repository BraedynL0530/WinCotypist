import pytest
from main import parse_ai_repsonse


def test_normal_response() -> None:
    """Test a normal AI response"""
    json_data = '{"response":"hello", "confidence":89.3}'
    response, confidence = parse_ai_repsonse(json_data)

    assert response == "hello"
    assert confidence == 89.3
def test_unicode_response()-> None:
    """Test a response containing unicode characters"""
json_data = '{"response":"cafe", "confidence":95.5}'

response, confidence = parse_ai_repsonse(json_data)
assert response == "cafe"
assert confidence == 95.5

def test_non_english_response() -> None:
    """Test a non-english response"""
    json_data = '{"response":"namaste","confidence":91.2}'
    response, confidence = parse_ai_repsonse(json_data)
    assert response == "namaste"
    assert confidence == 91.2

def test_alphanumeric_response() -> None:
    """Test the alphanumeric requirement,"""
    json_data = '{"response":"hello123","confidence":87.0}'
    response, confidence = parse_ai_repsonse(json_data)
    assert response.isalnum()
    assert confidence == 87.0

def test_confidence_is_float() -> None:
    """Test that the response must be a string"""

    json_data = '{"response":"hello","confidence":89.0}'
    response, confidence = parse_ai_repsonse(json_data)
    assert isinstance(confidence, float)
    assert isinstance(response, str)

def test_invalid_response_type() -> None:
    """Test that the response must be  a string"""
    json_data = '{"response":123,"confidence":89.3}'
    with pytest.raises(TypeError):
        parse_ai_repsonse(json_data)

def test_invalid_json() -> None:
    """Test the invalid JSON raises an error"""
    json_data = '{"response":"hello","confidence":89.3'
    with pytest.raises(ValueError):
        parse_ai_repsonse(json_data)

def test_missing_response() -> None:
    """Test that a missing response field raises an error"""
    json_data = ('{"confidence":89.3}')
    with pytest.raises(KeyError):
        parse_ai_repsonse(json_data)