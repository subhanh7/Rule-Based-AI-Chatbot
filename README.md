# Rule-Based AI Chatbot

## Project Overview

A conversational chatbot that responds to predefined user inputs using
pure rule-based logic. No machine learning, NLP libraries, or
generative AI are used — only Python control flow, functions, and
dictionary lookups. Built as Project 1 of the DecodeLabs Artificial
Intelligence training kit, this project demonstrates decision-making,
input processing, and clean software design.

## Features

- Continuous conversation loop that keeps accepting input until the user exits
- Input sanitization: lowercasing and whitespace normalization so phrasing like `"  Hello  "` and `"hello"` are treated the same
- Dictionary-based intent matching against a fixed set of known phrases
- Fallback response for any input that doesn't match a known intent
- Multiple exit commands (`bye`, `exit`, `quit`)
- Graceful handling of `Ctrl+C`, `Ctrl+D`, and empty input — the chatbot never crashes from normal user interaction
- **React Frontend**: A modern web interface with a sleek UI to interact with the bot

## Project Structure

```text
rule_based_chatbot/
│
├── api.py               # REST API server to bridge frontend and backend
├── chatbot.py           # CLI Entry point: runs the terminal input/output loop
├── knowledge_base.py    # Data only: intents mapped to responses
├── input_handler.py     # Sanitizes and normalizes raw input
├── response_engine.py   # Matches sanitized input to a response
├── config.py            # Constants: name, messages, exit commands
├── frontend/            # React + TypeScript + Vite web application
└── README.md
```

Each module has a single responsibility:

| Module | Responsibility |
|---|---|
| `config.py` | Stores constants only (no logic) |
| `knowledge_base.py` | Stores intents and responses only (no logic) |
| `input_handler.py` | Sanitizes/normalizes text only (no chatbot logic) |
| `response_engine.py` | Matches intents and returns responses only (no I/O) |
| `chatbot.py` | Runs the terminal loop and prints output (no business logic) |
| `api.py` | Runs the HTTP server for the React frontend (no business logic) |

This separation keeps the business logic (sanitizing, matching) free
of `input()`/`print()` calls, so `input_handler.py` and
`response_engine.py` can be unit tested independently of the console.

## Installation & Setup

Requires Python 3.9 or later, and Node.js for the frontend. No external Python dependencies.

```bash
git clone <this-repository-url>
cd rule_based_chatbot
```

### Running the Terminal Chatbot

If you prefer the command line:

```bash
python3 chatbot.py
```

### Running the Web Application

The web app consists of a React frontend and a Python backend.

1. **Start the Backend API Server:**
   ```bash
   python3 api.py
   ```
   *The API will start on http://localhost:8000.*

2. **Start the Frontend Development Server:**
   Open a new terminal window and run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The React app will be available at http://localhost:5173.*

## Recognized Intents

`hello`, `hi`, `hey`, `good morning`, `good evening`, `how are you`,
`help`, `thanks`, `your name`, `bye`, `exit`, `quit`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Future Improvements

- Support partial/keyword matching (e.g. recognizing `"hi there"` as a greeting) instead of exact-phrase matching
- Load intents and responses from an external JSON/YAML file instead of a Python dictionary
- Add unit tests for `input_handler.py` and `response_engine.py`
- Support multiple response variations per intent for more natural conversation
- Add simple conversation memory (e.g. remembering the user's name)
