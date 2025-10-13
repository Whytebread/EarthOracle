import React, { useState } from "react";

const CastingLine = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleClick = () => {
    if (!finished) setCount(count + 1);
  };

  const handleFinish = () => {
    const result = count % 2 === 0 ? 0 : 1; // even = 0, odd = 1
    setFinished(true);
    onComplete(result); // send result up to parent
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div
        onClick={handleClick}
        className={`w-48 h-16 border-2 border-emerald-500 rounded-lg flex items-center justify-center cursor-pointer ${
          finished ? "opacity-50" : "hover:bg-emerald-800/30"
        }`}
      >
        <span className="text-2xl">{count} dots</span>
      </div>
      {!finished && (
        <button
          onClick={handleFinish}
          className="mt-2 text-sm text-emerald-400 underline"
        >
          Finish Line
        </button>
      )}
    </div>
  );
};

export default CastingLine;
