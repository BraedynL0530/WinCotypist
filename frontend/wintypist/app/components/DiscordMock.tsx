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
  Smiley,
  GearSix,
  Headset,
  MicrophoneSlash,
  CaretDown,
  DotsThree,
  User,
} from "@phosphor-icons/react";

const av = (i: number) => `https://cdn.discordapp.com/embed/avatars/${i}.png`;

const dmList = [
  { name: "astro", sub: "", avatar: 1, status: "red" },
  {
    name: "Nova Prime",
    sub: "Listening to Synthwave",
    avatar: 2,
    status: "green",
    tag: "ACE",
  },
  {
    name: "lowfi lobby",
    sub: "3 Members",
    avatar: 3,
    status: "green",
  },
  {
    name: "Friday tourney crew",
    sub: "4 Members",
    avatar: 4,
    status: "green",
  },
  {
    name: "clipdump",
    sub: "7 Members",
    avatar: 0,
    status: "green",
  },
  { name: "Bram", sub: "", avatar: 5, status: "gray", tag: "GG" },
  { name: "Lumen", sub: "", avatar: 1, status: "red", active: true },
  {
    name: "Starfall99",
    sub: "Chasing the high score!",
    avatar: 2,
    status: "green",
    tag: "TTV",
  },
  { name: "Ivo", sub: "", avatar: 3, status: "gray" },
  { name: "marbles", sub: "", avatar: 4, status: "gray" },
  { name: "dee", sub: "", avatar: 0, status: "gray" },
  { name: "QuietStorm", sub: "", avatar: 5, status: "gray" },
  { name: "Rook_", sub: "", avatar: 1, status: "gray", tag: "RANK" },
  { name: "Van driver", sub: "", avatar: 2, status: "gray", tag: "LFG" },
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
      {/* server rail */}
      <div className="flex w-[72px] shrink-0 flex-col items-center gap-2 bg-[#1e1f22] py-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5865F2] font-bold text-white">
          <img src={av(0)} alt="" className="h-8 w-8 rounded-full" />
        </div>
        <div className="my-1 h-px w-8 bg-white/10" />
        {[1, 2, 3, 4, 5, 0, 1].map((a, i) => (
          <div key={i} className="relative">
            <img
              src={av(a)}
              alt=""
              className="h-12 w-12 rounded-full bg-[#2b2d31]"
            />
          </div>
        ))}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2b2d31] text-green-400">
          <Plus size={22} weight="bold" />
        </div>
      </div>

      {/* DM sidebar */}
      <div className="flex w-[240px] shrink-0 flex-col bg-[#2b2d31]">
        <div className="p-2.5">
          <div className="flex items-center justify-center rounded-md bg-[#1e1f22] px-3 py-2 text-[13px] text-gray-300">
            Find or start a conversation
          </div>
          <div className="flex items-center gap-3 rounded-md px-2 py-2 text-gray-300">
            <Users size={22} /> Friends
          </div>
          <div className="flex items-center gap-3 rounded-md px-2 py-2 text-gray-300">
            <Rocket size={22} /> Nitro
          </div>
          <div className="flex items-center gap-3 rounded-md px-2 py-2 text-gray-300">
            <Storefront size={22} /> Shop
            <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-black">
              NEW
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-md px-2 py-2 text-gray-300">
            <GameController size={22} /> Quests
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between px-4 text-[12px] font-semibold text-gray-400">
          Direct Messages <Plus size={16} weight="bold" />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-2 py-1">
          {dmList.map((d) => (
            <div
              key={d.name}
              className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 ${d.active ? "bg-white/10 text-white" : "text-gray-300"}`}
            >
              <span className="relative shrink-0">
                <Avatar i={d.avatar} />
                <StatusDot c={d.status} />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 truncate text-[14px] font-medium">
                  {d.name}
                  {d.tag && (
                    <span className="rounded bg-white/10 px-1 py-px text-[10px] font-bold text-gray-300">
                      {d.tag}
                    </span>
                  )}
                </span>
                {d.sub && (
                  <span className="block truncate text-[12px] text-gray-400">
                    {d.sub}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* self panel */}
        <div className="m-2 flex items-center gap-2 rounded-lg bg-black/40 p-2">
          <span className="relative">
            <Avatar i={3} />
            <StatusDot c="gray" />
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] font-bold text-white">
              Kairo
            </span>
            <span className="block text-[11px] text-gray-400">Invisible</span>
          </span>
          <span className="ml-auto flex items-center gap-2 text-gray-300">
            <MicrophoneSlash size={20} />
            <Headset size={20} />
            <GearSix size={20} />
          </span>
        </div>
      </div>

      {/* main chat */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center gap-3 border-b border-black/30 px-4">
          <Avatar i={1} size={24} />
          <span className="text-[15px] font-bold text-white">Lumen</span>
          <div className="ml-auto flex items-center gap-4 text-gray-400">
            <Phone size={22} />
            <VideoCamera size={22} />
            <PushPin size={22} />
            <UserPlus size={22} />
            <User size={22} />
          </div>
          <div className="flex w-56 items-center gap-2 rounded-md bg-[#1e1f22] px-2 py-1.5 text-[13px] text-gray-400">
            <span className="truncate">Search lumen_042</span>
            <MagnifyingGlass size={16} className="ml-auto" />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          <div className="mb-1 text-[14px] text-gray-300">yo did u see this?</div>
          <a className="text-[#00a8fc]">https://example.com/event/12345</a>

          <div className="my-4 flex items-center gap-3 text-[12px] text-gray-400">
            <span className="h-px flex-1 bg-white/10" /> 5 September 2026
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {/* highlighted invite */}
          <div className="-mx-4 border-l-2 border-amber-400 bg-amber-400/10 px-4 py-1">
            <div className="flex items-center gap-2">
              <Avatar i={1} size={36} />
              <span className="font-medium text-white">Lumen</span>
              <span className="text-[11px] text-gray-400">05/09/2026, 21:39</span>
            </div>
            <p className="mt-0.5 text-[15px]">
              hosting a game night on friday 19th after dinner, might move it if
              the lobby is full{" "}
              <span className="rounded bg-[#5865F2]/40 px-1 font-medium text-white">
                @Kairo
              </span>
            </p>
            <p className="mt-2 text-[15px]">bring snacks if u can</p>
          </div>

          <div className="my-4 flex items-center gap-3 text-[12px] text-gray-400">
            <span className="h-px flex-1 bg-white/10" /> 8 September 2026
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {[
            {
              who: "Kairo",
              t: "08/09/2026, 18:06",
              a: 3,
              body: "@Lumen what should i bring for friday?",
              tag: true,
            },
            {
              who: "Lumen",
              t: "08/09/2026, 18:10",
              a: 1,
              body: "nothing much\njust yourself",
            },
            {
              who: "Kairo",
              t: "08/09/2026, 18:11",
              a: 3,
              body: "i saw the sign up list",
              tag: true,
            },
            {
              who: "Kairo",
              t: "08/09/2026, 18:11",
              a: 3,
              body: "no really ill grab something",
              tag: true,
              reply: "@Lumen just yourself",
            },
            {
              who: "Lumen",
              t: "08/09/2026, 18:13",
              a: 1,
              body: "chips\none or two bags\nor some soda\nmaybe extra controllers\nwhoever has them",
            },
            {
              who: "Kairo",
              t: "08/09/2026, 18:14",
              a: 3,
              body: "alr so chips or soda? or both?",
              tag: true,
            },
            {
              who: "Lumen",
              t: "08/09/2026, 18:14",
              a: 1,
              body: "either works",
            },
            {
              who: "Kairo",
              t: "08/09/2026, 18:17",
              a: 3,
              body: "ok",
              tag: true,
            },
          ].map((m, i) => (
            <div key={i} className="mb-5 flex gap-3">
              <Avatar i={m.a} size={40} />
              <div>
                <span className="font-medium text-white">{m.who}</span>

                {m.tag && (
                  <span className="ml-1.5 rounded bg-white/10 px-1 py-px text-[10px] font-bold text-gray-300">
                    MC
                  </span>
                )}

                <span className="ml-2 text-[11px] text-gray-400">{m.t}</span>

                {m.reply && (
                  <div className="mt-1 border-l-2 border-white/20 pl-2 text-[13px] text-gray-400">
                    {m.reply}
                  </div>
                )}

                {m.body.split("\n").map((line, j) => (
                  <div key={j} className="text-[15px] leading-6">
                    {line.startsWith("@") ? (
                      <>
                        <span className="rounded bg-[#5865F2]/40 px-1 font-medium text-white">
                          {line.split(" ")[0]}
                        </span>{" "}
                        {line.split(" ").slice(1).join(" ")}
                      </>
                    ) : (
                      line
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ONLY functional part: bottom textbox */}
        <div className="shrink-0 px-4 pb-5">
          <div className="flex items-center gap-3 rounded-lg bg-[#383a40] px-3 py-2.5">
            <Plus size={22} className="shrink-0 text-gray-300" />
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Message @Lumen"
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-gray-400"
            />
            <Gift size={22} className="shrink-0 text-gray-300" />
            <Smiley size={22} className="shrink-0 text-gray-300" />
          </div>
        </div>
      </div>

      {/* right profile panel */}
      <div className="flex w-[300px] shrink-0 flex-col bg-[#2b2d31] p-3">
        <div className="ml-auto flex gap-2 text-gray-300">
          <span className="rounded-full bg-black/30 p-2">
            <User size={16} />
          </span>
          <span className="rounded-full bg-black/30 p-2">
            <DotsThree size={16} weight="bold" />
          </span>
        </div>
        <img
          src={av(1)}
          alt=""
          className="mt-2 h-20 w-20 rounded-full bg-black"
        />
        <div className="mt-3 rounded-lg bg-black/30 p-3">
          <div className="text-[20px] font-bold text-white">Lumen</div>
          <div className="text-[13px] text-gray-300">lumen_042</div>
          <div className="mt-2 text-[12px] text-gray-400">
            12 Mutual Friends • 4 Mutual Servers
          </div>
          <div className="mt-3 text-[12px] font-bold uppercase text-gray-400">
            Member Since
          </div>
          <div className="text-[13px]">02 Jan 2024</div>
        </div>
        <button className="mt-auto rounded-md bg-white/10 py-2 text-[14px] font-medium text-white">
          View Full Profile
        </button>
      </div>
    </div>
  );
}
