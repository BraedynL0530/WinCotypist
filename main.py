import json
from typing import Any
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
          A tuple contianing the response and confidence
          - repsonse: The ai's response as a string
          -confidence: The Ai's confidence as a float.
    Raises:
          TypeErro: If response is not a string
          ValueError: If the JSON is invalid
          KeyError: If response of confidence is missing
      """
    try:
        data: dict[str,Any] = json.loads(json_data)
    except json.JSONDecodeError as error:
        raise ValueError("Invalid JSON response") from error
    response = data["response"]
    confidenc = float(data["confidence"])








