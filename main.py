import json
import math
import time
from logging import exception

import unicodedata
from urllib.parse import urlparse
from typing import Any

import requests

Response_key = "response"
Confidence_key = "confidence"
Max_input_length = 5000
min_confidence = 0.0
max_confidence = 100.0

class AiParserError(Exception):
    """Base exception for AI parser errors. """

class InvalidJSONError(AiParserError, ValueError):
    """Raised when the AI returns invalid JSON data"""
class MissingAIFieldError(AiParserError, KeyError):
    "Raised when a required AI response field is missing."

class InvalidAIResponseError(AiParserError, TypeError):
    """Raised when the AI response has an invalid structure or type"""
class InvalidConfidenceError(AiParserError, ValueError):
    "Raised when the confidence value is invalid"

class AIrequestError(AiParserError):
    """Raised when communication with the AI server fails"""

def validate_input_text(text:str) -> str:
    """
    Validate text before sending it to the AI server

    Args:
         text: Text supplied by the user/application
    Returns:
          The validated text
    Raise:
         TypeError: If text is not a string.
         ValueError: If text is empty or too long

    """
    if not isinstance(text, str):
        raise TypeError("text must be a string")
    if not text.strip():
        raise ValueError("text cannot be empty")
    if len(text) > Max_input_length:
        raise ValueError(f"text cannot be longer than {Max_input_length} characters")
    return text
def validate_server_url(url:str) -> str:
    """
    Validate the server url before making a request.
    Args:
        url: Url of the AI server
    Returns:
          The validated URL.
    Raises:
          TypeError: If url is not a string.
          ValueError: If the url is invalid
    """
    if not isinstance(url, str):
        raise TypeError("Url must be a sting")
    parsed_url = urlparse(url)
    if parsed_url.scheme not in ["http", "https"]:
        raise ValueError("url must be a http or https url")
    if not parsed_url.netloc:
        raise ValueError("Url must contain a valid host")
    return url
def normalize_response_text(response:str) -> str:
    """
    Normalize AI response text.
    Unicode is normalized using NFC and surrounding whitespace is removed.
    Args:
        response: AI response string.
    Returns:
          Normalized response string.
    Raises:
          TypeError: If response is not a string.

      """
    if not isinstance(response, str):
        raise TypeError("response must be a string")
    normalized = unicodedata.normalize("NFC", response)
    return normalized.strip()
def _extract_ai_values(data: dict[str,Any]) -> tuple[str, float]:
    """
    Validate a parsed AI response and extract its values.
    Args:
        data:Parsed JSON object returned by the AI.
    Returns:
          A tuple containing the response string and confidence float.
    Raises:
        MissingAIFieldError: If response or confidence are missing.
        InvalidAIResponseError: If a field has the wrong type.
        InvalidConfidenceError: If confidence is invalid or out of range.
    """
    try:
        response = data[Response_key]
    except KeyError as error:
        raise MissingAIFieldError(Response_key) from error
    try:
        confidence = data[Confidence_key]
    except KeyError as error:
        raise MissingAIFieldError(Confidence_key) from error
    if not isinstance(confidence, bool) or not isinstance(confidence, (float, int)):
        raise InvalidAIResponseError("Confidence must be a number")
    confidence = float(confidence)
    if not math.isfinite(confidence):
        raise InvalidConfidenceError("Confidence must be a finite number")
    if not min_confidence <= confidence <= max_confidence:
        raise InvalidConfidenceError(f"confidence must be between"f"{min_confidence} and {max_confidence}")
    response = normalize_response_text(response)

    return response, confidence
def parse_ai_response(json_data: str) -> tuple[str, float]:
    """
    Parse an AI Json response.
    Args:
        json_data: JSON strong returned by the AI.
    Returns:
          InvalidJSONError: If the JSON invalid
          InvalidAIResponseError: If the JSON is not an object.
          MissingAIFieldError: If required fields are missing.
    """
    try:
        data = json.loads(json_data)
    except json.JSONDecodeError as error:
        raise InvalidJSONError(error) from error
    if not isinstance(data, dict):
        raise InvalidAIResponseError("AI response must be a JSON object")
    return _extract_ai_values(data)












