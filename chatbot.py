"""Entry point for the rule-based chatbot.

Responsible ONLY for driving the application: running the infinite
input loop, delegating to input_handler and response_engine, and
printing output. No business logic (sanitization or intent matching)
lives here.
"""

from config import CHATBOT_NAME, EXIT_COMMANDS, FAREWELL_MESSAGE, WELCOME_MESSAGE
from input_handler import sanitize_input
from response_engine import get_response


def run_chat_loop() -> None:
    """Run the chatbot's continuous input/output loop until exit."""
    print(WELCOME_MESSAGE)

    while True:
        try:
            raw_input_text = input("You: ")
        except (KeyboardInterrupt, EOFError):
            print(f"\n{FAREWELL_MESSAGE}")
            break

        sanitized_text = sanitize_input(raw_input_text)

        if not sanitized_text:
            print(f"{CHATBOT_NAME}: Please type something.")
            continue

        if sanitized_text in EXIT_COMMANDS:
            print(f"{CHATBOT_NAME}: {get_response(sanitized_text)}")
            break

        print(f"{CHATBOT_NAME}: {get_response(sanitized_text)}")


if __name__ == "__main__":
    run_chat_loop()
