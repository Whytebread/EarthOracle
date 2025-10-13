import React, { useState } from "react";
import { geomanticFigures } from "./data/figures";
import FigureCard from "./components/FigureCard";
import { generateRandomFigure } from "./utils/generateFigure";
import CastingLine from "./components/CastingLine";

function App() {
  const [pattern, setPattern] = useState([]);
  const [figureComplete, setFigureComplete] = useState(false);

  const handleLineComplete = (result) => {
    const newPattern = [...pattern, result];
    setPattern(newPattern);
    if (newPattern.length === 4) setFigureComplete(true);
  };

  const handleReset = () => {
    setPattern([]);
    setFigureComplete(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">EarthOracle</h1>

      {!figureComplete ? (
        <>
          <p className="mb-4 text-gray-400">Click to cast each line.</p>
          <div>
            <CastingLine onComplete={handleLineComplete} key={pattern.length} />
          </div>
        </>
      ) : (
        <>
          <FigureCard name="Your Figure" pattern={pattern} />
          <button
            onClick={handleReset}
            className="mt-6 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg"
          >
            Cast Again
          </button>
        </>
      )}
    </div>
  );
}

export default App;
