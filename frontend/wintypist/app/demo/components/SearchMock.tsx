"use client";

import { useState } from "react";
import {
  MagnifyingGlass,
  Microphone,
  Camera,
  SquaresFour,
  CaretDown,
  Globe,
  GearSix,
} from "@phosphor-icons/react";

const results = [
  {
    url: "booglepedia.org › weekend",
    title: "Weekend trip ideas within 2 hours of the city",
    snippet:
      "Lakes, trails and small towns worth the drive — plus where to park for free and which spots fill up by noon...",
  },
  {
    url: "lowfi-radio.example › mixes",
    title: "Sunday chill mix — two hours, no skips",
    snippet:
      "A slow-burn set for reading, drawing or doing absolutely nothing. Tracklist inside...",
  },
  {
    url: "pixelpress.gg › guides",
    title: "Beginner controller settings that actually help",
    snippet:
      "Dead zones, sensitivity curves and why the defaults are lying to you. Five-minute setup...",
  },
  {
    url: "riverside-library.org › renew",
    title: "Renew books online in under a minute",
    snippet:
      "Log in with your card number, hit renew all, done. No late fees if you do it before midnight...",
  },
  {
    url: "mapleandco.shop › track",
    title: "Track your Maple & Co. order",
    snippet:
      "Enter your order number to see live updates. Most parcels arrive within 3–5 days...",
  },
  {
    url: "tourneybot.gg › friday-bracket",
    title: "Friday bracket: check-in closes at 6 PM",
    snippet:
      "Sixteen teams, single elimination. Bring your own controller — spares are limited...",
  },
  {
    url: "campuseats.example › deals",
    title: "Weekend deals near campus",
    snippet:
      "Twenty percent off with a student email. Valid Friday through Sunday, dine-in only...",
  },
];

const COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#4285F4", "#34A853", "#EA4335"];

function Wordmark({ size = "text-[92px]" }: { size?: string }) {
  return (
    <div className={`${size} font-medium leading-none tracking-tight`} aria-label="Boogle">
      {"Boogle".split("").map((ch, i) => (
        <span key={i} style={{ color: COLORS[i] }}>
          {ch}
        </span>
      ))}
    </div>
  );
}

export default function SearchMock() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  if (submitted !== null) {
    return (
      <div className="flex h-screen w-full flex-col overflow-hidden bg-white text-[14px] text-gray-800">
        <div className="flex shrink-0 items-center gap-6 px-6 pt-5">
          <Wordmark size="text-[30px]" />
          <form
            className="flex w-[45%] items-center gap-3 rounded-full border border-gray-200 px-4 py-2.5 shadow hover:shadow-md"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(query);
            }}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSubmitted(null);
                }}
                className="text-xl leading-none text-gray-500"
                aria-label="Clear"
              >
                ×
              </button>
            )}
            <MagnifyingGlass size={20} className="shrink-0 text-blue-600" />
          </form>
          <div className="ml-auto flex items-center gap-4 text-gray-600">
            <GearSix size={22} />
            <SquaresFour size={22} />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-700 font-semibold text-white">
              K
            </span>
          </div>
        </div>
        <div className="flex shrink-0 gap-6 border-b border-gray-200 px-44 pt-3 text-[13px] text-gray-600">
          {["All", "Images", "Videos", "News", "Maps"].map((t, i) => (
            <span
              key={t}
              className={i === 0 ? "border-b-[3px] border-blue-600 pb-2 text-blue-600" : "pb-2"}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-44 py-4">
          <div className="mb-5 text-[13px] text-gray-500">
            About {results.length} results for “{submitted || "weekend plans"}”
          </div>
          {results.map((r) => (
            <div key={r.title} className="mb-7 max-w-2xl">
              <div className="flex items-center gap-2 text-[13px]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                  <Globe size={16} className="text-gray-500" />
                </span>
                <span className="text-gray-800">{r.url}</span>
              </div>
              <div className="mt-1 text-[20px] text-[#1a0dab] hover:underline">
                {r.title}
              </div>
              <div className="text-[14px] leading-6 text-gray-600">{r.snippet}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-white text-[14px] text-gray-800">
      <div className="flex shrink-0 items-center justify-end gap-5 px-6 py-4 text-[13px] text-gray-700">
        <span>Boogle Mail</span>
        <span>Images</span>
        <SquaresFour size={22} className="text-gray-600" />
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-700 font-semibold text-white">
          K
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center pt-24">
        <Wordmark />
        <form
          className="mt-8 flex w-[min(90%,560px)] items-center gap-3 rounded-full border border-gray-200 px-5 py-3 shadow-sm hover:shadow-md"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(query);
          }}
        >
          <MagnifyingGlass size={20} className="shrink-0 text-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search Boogle"
            className="w-full text-[16px] outline-none"
          />
          <Microphone size={22} className="shrink-0 text-gray-500" />
          <Camera size={22} className="shrink-0 text-gray-500" />
        </form>
        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={() => setSubmitted(query)}
            className="rounded border border-gray-100 bg-[#f8f9fa] px-4 py-2 text-gray-700 hover:shadow"
          >
            Boogle Search
          </button>
          <button
            type="button"
            onClick={() => setSubmitted("something fun")}
            className="rounded border border-gray-100 bg-[#f8f9fa] px-4 py-2 text-gray-700 hover:shadow"
          >
            I&apos;m Feeling Lucky
          </button>
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-between bg-[#f2f2f2] px-6 py-3 text-[13px] text-gray-600">
        <span className="flex gap-6">
          <span>About</span>
          <span>Privacy</span>
          <span>Terms</span>
        </span>
        <span className="flex items-center gap-1">
          Settings <CaretDown size={12} />
        </span>
      </div>
    </div>
  );
}
