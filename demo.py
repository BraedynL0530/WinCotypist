from main import parse_http_response, send_text_to_server
Server_url = "http://127.0.0.1:8000/predict"
def main() -> None:
    """Send user text to the local mock AI server"""
    try:
        text = input("Enter text: ")
        http_response = send_text_to_server(text, Server_url)
        print()
        print(f"Response: {response}")
        print(f"Confidence: {confidence}")
        print(f"Aplhanumeric: {response.isalnum()}")
    except Exception as error:
        print(f"Error: {error}")
    if __name__ == "__main__":
        main()
