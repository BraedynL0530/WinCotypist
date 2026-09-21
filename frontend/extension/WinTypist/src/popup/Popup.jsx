import { useState, useEffect } from "react";

export default function Popup() {
  const [value, setValue] = useState(100);
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(["enabled", "delay"], (result) => {
      setIsOn(result.enabled ?? true);
      setValue(result.delay ?? 100);
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ enabled: isOn });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: "STATE_UPDATE", enabled: isOn },
          () => chrome.runtime.lastError,
        );
      }
    });
  }, [isOn]);

  useEffect(() => {
    chrome.storage.local.set({ delay: value });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: "DELAY_UPDATE", delay: value },
          () => chrome.runtime.lastError,
        );
      }
    });
  }, [value]);

  return (
    <div className="bg-radial-[at_top_left] from-[#FB0D23] from-70% to-[#ED8321] w-[300px] h-[150] p-4">
      <div className="flex justify-between">
        <h4 className="text-2xl text-white inline ">WinTypist</h4>
        <button
          onClick={() => setIsOn(!isOn)}
          className="bg-[#ED8321] p-2 rounded-md border"
        >
          {isOn ? "ON" : "OFF"}
        </button>
      </div>
      <br />
      <span className="text-xl text-white">
        Delay before suggestions: {value}ms
      </span>
      <br />
      <input
        type="range"
        name="Delay"
        min="100"
        max="1000"
        id="delay"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}