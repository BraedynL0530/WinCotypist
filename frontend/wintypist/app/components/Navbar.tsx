import React from "react";
import { Abel } from "next/font/google";
import Link from "next/link";

const abel = Abel({
  subsets: ["latin"],
  weight: "400",
});

export function WinButton() {
  return (
    <a
      href="https://github.com/BraedynL0530/WinCotypist"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="bg-gradient-to-r from-[#FC1022] to-[#FD8920] p-0.5 rounded-md mr-2 mt-2 mb-2">
        <button className="flex items-center gap-2 rounded-md p-2 bg-black w-full">
          <svg
            viewBox="0 0 88 88"
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
          >
            <path
              d="m0 12.402 35.687-4.86.016 34.423-35.67.203zm35.67 33.529.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349-.011 41.34-47.318-6.678-.066-34.739z"
              fill="#fff"
            />
          </svg>
          Download
        </button>
      </div>
    </a>
  );
}

export default function NavBar() {
  return (
    <div className="w-full bg-black flex justify-between items-center h-max-[50px]">
      <h4 className={`${abel.className} text-2xl m-2`}>WinCotypist</h4>
      <div className="flex items-center justify-between gap-2">
        <Link
          href="/demo"
          className="flex items-center gap-2 border border-white rounded-md p-2.5"
        >
          Demo
        </Link>
        <a
          href="https://github.com/BraedynL0530/WinCotypist"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-white rounded-md p-2.5"
        >
          <svg
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
          >
            <path
              fill="#fff"
              fill-rule="evenodd"
              d="M512 0C229.12 0 0 229.12 0 512c0 226.56 146.56 417.92 350.08 485.76 25.6 4.48 35.2-10.88 35.2-24.32 0-12.16-.64-52.48-.64-95.36-128.64 23.68-161.92-31.36-172.16-60.16-5.76-14.72-30.72-60.16-52.48-72.32-17.92-9.6-43.52-33.28-.64-33.92 40.32-.64 69.12 37.12 78.72 52.48 46.08 77.44 119.68 55.68 149.12 42.24 4.48-33.28 17.92-55.68 32.64-68.48-113.92-12.8-232.96-56.96-232.96-252.8 0-55.68 19.84-101.76 52.48-137.6-5.12-12.8-23.04-65.28 5.12-135.68 0 0 42.88-13.44 140.8 52.48 40.96-11.52 84.48-17.28 128-17.28s87.04 5.76 128 17.28c97.92-66.56 140.8-52.48 140.8-52.48 28.16 70.4 10.24 122.88 5.12 135.68 32.64 35.84 52.48 81.28 52.48 137.6 0 196.48-119.68 240-233.6 252.8 18.56 16 34.56 46.72 34.56 94.72 0 68.48-.64 123.52-.64 140.8 0 13.44 9.6 29.44 35.2 24.32C877.44 929.92 1024 737.92 1024 512 1024 229.12 794.88 0 512 0"
              clip-rule="evenodd"
            />
          </svg>
          Github
        </a>
        <WinButton />
      </div>
    </div>
  );
}
