import React, { useState } from "react";

const CastingLine = ({ onComplete }) => {
  const [dots, setDots] = useState([]);
  const [finished, setFinished] = useState(false);

  const handleClick = () => {
    if (finished) return;
    setDots([...dots, { id: Date.now() }]);
  };

  const handleFinish = () => {
    if (finished || dots.length < 12) return;
    const result = dots.length % 2 === 0 ? 0 : 1;
    setFinished(true);
    onComplete(result);
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div
        onClick={handleClick}
        className={`w-48 min-h-[4rem] border-2 border-emerald-500 rounded-lg flex flex-wrap justify-center items-center cursor-pointer p-2 transition-all ${
          finished ? "opacity-50" : "hover:bg-emerald-800/30"
        }`}
      >
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="w-3 h-3 bg-white rounded-full m-1 animate-pulse"
          ></div>
        ))}
      </div>

      {!finished && dots.length > 0 && (
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
