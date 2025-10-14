import React from "react";
import CastingLine from "./CastingLine";

const CastingBoard = ({ onComplete, currentFigureNumber, currentLine }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <h2 className="text-xl text-emerald-300 mb-4 text-center font-semibold">
        Focus on your question...
      </h2>
      <p className="text-sm text-gray-400 mb-4 text-center italic">
        Cast line {currentLine + 1} for Mother {currentFigureNumber + 1}.  
        Click **from right to left** No effort should be made to count the points but make at least 12
      </p>

      <div className="w-full bg-[url('/parchment-texture.jpg')] bg-cover bg-center border-4 border-amber-700 rounded-xl p-6 shadow-lg">
        <CastingLine onComplete={onComplete} />
      </div>
    </div>
  );
};

export default CastingBoard;
