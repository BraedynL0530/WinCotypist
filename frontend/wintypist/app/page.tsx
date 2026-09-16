"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const LiquidGlass = dynamic(() => import("liquid-glass-react"), {
  ssr: false,
  loading: () => (
    <div className="h-auto w-min p-5 rounded-3xl absolute top-5 left-5" />
  ),
});
import {
  DiscordLogo,
  EnvelopeSimple,
  GoogleDriveLogo,
  MagnifyingGlass,
  SlackLogo,
} from "@phosphor-icons/react";
import { Instrument_Sans } from "next/font/google";
import SlackMock from "./components/SlackMock";
import DiscordMock from "./components/DiscordMock";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export default function Home() {
  const [currentPage, setCurrentPage] = useState<
    "discord" | "slack" | "search" | "email" | "docs"
  >("slack");
  return (
    <>
      <LiquidGlass
        cornerRadius={24}
        padding="20px 24px"
        style={{
          position: "absolute",
          top: "220px",
          left: "120px",
          zIndex: 50,
        }}
      >
        <div className="h-auto ">
          <h4 className="color-white text-4xl mb-5 font-sans font-light">
            Try it out
          </h4>
          <button
            className="flex items-center gap-2 text-2xl"
            onClick={() => setCurrentPage("slack")}
          >
            <SlackLogo size={64} color="white" />
            Slack
          </button>
          <button
            className="flex items-center gap-2 text-2xl"
            onClick={() => setCurrentPage("discord")}
          >
            <DiscordLogo size={64} color="white" />
            Discord
          </button>
          <button
            className="flex items-center gap-2 text-2xl"
            onClick={() => setCurrentPage("email")}
          >
            <EnvelopeSimple size={64} color="white" />
            Email
          </button>
          <button
            className="flex items-center gap-2 text-2xl"
            onClick={() => setCurrentPage("search")}
          >
            <MagnifyingGlass size={64} color="white" />
            Search
          </button>
          <button
            className="flex items-center gap-2 text-2xl"
            onClick={() => setCurrentPage("docs")}
          >
            <GoogleDriveLogo size={64} color="white" />
            Docs
          </button>
        </div>
      </LiquidGlass>
      {(() => {
        switch (currentPage) {
          case "slack":
            return <SlackMock />;
          case "discord":
            return <DiscordMock />;
        }
      })()}
    </>
  );
}
