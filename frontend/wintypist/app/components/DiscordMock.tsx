"use client";

import { useState } from "react";
import {
  MagnifyingGlass,
  Phone,
  VideoCamera,
  PushPin,
  UserPlus,
  Users,
  Rocket,
  Storefront,
  GameController,
  Plus,
  Gift,
  Gif,
  Sticker,
  Smiley,
  GearSix,
  Headset,
  MicrophoneSlash,
  CaretDown,
  DotsThree,
} from "@phosphor-icons/react";
import { redirect } from "next/dist/server/api-utils";

const av = (i: number) => `https://cdn.discordapp.com/embed/avatars/${i}.png`;

const dmList = [
  { name: "sams", sub: "", avatar: 1, status: "red" },
  {
    name: "Vivaan A",
    sub: "Michael Jackson",
    avatar: 2,
    status: "green",
    tag: "BOSS",
  },
  {
    name: "prithvi lwk knda tuff",
    sub: "3 Members",
    avatar: 3,
    status: "green",
  },
  {
    name: "Founder Challenge without pri...",
    sub: "4 Members",
    avatar: 4,
    status: "green",
  },
  {
    name: "Betas(son in hindi not the gre...",
    sub: "7 Members",
    avatar: 0,
    status: "green",
  },
  { name: "Vihaan", sub: "", avatar: 5, status: "gray", tag: "CITY" },
  { name: "Shasha", sub: "", avatar: 1, status: "red", active: true },
  {
    name: "Number26",
    sub: "For the glory of the king of the skies!",
    avatar: 2,
    status: "green",
    tag: "PF",
  },
  { name: "Aariyan", sub: "", avatar: 3, status: "gray" },
  { name: "idk", sub: "", avatar: 4, status: "gray" },
  { name: "dimension47", sub: "", avatar: 0, status: "gray" },
  { name: "EssentialAir", sub: "", avatar: 5, status: "gray" },
  { name: "Mrranbo_", sub: "", avatar: 1, status: "gray", tag: "VPVP" },
  { name: "Car guy", sub: "", avatar: 2, status: "gray", tag: "FORT" },
];

function Avatar({ i, size = 32 }: { i: number; size?: number }) {
  return (
    <img
      src={av(i)}
      alt=""
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full bg-[#5865F2]"
    />
  );
}

function StatusDot({ c }: { c: string }) {
  const map: Record<string, string> = {
    red: "bg-red-500",
    green: "bg-green-500",
    gray: "bg-gray-500",
  };
  return (
    <span
      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#2b2d31] ${map[c]}`}
    />
  );
}

export default function DiscordMock() {
  const [draft, setDraft] = useState("");

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#313338] text-[14px] text-gray-200">
      <div className="flex w-[72px] shrink-0 flex-col items-center gap-2 bg-[#1e1f22] py-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5865F2] bold text-white">
          <img src={av(0)} alt="" className="h-8 w-8 rounded-full" />
        </div>
        <div className="my-1 h-px w-8 bg-white/10" />
        {[1, 2, 3, 4, 5, 0, 1].map((a, i) => (
          <div key={i} className="relative">
            <img
              src={av(a)}
              alt="discord logo"
              className="f-12 w-12 rounded-full bg-[#2b2d31]"
            />
          </div>
        ))}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2b2d31] text-green-400">
          <Plus size={22} weight="bold" />
        </div>
      </div>
    </div>
  );
}
