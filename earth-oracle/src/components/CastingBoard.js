import React, { useState } from "react";
import DiceRoller from "./DiceRoller";
import FigureCard from "./FigureCard";
import { geomanticFigures } from "../data/figures";

const CastingBoard = () => {
  const [mothers, setMothers] = useState([]);

  const handleRollComplete = (pattern) => {
    const figure = geomanticFigures.find((f) =>
      f.pattern.every((p, i) => p === pattern[i])
    );

    const newMother = {
      name: figure ? figure.name : `Unknown ${mothers.length + 1}`,
      pattern,
    };

    setMothers((prev) => [...prev, newMother]);
  };

  const isDisabled = mothers.length >= 4;

  return (
    <div className="flex flex-col items-center gap-8">
      <DiceRoller onRollComplete={handleRollComplete} disabled={isDisabled} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mothers.map((mother, idx) => (
          <FigureCard
            key={idx}
            title={`Mother ${idx + 1}`}
            figure={mother}
          />
        ))}
      </div>
    </div>
  );
};

export default CastingBoard;