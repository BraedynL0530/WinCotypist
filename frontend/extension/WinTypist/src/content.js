async function fetchCompletion(context) {
  const response = await fetch("http://127.0.0.1:8000/complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      context: context,
      is_secret: false,
    }),
  });

  const data = await response.json();
  return data.completion;
}

let delayMs = 500;
let state = true;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "DELAY_UPDATE") {
    delayMs = msg.delay;
  }
  if (msg.type === "STATE_UPDATE") {
    state = msg.enabled;
  }
});

console.log("Extension working");

let typingTimer;
let currentTarget = null;
let currentSuggestion = null;

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && currentTarget && currentSuggestion) {
    e.preventDefault();
    currentTarget.value = currentTarget.value + currentSuggestion;
    hideSuggestionOverlay();
    currentSuggestion = null;
  }
});

function getSuggestionOverlay() {
  let overlay = document.getElementById("suggestion-text-overlay");
  if (!overlay) {
    overlay = document.createElement("span");
    overlay.id = "suggestion-text-overlay";
    overlay.style.position = "fixed";
    overlay.style.pointerEvents = "none";
    overlay.style.zIndex = "999999";
    overlay.style.color = "rgba(150, 150, 150, 0.6)";
    overlay.style.whiteSpace = "pre";
    document.body.appendChild(overlay);
  }
  return overlay;
}

function getInputCursorXY(input) {
  const textBeforeCursor = input.value.substring(
    0,
    input.selectionStart || input.value.length,
  );
  const style = window.getComputedStyle(input);
  const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = font;

  const textWidth = ctx.measureText(textBeforeCursor).width;
  const inputRect = input.getBoundingClientRect();
  const paddingLeft = parseFloat(style.paddingLeft) || 0;
  const paddingTop = parseFloat(style.paddingTop) || 0;

  const x = inputRect.left + paddingLeft + textWidth - input.scrollLeft;
  const y = inputRect.top + paddingTop;

  return { x, y };
}

function showSuggestionAtCursor(input, suggestionText) {
  if (!suggestionText) {
    hideSuggestionOverlay();
    return;
  }

  const { x, y } = getInputCursorXY(input);
  const style = window.getComputedStyle(input);
  const overlay = getSuggestionOverlay();

  overlay.style.fontFamily = style.fontFamily;
  overlay.style.fontSize = style.fontSize;
  overlay.style.fontWeight = style.fontWeight;
  overlay.style.letterSpacing = style.letterSpacing;
  overlay.style.lineHeight = style.lineHeight;

  overlay.style.left = `${x + 4}px`;
  overlay.style.top = `${y}px`;
  overlay.textContent = suggestionText;
  overlay.style.display = "inline";
}

function hideSuggestionOverlay() {
  const overlay = document.getElementById("suggestion-text-overlay");
  if (overlay) overlay.style.display = "none";
}

document.addEventListener(
  "input",
  (event) => {
    if (!state) return;
    if (event.target.type === "password") return;

    clearTimeout(typingTimer);
    hideSuggestionOverlay();

    const target = event.target;
    if (
      !(
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement
      )
    )
      return;

    currentTarget = target;
    typingTimer = setTimeout(async () => {
      const text = target.value;

      if (text && text.trim().length > 0) {
        try {
          const autocomplete = await fetchCompletion(text);
          currentSuggestion = autocomplete;
          showSuggestionAtCursor(target, autocomplete);
        } catch (error) {
          console.error("API error:", error);
          hideSuggestionOverlay();
          currentSuggestion = null;
        }
      } else {
        hideSuggestionOverlay();
        currentSuggestion = null;
      }
    }, delayMs);
  },
  true,
);

// Clear suggestion when target loses focus
document.addEventListener("blur", hideSuggestionOverlay, true);
