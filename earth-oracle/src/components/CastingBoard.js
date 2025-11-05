
import React, { useState } from "react";
import DiceRoller from "./DiceRoller";
import { geomanticFigures } from "../data/figures";
import FigureCard from "./FigureCard";

const CastingBoard = () => {
  const [rolls, setRolls] = useState([]); // store dice results for each roll
  const [mothers, setMothers] = useState([]); // store resulting 4 Mothers

  const handleDiceRoll = (values) => {
    // values = array of 4 numbers, one for each element
    setRolls((prev) => [...prev, values]);

    // once we have 4 rolls, generate Mothers
    if (rolls.length === 3) {
      const newRolls = [...rolls, values];
      const newMothers = generateMothers(newRolls);
      setMothers(newMothers);
    }
  };


const generateMothers = (rolls) => {
  return rolls.map((roll, i) => {
    
    const pattern = roll;

    const figure = geomanticFigures.find(
      (f) => f.pattern.every((bit, idx) => bit === pattern[idx])
    );

    if (!figure) {
      console.warn(`Missing pattern: [${pattern.join(", ")}]`);
    }

    return {
      name: figure ? figure.name : `Unknown ${i + 1}`,
      pattern,
    };
  });
};

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-amber-50 p-6"
      style={{
        backgroundImage: "url('/parchment-texture.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-amber-800 drop-shadow-md">
        Geomantic Casting Board
      </h1>

      {rolls.length < 4 ? (
        <>
          <p className="text-lg text-amber-900 mb-4">
            Concentrate on your question and click the spindle to cast.
          </p>
          <DiceRoller onRollComplete={handleDiceRoll} disabled={rolls.length >= 4} />
          <p className="mt-4 text-sm text-amber-800">
            Rolls completed: {rolls.length}/4
          </p>
        </>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mothers.map((mother, idx) => (
            <FigureCard
              key={idx}
              title={`Mother ${idx + 1}`}
              figure={mother}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CastingBoard;
