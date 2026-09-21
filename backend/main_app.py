import json
import threading
import uvicorn

from Ai_Stuff.server import  app
from Typing import yeild_wrapper
from api import TcpClient


def run_fastapi():
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="error")


def run_caret_tracker():
    for x, y in yeild_wrapper():
        print(json.dumps({"type": "caret", "x": x, "y": y}), flush=True)


if __name__ == "__main__":
    threading.Thread(target=run_fastapi, daemon=True).start()

    tcp_client = TcpClient(
        host="127.0.0.1",
        port=8080,
        ai_host="http://127.0.0.1:8000/complete",
    )
    tcp_client.connect()

    threading.Thread(target=run_caret_tracker, daemon=True).start()

    try:
        threading.Event().wait()
    except KeyboardInterrupt:
        tcp_client.close()