"use client";
import React from "react";
import { Abel } from "next/font/google";
import { WinButton } from "./Navbar";

const abel = Abel({ subsets: ["latin"], weight: "400" });

function Key({
  label,
  width,
  icon,
  gradient,
}: {
  label?: string;
  width: number;
  icon?: React.ReactNode;
  gradient?: boolean;
}) {
  const inner = (
    <div
      className="flex items-center justify-center rounded-lg bg-[#1a1a2e]/80 text-white/80 select-none"
      style={{
        width,
        height: 72,
        fontSize: 16,
        border: gradient
          ? "2px solid transparent"
          : "1px solid rgba(255,255,255,0.1)",
        background: gradient
          ? "linear-gradient(#1a1a2e, #1a1a2e) padding-box, linear-gradient(to right, #FC1022, #FD8920) border-box"
          : undefined,
      }}
    >
      {icon || label}
    </div>
  );
  if (gradient) {
    return (
      <div
        className="rounded-lg"
        style={{
          background: "linear-gradient(to right, #FC1022, #FD8920)",
          padding: "2px",
        }}
      >
        {inner}
      </div>
    );
  }
  return inner;
}

export default function Section3() {
  return (
    <div className="flex items-center justify-between p-10 min-h-[calc(100vh-80px)]">
      <div className="flex flex-col gap-6 ">
        <h2 className={`${abel.className} text-5xl text-white leading-tight`}>
          Can't think of your
          <br />
          next word?
        </h2>
        <p className={`${abel.className} text-xl text-gray-400`}>
          All you need to do is press tab
        </p>
        <div className="mt-2">
          <WinButton />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <Key label="esc" width={72} />
          <Key label="1" width={72} />
          <Key label="2" width={72} />
          <Key label="3" width={72} />
        </div>
        <div className="flex gap-3">
          <Key label="tab" width={130} gradient />
          <Key label="Q" width={72} />
          <Key label="W" width={72} />
          <Key label="E" width={72} />
        </div>
        <div className="flex gap-3">
          <Key label="Caps" width={144} />
          <Key
            width={180}
            gradient
            icon={
              <div className="flex items-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Type faster</span>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
