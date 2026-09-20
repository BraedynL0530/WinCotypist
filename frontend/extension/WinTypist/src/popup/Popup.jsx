import { useState } from "react";

export default function Popup() {
  const [value, setValue] = useState(100);
  const [isOn, setIsOn] = useState(true);

  const handleSlider = (event) => {
    setValue(event.target.value);
  };

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
        onChange={handleSlider}
        className="w-full"
      />
    </div>
  );
}
