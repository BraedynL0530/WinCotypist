Ai Response Parser
This is the first version of the backend component coded by me for handling response from AI

The main job of the code is to take JSON response from the AI convert the response into two separate python variables.
The variables are:
1.Response - THe AI's response as a string
2.Confidence - The AI's confidence as a float

For example, if the AI sends:
{ "response":"hello","confidence":89.3}
the parser gives us:
response = "hello123"
confidence = 89.3

What is included:
(a)Main.py:
It contains the main parser which is called parse_ai_response()
It takes the JSON response, parses it and returns the response and confidence.

It also contains:
send_text_to_server()
This is used to send text to a server using an HTTP POST request. THe actual AI server URL can be added later once everything is ready at the backend

(B)Test_main.py:
It contains pytest tests for the parser.
The tests presently checks:
Normal AI responses
Unicode characters
Non-english text
alphanumeric responses
Confidence being converted to a float
Invalid response types
invalid JSON
Missing response fields

There is also alphanumeric test which uses Python's .isalnum().

How to set up:
(i) Make sure your virtual environment (venv) is activated. (venv\scripts\activate)
(ii) Make sure to install pytest and requests in the virtual environment.

Running the tests:
in the terminal run the code python -m pytest or pytest to make sure all the tests pass.

Example:

You can use the parser like this:

from main import parse_ai_response
json_data='{"response":"hello123","confidence":89.3}'
response, confidence = parse_ai_response(json_data)
print(response)
print(confidence)

This will give:
hello123 (response)
89.3 (confidence).

Current Limitations:
The exact names and structure of the AI response may change once the team finalizes the AI/backend format
The actual AI server endpoint has not been connected to anything yet. This is an open-ended project making it
easy to integrate into other backend components easily.

Project Structure
Rishaan-BAckend/
-AI-stuff
-Backend
-Frontend
-Venv
-Main.py (written by me)
-Readme.md (written by me)
- test_main.py (written by me)
