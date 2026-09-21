"use client";
import React, { useState, useEffect } from "react";
import { Abel } from "next/font/google";
import { WinButton } from "./Navbar";

const abel = Abel({ subsets: ["latin"], weight: "400" });

const BRIGHT_TEXT = "The quick brown";
const DIM_TEXT = " fox jumped over";
const FULL_TEXT = BRIGHT_TEXT + DIM_TEXT;

export default function Section1() {
  const [typedLength, setTypedLength] = useState(0);
  const [dimLength, setDimLength] = useState(0);

  useEffect(() => {
    if (typedLength < BRIGHT_TEXT.length) {
      const timeout = setTimeout(() => {
        setTypedLength((prev) => prev + 1);
      }, 70);
      return () => clearTimeout(timeout);
    }
  }, [typedLength]);

  useEffect(() => {
    if (typedLength >= BRIGHT_TEXT.length && dimLength < DIM_TEXT.length) {
      const timeout = setTimeout(() => {
        setDimLength((prev) => prev + 1);
      }, 70);
      return () => clearTimeout(timeout);
    }
  }, [typedLength, dimLength]);

  const brightTyped = FULL_TEXT.slice(0, typedLength);
  const dimTyped = DIM_TEXT.slice(0, dimLength);

  return (
    <div className="flex items-center justify-between pl-[180px] pr-16 min-h-[calc(100vh-80px)]">
      <div className="flex flex-col gap-8">
        <h1
          className={`${abel.className} text-5xl underline decoration-[#38bdf8] underline-offset-[6px]`}
        >
          WinCotypist
        </h1>
        <p className={`${abel.className} text-xl text-gray-300`}>
          For all your writing needs
        </p>
        <div className="mt-2">
          <WinButton />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div
          className="bg-[#1a1a2e]/80 backdrop-blur-sm rounded-full px-8 py-4 flex items-center gap-1 min-w-[440px] border border-white/5"
          style={{ boxShadow: "0 5px 9px 1px #283445" }}
        >
          <span className="text-white font-medium text-lg">{brightTyped}</span>
          <span
            className="inline-block w-[2px] h-6 bg-white ml-0.5"
            style={{ animation: "blink 1s step-end infinite" }}
          />
          {dimTyped && (
            <span className="text-gray-500 text-lg">{dimTyped}</span>
          )}
        </div>
      </div>
    </div>
  );
}
