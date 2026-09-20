export async function fetchCompletion(context) {
  const response = await fetch("http://127.0.0.1:8000/complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      context: contextText,
      is_secret: false,
    }),
  });

  const data = await response.json();
  return data.completion;
}
