"""Response generation for the rule-based chatbot.

This module is responsible ONLY for matching a sanitized intent
against the knowledge base and returning the appropriate response.
It does not read input or print output, which keeps it easy to
unit test in isolation.
"""

from config import DEFAULT_RESPONSE
from knowledge_base import INTENT_RESPONSES


def get_response(sanitized_input: str) -> str:
    """Look up the response for a sanitized user intent.

    Args:
        sanitized_input: User input that has already been lowercased
            and whitespace-normalized by input_handler.sanitize_input.

    Returns:
        The matching response from the knowledge base, or the
        default fallback response if no intent matches.
    """
    return INTENT_RESPONSES.get(sanitized_input, DEFAULT_RESPONSE)
