
import React, { useState } from "react";
import DiceRoller from "./DiceRoller";
import { geomanticFigures } from "../data/figures";

const emptyMother = [[], [], [], []];

const CastingBoard = () => {
  const [mothers, setMothers] = useState([[], [], [], []]);
  const [currentMother, setCurrentMother] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleLineResult = (line) => {
    const updated = [...mothers];
    updated[currentMother][currentLine] = line;
    setMothers(updated);

    // Move to next line/mother
    if (currentLine < 3) {
      setCurrentLine(currentLine + 1);
    } else if (currentMother < 3) {
      setCurrentMother(currentMother + 1);
      setCurrentLine(0);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <h2 className="text-3xl font-semibold text-amber-900 mb-2">
        {finished
          ? "All Four Mothers Cast"
          : `Casting Mother ${currentMother + 1}, Line ${currentLine + 1}`}
      </h2>

      {!finished && (
        <p className="text-lg italic text-amber-800 mb-4">
          Concentrate on your question and click “Cast Dice”.
        </p>
      )}

      <DiceRoller
        onRollComplete={handleLineResult}
        disabled={finished}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 w-full justify-items-center">
        {mothers.map((mother, i) => (
          <div
            key={i}
            className="border-4 border-amber-700 bg-[url('/parchment-texture.jpg')] bg-cover rounded-2xl p-4 w-40 h-56 flex flex-col justify-between shadow-lg"
          >
            <div className="flex flex-col justify-center items-center flex-grow gap-2">
              {mother.length > 0 ? (
                mother.map((line, j) => (
                  <div
                    key={j}
                    className="flex justify-center gap-2"
                  >
                    {line.map((dot, k) => (
                      <div
                        key={k}
                        className={`w-3 h-3 rounded-full ${
                          dot ? "bg-amber-900" : "bg-amber-200"
                        }`}
                      ></div>
                    ))}
                  </div>
                ))
              ) : (
                <p className="text-sm italic text-gray-600">—</p>
              )}
            </div>
            <p className="text-center font-semibold text-amber-900">
              {figureNames[i] || `Mother ${i + 1}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastingBoard;
