import pytest

from main import (InvalidJSONError,InvalidAIResponseError,InvalidConfidenceError,MissingAIFieldError,normalize_response_text,parse_ai_response,validate_input_text,validate_server_url)

@pytest.mark.parametrize("text",[ "hello","hello123","café","naïve","नमस्ते","你好","こんにちは","안녕하세요","hello안녕하세요","123456789"])
def test_various_valid_responses(text: str) -> None:
    """Test that different valid response strings can be parsed."""
    json_data =( f'{{"response":"{text}", "confidence":89.3}}')
    response, confidence = parse_ai_response(json_data)
    assert response == text
    assert confidence == 89.3
@pytest.mark.parametrize("confidence",[0,0.0,25,50.5,89.3,99.9,100,100.0])
def test_valid_confidence_values (confidence: float) -> None:
    """Test confidence values at valid points in the range"""
    json_data = (f'{{"response":"hello", "confidence":{confidence}}}')
    response, returned_confidence = parse_ai_response(json_data)
    assert response == "hello"
    assert returned_confidence == float(confidence)

@pytest.mark.parametrize("confidence", [-100,-1,100.1,101,1000])
def test_invalid_confidence (confidence: float) -> None:
    """Test confidence values outside the allowed range."""
    json_data = (f'{{"response":"hello", "confidence":{confidence}}}')
    with pytest.raises(InvalidConfidenceError):parse_ai_response(json_data)

@pytest.mark.parametrize("json_data",["","hello","{",'{"response":"hello"','{"response":}','{"response": "hello", "confidence":}'] )
def test_various_invalid_json(json_data: str) -> None:
    """Test several malformed JSON inputs."""
    with pytest.raises(InvalidJSONError):parse_ai_response(json_data)

@pytest.mark.parametrize("json_data",
    [
        '{"response":123,"confidence":89.3}',
        '{"response":true,"confidence":89.3}',
        '{"response":[],"confidence":89.3}',
        '{"response":{},"confidence":89.3}',
        '{"response":"hello","confidence":"high"}',
        '{"response":"hello","confidence":true}',
        '{"response":"hello","confidence":[]}',
    ],
)
def test_Wrong_data_types(json_data: str) -> None:
    """Test JSON responses containing incorrect data types."""
    with pytest.raises(InvalidAIResponseError):parse_ai_response(json_data)

@pytest.mark.parametrize("json_data",['{"confidence":89.3}','{"response":"hello"}', "{}"])
def test_missing_required_fields(json_data: str) -> None:
    """Test responses with missing required fields."""
    with pytest.raises(MissingAIFieldError):
        parse_ai_response(json_data)

@pytest.mark.parametrize(
    "text",
    [
        "hello",
        " hello ",
        "hello123",
        "café",
        "नमस्ते",
        "你好",
    ],
)
def test_input_validation_accepts_valid_text(text: str) -> None:
    """"Test the normal input text is accepted."""
    assert validate_input_text(text) == text
@pytest.mark.parametrize(
    "text",
    [
        "",
        " ",
        "   ",
        "\t",
        "\n",
    ],
)
def test_empty_or_whitespace_input_is_rejected(text: str) -> None:
    """Test that empty or whitespace-only input is rejected."""
    with pytest.raises(ValueError):validate_input_text(text)

def test_input_at_maximum_length_is_rejected() -> None:
    """Test the input above the maximum length is rejected"""
    text = "a" * 5001
    with pytest.raises(ValueError):validate_input_text(text)
def test_input_at_maximum_length_is_allowed() -> None:
    text = "a" * 5000
    assert validate_input_text(text) == text

@pytest.mark.parametrize("url",["http://127.0.0.1:8000/predict", "https://example.com", "http://localhost",])
def test_valid_urls(url: str) -> None:
    """Test valid http and https urls are accepted."""
    assert validate_server_url(url) == url
@pytest.mark.parametrize(
    "url",
    [
        "",
        "localhost",
        "ftp://example.com",
        "not-a-url",
        "127.0.0.1:8000",
    ],
)
def test_invalid_urls(url: str) -> None:
    """Test invalid server URLs."""
    with pytest.raises(ValueError):validate_server_url(url)

@pytest.mark.parametrize(
    "text, expected",
    [
        (" hello ", "hello"),
        ("\thello\t", "hello"),
        ("\nhello\n", "hello"),
        (" café ", "café"),
        (" नमस्ते ", "नमस्ते"),
    ],
)
def test_response_normalization(text: str, expected: str) -> None:
    """Test whitespace removal and Unicode normalization."""
    assert normalize_response_text(text) == expected

@pytest.mark.parametrize(
    "text",
    [
        "hello123",
        "123456",
        "abcdef",
        "你好",
    ],
)
def test_alphanumeric_values(text: str) -> None:
    """Test strings that should satisfy the alphanumeric condition."""
    assert text.isalnum()