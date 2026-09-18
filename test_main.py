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