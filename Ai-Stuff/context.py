# classify what the user is typing so we can prompt approximately + apply the right
#rules. returns one of: "password", "code", "email", "prose".
import re

_SECRET = re.compile(r"(pass(word|wd)|secret|api[_-]?key|token)\s*[:=]", re.I)
_CODE = re.compile(r"[{}()\[\];]|:\s*$|=\s|\b(def|class|import|function|const|let|var|elif|async|await)\b")
_EMAIL_START = re.compile(r"^\s*(hi|hey|hello|dear)\b|thanks|regards|best,", re.I)


def classify(text):
    t = (text or "")
    if _SECRET.search(t[-80]):
        return "password"
    last_line = t.rsplit("\n", 1)[-1]     #judge "code" on the current line
    if _CODE.search(last_line):
        return "code"
    if _EMAIL_START.search(t):
        return "email"
    return "prose"

# a tuned system prompt per context kind - better than one generic prompt
_PROMPTS = {
    "code": (
        "you are an inline code autocomplete engine. continue the code from where it stops. output ONLY, no prose, no markdown fences, no explanation"),
    "email": (
        "you are an inline autocomplete engine for writing an email. continue the sentence naturally and professionally. output ONLY the continuation"),
    "prose": (
        "you are an inline autocomplete engine, like a document's ghost text. continue the user's text from exactly where it stops. output ONLY the continuation"),
}


def system_prompt_for(kind):
    return _PROMPTS.get(kind, _PROMPTS["prose"])


