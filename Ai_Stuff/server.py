from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import re

from .complete import complete, MODEL   # the engine from complete.py

app = FastAPI(title="Cotypist AI") 
app.add_middleware(CORSMiddleware, allow_origins=["*"],
allow_methods=["*"], allow_headers=["*"])

# never send a password field to the model (real setection is the desktop side later)
_SECRET = re.compile(r"(pass(word|wd)|secret|api[_-]?key|token)\s*[:=]", re.I)


class CompleteIn(BaseModel):
    context:str
    is_secret: bool = False


class CompleteOut(BaseModel):
    completion: str = ""
    model: str = ""


@app.post("/complete", response_model=CompleteOut)
def do_complete(req: CompleteIn):
    ctx = req.context or ""
    if not ctx.strip() or req.is_secret or _SECRET.search(ctx[-80:] or
    ""):
        return CompleteOut(completion="",model=MODEL)
    return CompleteOut(completion=complete(ctx),
                       model=MODEL)

@app.get("/health")
def health():
    return {"ok": True, "model":MODEL}


