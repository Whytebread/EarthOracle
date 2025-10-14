import React, { useState } from "react";
import { geomanticFigures } from "./data/figures";
import FigureCard from "./components/FigureCard";
import CastingBoard from "./components/CastingBoard";

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
  const newFigures = [...figures, newFigure];
  setFigures(newFigures);
  setCurrentFigureLines([]);
  setFigureCount((prev) => prev + 1);

  // Save to localStorage
  if (newFigures.length === 4) {
    localStorage.setItem("earthOracleMothers", JSON.stringify(newFigures));
  }
}
  };

  const handleReset = () => {
    setCurrentFigureLines([]);
    setFigures([]);
    setFigureCount(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8 text-emerald-400 tracking-wide">EarthOracle</h1>

      {figureCount < 4 ? (
        <>
          <CastingBoard
            onComplete={handleLineComplete}
            currentFigureNumber={figureCount}
            currentLine={currentFigureLines.length}
          />
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