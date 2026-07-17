"""Configuration constants for the rule-based chatbot.

Centralizing these values here means the chatbot's identity, exit
behavior, and default messaging can be changed without touching any
logic in the other modules.
"""

CHATBOT_NAME: str = "RuleBot"

WELCOME_MESSAGE: str = (
    f"Hello! I'm {CHATBOT_NAME}, a rule-based chatbot. "
    "Type 'help' to see what I can do, or 'exit' to quit."
)

FAREWELL_MESSAGE: str = "Goodbye! Have a great day."

DEFAULT_RESPONSE: str = "Sorry, I don't understand that yet."

# Any of these inputs (after sanitization) will end the conversation.
EXIT_COMMANDS: frozenset[str] = frozenset({"bye", "exit", "quit"})
