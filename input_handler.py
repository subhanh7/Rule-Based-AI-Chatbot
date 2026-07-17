"""Input handling for the rule-based chatbot.

This module is responsible ONLY for sanitizing and normalizing raw
user input. It contains no intent matching or response logic.
"""


def sanitize_input(raw_input: str) -> str:
    """Normalize raw user input for reliable intent matching.

    Lowercases the text and collapses surrounding and internal
    whitespace so that variations like "  Hello  " or "How ARE you"
    match the same intent as their canonical form.

    Args:
        raw_input: The unprocessed text entered by the user.

    Returns:
        A lowercase string with leading, trailing, and repeated
        internal whitespace removed.
    """
    return " ".join(raw_input.lower().split())
