"use client";
import React, { useState, useEffect } from "react";
import { Abel } from "next/font/google";
import { MicrosoftPowerPoint } from "./iconsSection2/powerpoint";
import { ClaudeAI } from "./iconsSection2/claude";
import { Chrome } from "./iconsSection2/chrome";
import { Codex } from "./iconsSection2/codex";
import { MicrosoftWord } from "./iconsSection2/word";

const abel = Abel({ subsets: ["latin"], weight: "400" });

const icons = [
  { Component: MicrosoftPowerPoint, name: "PowerPoint" },
  { Component: ClaudeAI, name: "Claude" },
  { Component: Chrome, name: "Chrome" },
  { Component: Codex, name: "Codex" },
  { Component: MicrosoftWord, name: "Word" },
];

export default function Section2() {
  const [phase, setPhase] = useState<"hold" | "move">("hold");
  const [positions, setPositions] = useState([0, 1, 2, -2, -1]);

  useEffect(() => {
    if (phase === "hold") {
      const timeout = setTimeout(() => setPhase("move"), 500);
      return () => clearTimeout(timeout);
    } else {
      setPositions((prev) => prev.map((p) => p - 1));
      const timeout = setTimeout(() => {
        setPositions((prev) => prev.map((p) => (p < -2 ? 2 : p)));
        setPhase("hold");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  return (
    <div className="flex items-center justify-between pl-[300px] pr-16 min-h-[calc(100vh-80px)]">
      <div className="relative w-[660px] h-[150px] flex items-center justify-center">
        {icons.map((icon, i) => {
          const pos = positions[i];
          const absPos = Math.abs(pos);
          const isCenter = pos === 0;
          const isAdjacent = absPos === 1;
          const isFar = absPos === 2;

          const iconSize = isCenter ? 72 : isAdjacent ? 56 : 42;
          const backdropSize = isCenter ? 90 : isAdjacent ? 72 : 56;
          const opacity = isCenter ? 1 : isAdjacent ? 0.8 : 0.5;
          const xOffset = pos * 110;

          return (
            <div
              key={icon.name}
              className="absolute top-1/2 flex items-center justify-center"
              style={{
                left: `calc(50% + ${xOffset}px)`,
                transform: `translate(-50%, -50%)`,
                transition: phase === "move" ? "all 0.5s ease-in-out" : "none",
              }}
            >
              <div
                className="rounded-xl bg-[#1a1a2e]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center"
                style={{
                  width: backdropSize,
                  height: backdropSize,
                  transition: phase === "move" ? "all 0.5s ease-in-out" : "none",
                  opacity,
                  boxShadow: "0 5px 9px 1px #283445",
                }}
              >
                <icon.Component width={iconSize} height={iconSize} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className={`${abel.className} text-4xl text-white`}>Works Anywhere</h2>
        <p className={`${abel.className} text-xl text-gray-400`}>
          Type as fast as you can think
        </p>
      </div>
    </div>
  );
}
