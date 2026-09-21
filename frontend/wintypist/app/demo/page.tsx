"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Abel } from "next/font/google";
import {
  SlackLogo,
  DiscordLogo,
  EnvelopeSimple,
  MagnifyingGlass,
} from "@phosphor-icons/react";

const abel = Abel({ subsets: ["latin"], weight: "400" });

const suggestions = [
  { label: "Slack", icon: SlackLogo, color: "#4A154B" },
  { label: "Discord", icon: DiscordLogo, color: "#5865F2" },
  { label: "Email", icon: EnvelopeSimple, color: "#EA4335" },
  { label: "Search", icon: MagnifyingGlass, color: "#4285F4" },
];

const MOCK_COMPLETIONS: Record<string, string> = {
  slack: " — slack channel #general",
  discord: " — discord server WinTypist",
  email: " — email to team@wintypist.dev",
  search: " — search results for ",
};

function getMockCompletion(text: string, context: string | null): string {
  if (!context) return "";
  const base = MOCK_COMPLETIONS[context.toLowerCase()] || "";
  return base;
}

export default function Demo() {
  const [showPopup, setShowPopup] = useState(false);
  const [text, setText] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [activeContext, setActiveContext] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const showSuggestion = useCallback(() => {
    const input = inputRef.current;
    if (!input || !suggestion) {
      hideSuggestionOverlay();
      return;
    }

    const textBeforeCursor = input.value.substring(
      0,
      input.selectionStart || input.value.length,
    );
    const style = window.getComputedStyle(input);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

    const textWidth = ctx.measureText(textBeforeCursor).width;
    const inputRect = input.getBoundingClientRect();
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingTop = parseFloat(style.paddingTop) || 0;

    const x = inputRect.left + paddingLeft + textWidth - input.scrollLeft;
    const y = inputRect.top + paddingTop;

    const overlay = overlayRef.current;
    if (!overlay) return;

    overlay.style.fontFamily = style.fontFamily;
    overlay.style.fontSize = style.fontSize;
    overlay.style.fontWeight = style.fontWeight;
    overlay.style.letterSpacing = style.letterSpacing;
    overlay.style.lineHeight = style.lineHeight;
    overlay.style.left = `${x + 4}px`;
    overlay.style.top = `${y}px`;
    overlay.textContent = suggestion;
    overlay.style.display = "inline";
  }, [suggestion]);

  const hideSuggestionOverlay = useCallback(() => {
    const overlay = overlayRef.current;
    if (overlay) overlay.style.display = "none";
  }, []);

  useEffect(() => {
    showSuggestion();
  }, [showSuggestion]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      hideSuggestionOverlay();
    };
  }, [hideSuggestionOverlay]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    setSuggestion("");

    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

    if (value.trim().length > 0 && activeContext) {
      typingTimerRef.current = setTimeout(() => {
        const completion = getMockCompletion(value, activeContext);
        setSuggestion(completion);
      }, 500);
    } else {
      hideSuggestionOverlay();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      setText((prev) => prev + suggestion);
      setSuggestion("");
      hideSuggestionOverlay();
    }
  };

  const handleSuggestion = (label: string) => {
    setActiveContext(label);
    setText("");
    setSuggestion("");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-8 px-8">
        <h2 className={`${abel.className} text-3xl text-white`}>
          Try WinCotypist
        </h2>

        <div className="flex flex-wrap gap-3 justify-center">
          {suggestions.map((s) => {
            const Icon = s.icon;
            const isActive = activeContext === s.label;
            return (
              <button
                key={s.label}
                onClick={() => handleSuggestion(s.label)}
                className="flex items-center gap-2 rounded-lg px-5 py-3 text-white transition-all"
                style={{
                  backgroundColor: isActive ? s.color : `${s.color}40`,
                  border: isActive
                    ? `2px solid ${s.color}`
                    : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Icon size={20} color="white" />
                <span className={abel.className}>{s.label}</span>
              </button>
            );
          })}
        </div>

        <div className="w-full max-w-xl">
          <div
            className="flex items-center gap-3 rounded-xl bg-[#1a1a2e]/80 border border-white/10 px-5 py-4 text-white"
            style={{ boxShadow: "0 5px 9px 1px #283445" }}
          >
            <span className="text-gray-400 text-lg">{">"}</span>
            <input
              ref={inputRef}
              value={text}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Start typing to see suggestions..."
              className="w-full bg-transparent text-lg outline-none placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      <span
        ref={overlayRef}
        id="suggestion-text-overlay"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 999999,
          color: "rgba(150, 150, 150, 0.6)",
          whiteSpace: "pre",
          display: "none",
        }}
      />

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[100]">
          <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-8 max-w-md text-center">
            <h3 className={`${abel.className} text-2xl text-white mb-4`}>
              AI Server Required
            </h3>
            <p className={`${abel.className} text-gray-300 mb-6`}>
              This requires you to have the AI server running at localhost:8000/complete with ollama smolllm2.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-gradient-to-r from-[#FC1022] to-[#FD8920] text-white rounded-md px-6 py-2 font-medium"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
