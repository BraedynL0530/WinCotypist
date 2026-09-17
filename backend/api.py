import threading
import socket
import requests
import json
#Re organize where this is when Rishi does a PR wioth his work!


class TcpClient(threading.Thread):
    def __init__(self, host, port):
        threading.Thread.__init__(self)
        self.host = host
        self.port = port
        self.client = None

    def listen(self):
        reader = self.client.makefile("r", encoding="utf-8")
        try:
            for line in reader:
                if not line:
                    break
                sendToLLM(line) # place holder for llm plugin function also mgiht
        finally:
            self.client.close()

    def connect(self):
        self.client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.client.connect((self.host, self.port))

        threading.Thread(target=self.listen, daemon=True).start()

    def send(self, text:str):
        if not self.client:
            return
        if not text.endswith("\n"):
            text = text + "\n"
        self.client.send(text.encode("utf-8"))

    def close(self):
        if self.client:
            self.client.close()


def sendToLLM(line:str,url:str):
    if line:
        line = line.replace("\n", "")
        line = line.replace("\r", "")
    line = f'{{"content": "{line}"}}'
    line= json.loads(line)
    requests.post(url, data=line) # change as needed later
    return
