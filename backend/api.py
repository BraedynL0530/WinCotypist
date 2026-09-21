import threading
import socket
import requests
import json
from main import parse_http_response, send_text_to_server


class TcpClient(threading.Thread):
    def __init__(self, host, port, ai_host):
        threading.Thread.__init__(self)
        self.host = host
        self.ai_host = ai_host
        self.port = port
        self.client = None

    def listen(self):
        reader = self.client.makefile("r", encoding="utf-8")
        try:
            for line in reader:
                if not line:
                    break
                response = send_text_to_server(line, self.ai_host) # check if this is even right
                if response:
                    print(
                        json.dumps({
                            "type": "completion",
                            "text": response,
                        }),
                        flush=True,
                    )
                    self.send(parse_http_response(response))
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


