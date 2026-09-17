class RollingWindow:
    """Keeps the last `size` characters the user typed. In memory only."""

    def __init__(self, size=256):
        self.size = size
        self.buffer = ""

    def add(self, chars):
        self.buffer = (self.buffer + chars)[-self.size:]
        return self.buffer

    def backspace(self, n=1):
        self.buffer = self.buffer[:-n] if n <= len(self.buffer) else ""
        return self.buffer

    def clear(self):
        self.buffer = ""

    @property
    def text(self):
        return self.buffer


if __name__ == "__main__":
    w = RollingWindow(size=10)
    for ch in "hello world":
        w.add(ch)
    print("window:", repr(w.text))  # hello world