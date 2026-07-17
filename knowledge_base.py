"""Knowledge base for the rule-based chatbot.

This module stores ONLY data: a mapping of recognized user phrases
(intents) to their chatbot responses. It contains no matching logic,
no input handling, and no control flow — that behavior lives in
response_engine.py and input_handler.py respectively.
"""

INTENT_RESPONSES: dict[str, str] = {
    "hello": "Hello there! How can I help you today?",
    "hi": "Hi! What can I do for you?",
    "hey": "Hey! Nice to hear from you.",
    "good morning": "Good morning! Hope your day goes well.",
    "good evening": "Good evening! How can I assist you?",
    "how are you": "I'm just a program, but I'm running smoothly. Thanks for asking!",
    "help": (
        "I can respond to greetings (hello, hi, hey), small talk "
        "(how are you), and questions about myself (your name). "
        "Say 'bye', 'exit', or 'quit' to end our chat."
    ),
    "thanks": "You're welcome!",
    "your name": "I don't have a personal name, but you can call me RuleBot.",
    "bye": "Goodbye! Take care.",
    "exit": "Exiting the chat. See you next time.",
    "quit": "Quitting now. Goodbye!",
}
