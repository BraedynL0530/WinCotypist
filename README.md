# WinCotypist

WinCotypist is a lightweight, privacy-focused AI typing assistant for Windows. It captures recent keyboard context, sends that context to a local AI model, and lets the user accept generated completions with the Tab key.

The project is designed around keeping typed data on the user's machine while keeping the low-level input handling separate from the AI and desktop UI.

## Overview

WinCotypist combines three main components:

* **Go** handles low-level Windows input capture, the rolling context buffer, keyboard events, text insertion, and the TCP bridge.
* **Python** handles communication with the AI backend and parsing AI responses.
* **Electron** provides the desktop application interface and manages the Go and Python backend processes.

The AI runs locally through **Ollama** using **SmolLM2 360M**, allowing typing context to stay on the user's computer.

## How It Works

```text
Keyboard Input
      ↓
   Go Hook
      ↓
 Rolling Buffer
      ↓
 TCP → Python
      ↓
 FastAPI AI Backend
      ↓
 Ollama / SmolLM2
      ↓
 Python Response Parser
      ↓
 TCP → Go
      ↓
 Pending Completion
      ↓
 Tab
      ↓
 Text Insertion
```

The rolling buffer stores a limited amount of recent typing context. When a completion request is triggered, Go sends the current context to Python over a local TCP connection.



## Architecture

### Go

Go is responsible for the lowest-level parts of the application:

* Windows keyboard hooks
* Keyboard event processing
* Rolling context buffer
* TCP communication
* Pending completion handling
* Text insertion

Go was chosen for the low-level input side to keep that portion of the application lightweight and straightforward.

### Python

Python acts as the bridge between the desktop input layer and the AI backend.

It handles:

* TCP input from Go
* HTTP requests to the FastAPI backend
* AI response parsing
* Input and response validation
* Error handling

### Electron

Electron provides the desktop application and UI.

It is also responsible for starting and stopping the backend executables when the application launches or exits.

The packaged application includes the required backend executables as application resources, so the installed application does not depend on the original development project paths.

## Privacy

WinCotypist is designed around local processing.

The intended data flow is:

```text
Keyboard
   ↓
Go
   ↓
Local Python process
   ↓
Local FastAPI server
   ↓
Local Ollama model
   ↓
Go
   ↓
Keyboard
```

Typing context is not intentionally sent to a remote AI provider during normal local operation.

## Current Status

WinCotypist is currently an actively developed prototype.

The core architecture is in place, including:

* Windows keyboard capture
* Rolling context storage
* Go ↔ Python TCP communication
* Python ↔ FastAPI communication
* Local Ollama inference
* AI response parsing
* Pending completion behavior
* Electron desktop packaging
* Bundled backend executables

Some parts of the input handling and UI are still being improved.


Teamates update this later i just needed a readme thats not backend specific!
