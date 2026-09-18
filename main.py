import json
from typing import Any
import requests
from urllib import response


def parse_ai_repsonse(json_data:str) -> tuple[str,float]:
    """
    Parse an AI JSON repsonse.
    The JSON is expected to contain:
    - response: a string containing the AI's Response
    - cpmfidence : a number representing the AI's confidence

    Args:
        json_data (str): the AI's JSON repsonse
    Returns:
          A tuple containing the response and confidence
          - respsonse: The ai's response as a string
          -confidence: The Ai's confidence as a float.
    Raises:
          TypeError: If response is not a string
          ValueError: If the JSON is invalid
          KeyError: If response of confidence is missing
      """
    try:
        data: dict[str,Any] = json.loads(json_data)
    except json.JSONDecodeError as error:
        raise ValueError("Invalid JSON response") from error
    response = data["response"]
    confidence = float(data["confidence"])

    if not isinstance(response, str):
        raise TypeError("response must be a string")
    return response,confidence

def send_text_to_server(text: str, url: str) -> requests.Response:
    """
    Send test to a server using an HTTP POST request
    Args:
         text: Text to send to the server.
         url: URL of the server.
     Returns:
         THe HTTP response from the server

    """
    return requests.post(url, json={"text": text},timeout=10,)








