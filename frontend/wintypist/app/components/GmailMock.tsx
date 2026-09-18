"use client";

import { useState } from "react";
import {
  List,
  MagnifyingGlass,
  Question,
  GearSix,
  SquaresFour,
  PencilSimple,
  Star,
  ClockCounterClockwise,
  PaperPlaneRight,
  FileText,
  Tag,
  CaretDown,
  Trash,
  Paperclip,
  LinkSimple,
  Smiley,
  Image as ImageIcon,
  LockSimple,
  TextB,
  TextItalic,
  TextUnderline,
  ListBullets,
  ListNumbers,
  DotsThreeVertical,
  ArrowsOutSimple,
  Minus,
  X,
  EnvelopeSimple,
  EnvelopeOpen,
  VideoCamera,
  Archive,
} from "@phosphor-icons/react";

const mails = [
  {
    from: "Maple & Co.",
    subject: "Your order has shipped",
    snippet: "Track your package...",
    date: "10:01 AM",
    unread: true,
  },
  {
    from: "Tourney Bot",
    subject: "Friday bracket is live",
    snippet: "Check in before 6 PM...",
    date: "Sep 16",
    unread: true,
  },
  {
    from: "Riverside Library",
    subject: "Due soon: 2 books",
    snippet: "Renew online anytime...",
    date: "Sep 11",
    unread: false,
  },
  {
    from: "Pixel Press",
    subject: "This week in games",
    snippet: "Top stories you missed...",
    date: "Sep 10",
    unread: false,
  },
  {
    from: "Coach Bram",
    subject: "Practice moved to 5",
    snippet: "Field B this week...",
    date: "Sep 9",
    unread: false,
  },
  {
    from: "Nova Bank",
    subject: "Statement ready",
    snippet: "Your August statement...",
    date: "Sep 8",
    unread: false,
  },
  {
    from: "lowfi radio",
    subject: "New mix just dropped",
    snippet: "Sunday chill session...",
    date: "Sep 8",
    unread: false,
  },
  {
    from: "Campus Eats",
    subject: "20% off this weekend",
    snippet: "Show this email...",
    date: "Sep 7",
    unread: false,
  },
  {
    from: "Starfall99",
    subject: "clip from last night",
    snippet: "You have to see this...",
    date: "Sep 3",
    unread: false,
  },
  {
    from: "Orbit Mail",
    subject: "Storage almost full",
    snippet: "You are using 90%...",
    date: "Sep 3",
    unread: false,
  },
  {
    from: "Book Club",
    subject: "October pick poll",
    snippet: "Vote by Friday...",
    date: "Sep 2",
    unread: false,
  },
  {
    from: "Gym",
    subject: "New class schedule",
    snippet: "Evenings added...",
    date: "Sep 2",
    unread: false,
  },
  {
    from: "Airline Deals",
    subject: "Fall fares are here",
    snippet: "Round trips from $99...",
    date: "Aug 31",
    unread: false,
  },
  {
    from: "Photo Sync",
    subject: "Your memories",
    snippet: "A look back at August...",
    date: "Aug 30",
    unread: false,
  },
];

const nav = [
  { label: "Inbox", icon: "inbox", active: true, count: "2" },
  { label: "Starred", icon: "star", active: false },
  { label: "Snoozed", icon: "clock", active: false },
  { label: "Sent", icon: "send", active: false },
  { label: "Drafts", icon: "file", active: false },
  { label: "Categories", icon: "tag", active: false },
];

function NavIcon({ icon }: { icon: string }) {
  const cls = "text-gray-600";
  switch (icon) {
    case "inbox":
      return <EnvelopeOpen size={20} className={cls} />;
    case "star":
      return <Star size={20} className={cls} />;
    case "clock":
      return <ClockCounterClockwise size={20} className={cls} />;
    case "send":
      return <PaperPlaneRight size={20} className={cls} />;
    case "file":
      return <FileText size={20} className={cls} />;
    default:
      return <Tag size={20} className={cls} />;
  }
}

export default function GmailMock() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-white text-[14px] text-gray-800">
      {/* top bar */}
      <div className="flex h-16 shrink-0 items-center gap-4 px-4">
        <List size={22} className="text-gray-600" />
        <span className="flex items-center gap-2 text-[22px] text-gray-600">
          <EnvelopeSimple size={30} weight="duotone" className="text-blue-600" />
          Email
        </span>
        <div className="mx-auto flex w-[45%] items-center gap-3 rounded-full bg-[#f1f3f4] px-4 py-2.5 text-gray-600">
          <MagnifyingGlass size={20} />
          <span>Search mail</span>
        </div>
        <div className="ml-auto flex items-center gap-4 text-gray-600">
          <Question size={22} />
          <GearSix size={22} />
          <SquaresFour size={22} />
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-700 font-semibold text-white">
            K
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* left rail */}
        <div className="flex w-14 shrink-0 flex-col items-center gap-6 py-2 text-[11px] text-gray-600">
          <span className="relative flex flex-col items-center gap-1">
            <EnvelopeSimple size={22} />
            Mail
            <span className="absolute -right-2 -top-1 rounded-full bg-red-600 px-1 text-[9px] font-bold text-white">
              99+
            </span>
          </span>
          <span className="flex flex-col items-center gap-1">
            <VideoCamera size={22} />
            Meet
          </span>
        </div>

        {/* sidebar */}
        <div className="flex w-60 shrink-0 flex-col pr-3">
          <button className="mb-4 flex w-fit items-center gap-3 rounded-2xl bg-[#c2e7ff] px-5 py-3.5 font-medium text-gray-800 shadow">
            <PencilSimple size={20} /> Compose
          </button>
          {nav.map((n) => (
            <div
              key={n.label}
              className={`flex items-center gap-4 rounded-r-full px-5 py-1.5 ${
                n.active ? "bg-[#d3e3fd] font-bold" : ""
              }`}
            >
              <NavIcon icon={n.icon} />
              {n.label}
              {n.count && <span className="ml-auto text-[12px]">{n.count}</span>}
            </div>
          ))}
          <div className="px-5 py-2 text-gray-600">More</div>
          <div className="px-5 pb-1 pt-4 font-medium">Labels</div>
          <div className="flex items-center gap-4 rounded-r-full px-5 py-1.5 text-gray-700">
            <Tag size={18} /> Tournament
          </div>
        </div>

        {/* inbox list */}
        <div className="min-w-0 flex-1 overflow-y-auto rounded-2xl bg-white pr-2">
          {mails.map((m) => (
            <div
              key={m.subject}
              className={`flex items-center gap-3 border-b border-gray-100 px-3 py-2.5 hover:shadow ${
                m.unread ? "bg-[#f2f6fc] font-bold" : ""
              }`}
            >
              <span className="h-4 w-4 rounded-sm border border-gray-400" />
              <Star size={18} className="shrink-0 text-gray-400" />
              <span className="w-44 shrink-0 truncate">{m.from}</span>
              <span className="min-w-0 flex-1 truncate font-normal">
                {m.subject} <span className="text-gray-500">- {m.snippet}</span>
              </span>
              <span className="shrink-0 text-[12px] text-gray-600">{m.date}</span>
            </div>
          ))}
        </div>

        {/* right rail */}
        <div className="flex w-12 shrink-0 flex-col items-center gap-5 border-l border-gray-100 py-3 text-gray-500">
          <Archive size={20} />
          <Star size={20} />
          <EnvelopeSimple size={20} />
          <VideoCamera size={20} />
        </div>
      </div>

      {/* compose window — the functional part */}
      <div className="absolute bottom-0 left-[260px] right-6 top-8 flex flex-col rounded-t-xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.35)] md:right-8">
        <div className="flex items-center rounded-t-xl bg-[#f2f6fc] px-4 py-2.5 font-medium">
          New Message
          <span className="ml-auto flex items-center gap-4 text-gray-600">
            <Minus size={16} />
            <ArrowsOutSimple size={16} />
            <X size={18} />
          </span>
        </div>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Recipients"
          className="border-b border-gray-100 px-4 py-2.5 outline-none placeholder:text-gray-500"
        />
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="border-b border-gray-100 px-4 py-2.5 outline-none placeholder:text-gray-500"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="min-h-0 flex-1 resize-none px-4 py-3 outline-none"
        />
        <div className="flex items-center gap-1 px-4 py-2 text-gray-600">
          <TextB size={18} weight="bold" />
          <TextItalic size={18} />
          <TextUnderline size={18} />
          <ListBullets size={18} />
          <ListNumbers size={18} />
        </div>
        <div className="flex items-center gap-3 px-4 pb-4 text-gray-600">
          <span className="flex items-center rounded-full bg-[#0b57d0] py-2 pl-5 pr-2 font-medium text-white">
            Send <CaretDown size={16} weight="bold" className="ml-3" />
          </span>
          <Paperclip size={20} />
          <LinkSimple size={20} />
          <Smiley size={20} />
          <ImageIcon size={20} />
          <LockSimple size={20} />
          <DotsThreeVertical size={20} className="ml-1" />
          <Trash size={20} className="ml-auto" />
        </div>
      </div>
    </div>
  );
}
