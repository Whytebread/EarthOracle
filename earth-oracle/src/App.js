import React, { useState } from "react";
import { geomanticFigures } from "./data/figures";
import FigureCard from "./components/FigureCard";
import { generateRandomFigure } from "./utils/generateFigure";
import CastingLine from "./components/CastingLine";

function App() {
  const [currentFigureLines, setCurrentFigureLines] = useState([]);
  const [figures, setFigures] = useState([]);
  const [figureCount, setFigureCount] = useState(0);

  const handleLineComplete = (result) => {
    const updatedLines = [...currentFigureLines, result];
    setCurrentFigureLines(updatedLines);

    if (updatedLines.length === 4) {
      const newFigure = {
        name: `Mother ${figureCount + 1}`,
        pattern: updatedLines,
      };
      setFigures([...figures, newFigure]);
      setCurrentFigureLines([]);
      setFigureCount((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentFigureLines([]);
    setFigures([]);
    setFigureCount(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">EarthOracle</h1>

      {figureCount < 4 ? (
        <>
          <p className="mb-4 text-gray-400">
            Casting Mother {figureCount + 1} — click to add dots.
          </p>
          <CastingLine onComplete={handleLineComplete} key={currentFigureLines.length} />
          <div className="mt-4 text-sm text-gray-400">
            Lines completed: {currentFigureLines.length}/4
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">The Four Mothers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {figures.map((f, i) => (
              <FigureCard key={i} name={f.name} pattern={f.pattern} />
            ))}
          </div>
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