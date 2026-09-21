"use client";

import React, { useState, useEffect } from "react";
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

export default function Demo() {
  const [showPopup, setShowPopup] = useState(false);
  const [text, setText] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleSuggestion = (label: string) => {
    setActiveSuggestion(label);
    setText(`Type in ${label}...`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] gap-8 px-8">
      <h2 className={`${abel.className} text-3xl text-white`}>
        Try WinCotypist
      </h2>

      <div className="flex flex-wrap gap-3 justify-center">
        {suggestions.map((s) => {
          const Icon = s.icon;
          const isActive = activeSuggestion === s.label;
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
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing to see suggestions..."
            className="w-full bg-transparent text-lg outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

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
    </div>
  );
}
