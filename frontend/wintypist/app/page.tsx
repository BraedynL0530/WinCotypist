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
  CaretDown,
  CaretLeft,
  DiscordLogo,
  EnvelopeSimple,
  GoogleDriveLogo,
  MagnifyingGlass,
  SlackLogo,
} from "@phosphor-icons/react";
import { Instrument_Sans } from "next/font/google";
import SlackMock from "./components/SlackMock";
import DiscordMock from "./components/DiscordMock";
import GmailMock from "./components/GmailMock";
import SearchMock from "./components/SearchMock";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export default function Home() {
  const [currentPage, setCurrentPage] = useState<
    "discord" | "slack" | "search" | "email" | "docs"
  >("slack");
  const [selectorOpen, setSelector] = useState(true);
  return (
    <>
      <LiquidGlass
        cornerRadius={24}
        padding="20px 24px"
        style={{
          position: "absolute",
          top: `${selectorOpen ? "200px" : "60px"} `,
          left: "120px",
          zIndex: 50,
          backgroundColor: "#00000030",
          borderRadius: "20px 24px",
        }}
        key={selectorOpen ? "open" : "closed"}
      >
        <div className="h-auto">
          <h4 className="text-4xl mb-5 font-sans font-light flex justify-between gap-2 items-center">
            Try it out{" "}
            <button onClick={() => setSelector(!selectorOpen)}>
              {selectorOpen ? <CaretDown /> : <CaretLeft />}
            </button>
          </h4>
          {selectorOpen && (
            <>
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
            </>
          )}
        </div>
      </LiquidGlass>
      {(() => {
        switch (currentPage) {
          case "slack":
            return <SlackMock />;
          case "discord":
            return <DiscordMock />;
          case "email":
            return <GmailMock />;
          case "search":
            return <SearchMock />;
          default:
            return null;
        }
      })()}
    </>
  );
}
