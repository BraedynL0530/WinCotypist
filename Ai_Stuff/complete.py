import requests 

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "smollm2:360m"                        # 135m = faster, 1.7b = smarter/slower
MAX_TOKENS = 16                               # autocomplete = a few words, not paragraphs

# the system instruction is the biggest level on quality - it tells the model to 
# continue the text, not answer like a chatbot or an assistant
SYSTEM = (
    "you are an inline autocomplete engine, like a code editor's ghost text."
    "continue the user's text from exactly where it stops."
    "output ONLY the continuation. no quotes, no explanation, no repeating"
    "what they already typed. if nothing natural fits, output nothing."
)


def complete(text):
    """Return a short predictated continuation of `text` (or '' if none)."""
    text = (text or "").strip()
    if not text:
        return ""
    body = {
        "model": MODEL,
        "system": SYSTEM,
        "prompt": text,
        "stream": False,
        "options": {"num_predict": MAX_TOKENS, "temperature": 0.2, "stop":
 ["\n"]},
    }
    try:
        r = requests.post(OLLAMA_URL, json=body, timeout=8)
        r.raise_for_status()
        out = r.json().get("response", "")
    except Exception:
        return ""                     # a failed suggestion is just a no suggestion
    return _clean(out, text)


def _clean(completion, context):
    """Drop repeats, keep a single line"""
    c = (completion or "").strip("\n")
    tail = context[-40:].strip()
    if tail and c.startswith(tail):
        c = c[len(tail):]
    return c.split("\n", 1)[0]

if __name__ == "__main__":
    for s in ["The quick brown fox", "dear team, thanks for", "def add(a,v):"]:
        print(repr(s), "->", repr(complete(s)))
