# AI Response Parser
This project is a backend component for the project WinCo-typist.
It is used to communicate with an AI server and processing the responses it sends back

The main purpose is to take an AI JSON response such as:
'''JSON
{ "response":"hello123", "confidence:89.3"
'''
and extract the useful information from this and convert it into python variables:
'''python
response = "hello123"
confidence = 89.3
'''
This component also includes input validation, HTTP communication, error handling, automated testing, a local mock AI server and a demo program

# Component structure (in the order of which it was coded)
1.main.py
2.test_main.py
3.mock_server.py
4.test_integration.py
5.demo.py
6.README.md
(Note: It contains venv too in the structure)

# Each component in depth:
1.main.py:

Contains the main backend functionality

It includes functions for:
- Validating input text
- Validating the AI server URL
- Parsing AI JSON responses
- Parsing HTTP responses
- Sending text to the AI server
- Handling request failures
- Retrying certain temporary server failures

The main parser returns the AI response and confidence:
'''python
response, confidence = parse_ai_response(json_data)
'''
---
2.Test_main.py:

Contains unit tests for the parser and validation functions.

The tests cover:
- Normal AI responses
- Unicode Text
- Non-English text
- Alphanumeric responses
- Confidence type checking
- Invalid JSON
- Missing response or confidence fields
- Invalid response types
- Invalid confidence types
- Empty responses
- Whitespace normalization
- Input Validation
- Input Length limits
- Server URL validation

We can run the tests by installing pytest in venv and using this command in the PowerShell terminal:
python -m pytest -v
---

3.Mock_server.py:

 It contains a small local HTTP server that acts as a fake AI backend.

It provides the following endpoints:
'''text
POST /predict
POST /invalid-json
POST /server-error
'''
The '/predict' endpoint accepts JSON such as:
'''JSON
{"text":"hello"}
'''
and returns an example AI response:
'''json
{"response":"hello",
"confidence": 91.5
}
'''
This allows the backend code to be tested locally without connecting to the real AI service

---
4.Test_integration.py:

It contains integration tests that test the complete request and response flow.

The overall process is:
'''text
Python application->HTTP request->Mock AI server->JSON response->AI response parser->response + confidence
'''
The integration tests create their own temporary local server, so 'mock_server.py' does not need to be running separately while the integration tests are running

Run the tests with:
the command mentioned before, python -m pytest -v.
---
5.demo.py
It provides a simple way to manually test the complete system.

Start the mock server in one terminal using the command: python mock_server.py.

Then open another terminal and run the command: python demo.py

The program will ask:
'''text
Enter text:
'''
for example:
'''text
hello123
'''
The expected output is similar to:
'''text
Response: hello123
Confidence: 91.5
Alphanumeric: True
'''
---
# Things required for these components to work:

(a) 'Requirements.txt':

Contains the external Python packages needed by the project:

'''text
pytest
requests
'''
We can install them by typing python -m pip install -r requirements.text in the PowerShell terminal
---

(b) Setup:

Make sure you are inside the project directory: C://Rishaan BAckend
'''
Activate the virtual environment by typing this command in the PowerShell terminal:
venv\Scripts\activate

Install the required packages:
'''PowerShell
python -m install -r requirements.txt
'''
----
(c) Running these tests:

Run all unit and integration tests by typing this command in the PowerShell terminal:
python -m pytest -v

All tests should pass before changes are pushed to the repository.

---
(d) Running the Mock server:

To manually start the local mock AI server we can use this command in the PowerShell terminal:
pyton mock_server.py.

By doing this, if the code is error-free then we should see:

'''text
Mock AI server running at https://127.0.0.1:8000
Press Ctrl+C to stop
'''
keep this terminal open while using 'demo.py'
---
## Running the Demo

Open a second terminal in the project directory.

Activate the virtual environment:

```powershell
venv\Scripts\activate
```

Then run:

```powershell
python demo.py
```

Wait until the program displays:

```text
Enter text:
```

Then enter the text you want to send.

---

## Current AI Response Format

The current parser expects an AI response similar to:

```json
{
    "response": "example text",
    "confidence": 89.3
}
```

The fields are:

- `response` - the AI-generated response as a string
- `confidence` - the AI confidence value as a number between `0` and `100`

The exact field names are currently based on the example provided by the team and may change once the final AI response format is decided.

---

## Error Handling

The project handles several possible errors, including:

- Invalid JSON
- Missing `response` or `confidence` fields
- Incorrect response types
- Invalid confidence values
- Empty input
- Input that is too long
- Invalid server URLs
- Connection failures
- Request timeouts
- Temporary server-side failures

The HTTP client retries certain temporary failures before returning an error.

---

## Testing the Complete System

The complete system can be tested in two ways.

### Automated testing

Run:

```powershell
python -m pytest -v
```

This runs the unit tests and integration tests automatically.

### Manual testing

Start the mock server:

```powershell
python mock_server.py
```

Then, from another terminal:

```powershell
python demo.py
```

Enter text when prompted.

This tests the complete flow manually:

```text
User input
    ↓
HTTP request
    ↓
Mock AI server
    ↓
JSON response
    ↓
Parser
    ↓
Response + confidence
```

---

## Development Notes

The mock server is intended only for local development and testing.

It is not the real AI backend and is not intended for production use.

The HTTP communication and JSON parsing are kept as separate parts of the project so that the mock server can later be replaced with the real AI backend without having to rewrite the entire parser.

---

## Current Limitations

The project currently uses a mock AI server instead of the actual AI backend.

The exact AI response structure may also change when the team finalizes the backend/API specification.

When the final API is available, the server URL and response field names can be updated accordingly.

---

## Future Improvements

Possible future work includes:

- Connecting to the real AI backend
- Adapting the parser to the final AI response schema
- Adding structured logging
- Expanding error handling
- Adding more integration tests
- Adding performance tests
- Connecting the parser to the main autocorrect application
