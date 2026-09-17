import requests 
url = "http://localhost:11434/api/generate"
body = {
    "model": "smollm2:360m",
    "prompt": "The quick brown fox",
    "stream": False
}
response = requests.post(url, json=body)
data = response.json()
print(data["response"])