"use client";

import { useState } from "react";
import {
  House,
  ChatCircle,
  Bell,
  FolderSimple,
  BookmarkSimple,
  DotsThree,
  DotsThreeVertical,
  Plus,
  MagnifyingGlass,
  GearSix,
  NotePencil,
  Star,
  PushPin,
  CaretDown,
  ArrowLeft,
  ArrowRight,
  Clock,
  Question,
  Smiley,
  At,
  TextB,
  TextItalic,
  TextUnderline,
  TextStrikethrough,
  LinkSimple,
  ListBullets,
  ListNumbers,
  CodeSimple,
  PaperPlaneRight,
  Microphone,
  VideoCamera,
  Headset,
  TextAa,
  PlusCircle,
  CaretUpDown,
  ChatsCircle,
} from "@phosphor-icons/react";

type Channel = { name: string; unread: boolean };

const channels: Channel[] = [
  { name: "pixl-board", unread: false },
  { name: "printing-legion", unread: false },
  { name: "skyline", unread: false },
  { name: "stardance", unread: false },
  { name: "stardance-bulletin", unread: false },
  { name: "summer-of-making", unread: false },
  { name: "third-space", unread: false },
  { name: "third-space-bulletin", unread: false },
  { name: "third-space-help", unread: false },
  { name: "treasure-cove", unread: true },
  { name: "treasure-hunt-bulletbin", unread: true },
  { name: "what-is-my-slack-id", unread: true },
  { name: "ysws", unread: false },
  { name: "zone-out", unread: true },
  { name: "zoneout-announcements", unread: true },
];

const dms = [
  { name: "Azure, Dauntedbird, Rishth...", active: true, unread: 3 },
  { name: "Praneel230", active: false, unread: 0 },
  { name: "Rishthepro", active: false, unread: 0 },
  { name: "Azure, Dauntedbird", active: false, unread: 2 },
  { name: "Floppy", active: false, unread: 0 },
  { name: "jazil", active: false, unread: 0 },
  { name: "AmandaBlue", active: false, unread: 0 },
  { name: "nokoto", active: false, unread: 0 },
];

const messages = [
  {
    name: "Azure",
    color: "bg-purple-500",
    initial: "A",
    time: "4:21 PM",
    texts: [
      "ok so i got the ghost text working in the demo",
      "type in the box below and hit Tab to accept",
    ],
  },
  {
    name: "Dauntedbird",
    color: "bg-amber-600",
    initial: "D",
    time: "4:24 PM",
    texts: [
      "Yooo that prediction is fast",
      "it finished my whole sentence wtf",
    ],
  },
  {
    name: "Rishthepro",
    color: "bg-green-700",
    initial: "R",
    time: "4:26 PM",
    texts: [
      "It's called adaptation",
      "wincotypist just knows what im gonna say",
    ],
    hasAttachment: true,
  },
  {
    name: "Dauntedbird",
    color: "bg-amber-600",
    initial: "D",
    time: "4:26 PM",
    texts: ["try typing 'the demo site will' in the box"],
  },
  {
    name: "Rishthepro",
    color: "bg-green-700",
    initial: "R",
    time: "4:26 PM",
    texts: ["Bruh"],
  },
];

function Avatar({ initial, color }: { initial: string; color: string }) {
  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-base font-bold text-white ${color}`}
    >
      {initial}
    </div>
  );
}

export default function SlackMock() {
  const [draft, setDraft] = useState("");

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#1a1d21] text-[14px] text-gray-200">
      {/* top bar */}
      <div className="flex h-11 shrink-0 items-center gap-2 bg-[#2D0A30] px-3">
        <ArrowLeft size={18} className="text-gray-400 ml-auto" />
        <ArrowRight size={18} className="text-gray-600" />
        <Clock size={18} className="text-gray-300" />
        <div className=" flex w-[44%] items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-gray-200">
          <MagnifyingGlass size={16} className="text-gray-300" />
          <span>Search Hack Club</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="h-7 w-7 rounded-full bg-purple-400" />
          <Question size={20} className="text-gray-200" />
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* far-left rail */}
        <div className="flex w-[72px] shrink-0 flex-col items-center gap-5 bg-[#2D0A30] py-2 text-[11px] text-gray-300">
          <div className="flex flex-col items-center gap-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <House size={26} weight="regular" className="text-white" />
            </div>
            <span className="font-semibold text-white">Home</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ChatsCircle size={24} className="text-gray-300" />
            DMs
          </div>
          <div className="relative flex flex-col items-center gap-1">
            <Bell size={24} className="text-gray-300" />
            Activity
          </div>
          <div className="flex flex-col items-center gap-1">
            <FolderSimple size={24} className="text-gray-300" />
            Files
          </div>
          <div className="flex flex-col items-center gap-1">
            <BookmarkSimple size={24} className="text-gray-300" />
            Later
          </div>
          <div className="flex flex-col items-center gap-1">
            <DotsThree size={24} className="text-gray-300" />
            More
          </div>
        </div>

        {/* channel sidebar */}
        <div className="flex w-[264px] shrink-0 flex-col bg-[#241229]">
          <div className="flex items-center justify-between px-4 py-2.5">
            <span className="flex items-center gap-1 text-[17px] font-bold text-white">
              Hack Club <CaretDown size={14} weight="bold" />
            </span>
            <span className="flex items-center gap-3">
              <GearSix size={20} className="text-white" />
              <NotePencil size={20} className="text-white" />
            </span>
          </div>

          <div className="px-3 pb-2">
            <div className="flex items-center gap-2 rounded-md bg-black/25 px-3 py-2 text-gray-300">
              <ListBullets size={16} />
              <span>Find a conversation...</span>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
            {channels.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-2 truncate rounded px-2 py-[5px]"
              >
                <span className="text-gray-400">#</span>
                <span
                  className={
                    c.unread
                      ? "font-bold text-white"
                      : "font-normal text-gray-300/80"
                  }
                >
                  {c.name}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2 px-2 py-2 text-gray-300">
              <Plus size={14} /> Add channels
            </div>

            <div className="px-2 pb-1 pt-4 text-gray-300 flex items-center gap-2">
              <ChatsCircle size={16} className="text-gray-300" />
              Direct messages
            </div>
            {dms.map((d) => (
              <div
                key={d.name}
                className={`mb-[1px] flex items-center gap-2 truncate rounded-lg px-2 py-[6px] ${
                  d.active
                    ? "bg-[#7c3a8a] font-bold text-white"
                    : "text-gray-200"
                }`}
              >
                {d.unread > 0 ? (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-[#e8b4f5] px-1 text-[12px] font-bold text-[#3c0b3d]">
                    {d.unread}
                  </span>
                ) : (
                  <span className="h-5 w-5 shrink-0 rounded bg-gray-500/60" />
                )}
                <span className="truncate">{d.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 px-2 py-2 text-gray-200">
              <Plus size={14} /> Add colleagues
            </div>
          </div>
        </div>

        {/* main chat */}
        <div className="flex min-w-0 flex-1 flex-col bg-[#1a1d21]">
          <div className="flex h-[52px] shrink-0 items-center gap-2 border-b border-white/10 px-4">
            <Star size={18} className="text-gray-300" />
            <span className="text-[16px] font-bold text-white">
              Azure, Dauntedbird, Rishthepro
            </span>
            <div className="ml-auto flex items-center gap-3 text-gray-400">
              <Bell size={20} />
              <MagnifyingGlass size={20} />
              <DotsThreeVertical size={20} />
            </div>
          </div>

          <div className="flex h-10 shrink-0 items-center gap-5 border-b border-white/10 px-4 text-[14px]">
            <span className="flex items-center gap-1 font-bold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white" /> Messages
            </span>
            <span className="flex items-center gap-1 text-gray-300">
              <PushPin size={15} /> Pins
            </span>
            <span className="flex items-center gap-1 truncate text-gray-300">
              <FolderSimple size={15} /> PROJECT:cotypist for win...
            </span>
            <span className="flex items-center gap-1 text-gray-300">
              <FolderSimple size={15} /> Files and links
            </span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
            <div className="sticky top-0 z-10 mx-auto mb-4 flex w-fit items-center gap-1 rounded-full border border-white/10 bg-[#1a1d21] px-3 py-1 text-[13px]">
              Today <CaretDown size={12} />
            </div>

            {messages.map((m, i) => (
              <div key={i} className="mb-5 flex gap-3">
                <Avatar initial={m.initial} color={m.color} />
                <div className="min-w-0">
                  <span className="text-[15px] font-bold text-white">
                    {m.name}
                  </span>
                  <span className="ml-2 text-[12px] text-gray-400">
                    {m.time}
                  </span>
                  {m.texts.map((t, j) => (
                    <div
                      key={j}
                      className="text-[15px] leading-6 text-gray-100"
                    >
                      {t}
                    </div>
                  ))}
                  {m.hasAttachment && (
                    <div className="mt-2">
                      <div className="mb-1 flex items-center gap-1 text-[13px] text-gray-400">
                        1789556102725.jpeg <CaretDown size={14} weight="fill" />
                      </div>
                      <div className="h-72 w-44 rounded-xl border border-white/15 bg-black/40" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="h-8" />
          </div>

          {/* ONLY functional part: bottom textbox */}
          <div className="shrink-0 px-5 pb-4">
            <div className="rounded-lg border border-white/20 bg-[#222529]">
              <div className="flex items-center gap-4 px-4 pt-2.5 text-gray-400">
                <TextB size={18} weight="bold" />
                <TextItalic size={18} />
                <TextUnderline size={18} />
                <TextStrikethrough size={18} />
                <LinkSimple size={18} />
                <ListBullets size={18} />
                <ListNumbers size={18} />
                <CodeSimple size={18} />
              </div>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Message Azure, Dauntedbird, Rishthepro"
                className="w-full bg-transparent px-4 py-2.5 text-[15px] text-gray-100 outline-none placeholder:text-gray-400"
              />
              <div className="flex items-center gap-3 px-4 pb-2.5 text-gray-400">
                <PlusCircle size={22} />
                <TextAa size={22} weight="bold" />
                <Smiley size={22} />
                <At size={22} />
                <span className="mx-1 h-5 w-px bg-white/15" />
                <VideoCamera size={22} />
                <Microphone size={22} />
                <span className="mx-1 h-5 w-px bg-white/15" />
                <NotePencil size={20} />
                <PaperPlaneRight size={20} className="ml-auto" />
                <CaretUpDown size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom-left headset row to match target */}
      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 text-gray-300">
        <Headset size={22} />
        <CaretDown size={14} />
      </div>
    </div>
  );
}
