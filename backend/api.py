import threading
import socket
import requests
import json


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

