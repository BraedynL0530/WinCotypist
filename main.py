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

class InvalidAIResponseError(AiParserError, TypeError):
    """Raised when the AI response has an invalid structure or type"""

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
        raise ValueError("f text cannot be longer than {Max_input_length} characters")
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
def normalize_response_text(response:str) -> str










