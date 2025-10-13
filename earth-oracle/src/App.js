import React, { useState } from "react";
import { geomanticFigures } from "./data/figures";
import FigureCard from "./components/FigureCard";
import { generateRandomFigure } from "./utils/generateFigure";

function App() {
  const [figures, setFigures] = useState([]);

  const handleGenerate = () => {
    const newFigure = {
      name: "Random Figure",
      pattern: generateRandomFigure(),
    };
    setFigures((prev) => [...prev, newFigure]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">EarthOracle</h1>

      <button
        onClick={handleGenerate}
        className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg mb-8 transition-colors"
      >
        Generate Figure
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {figures.map((f, i) => (
          <FigureCard key={i} name={f.name} pattern={f.pattern} />
        ))}
      </div>
    </div>
  );
}

export default App;
