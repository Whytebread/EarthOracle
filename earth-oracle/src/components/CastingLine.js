import React, { useState } from "react";

const CastingLine = ({ onLineComplete }) => {
  const [dice, setDice] = useState([]);

  const rollDice = () => {
    const results = [1, 2, 3, 4].map(() => Math.ceil(Math.random() * 6));
    setDice(results);
    const parity = results.map(r => r % 2 === 0 ? 0 : 1); 
    onLineComplete(parity);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={rollDice}
        className="px-6 py-3 bg-amber-600 text-white rounded-lg shadow hover:bg-amber-700 transition"
      >
        Roll Dice
      </button>
      <div className="flex gap-2">
        {dice.map((value, i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white ${
              ["bg-red-500","bg-blue-500","bg-green-500","bg-yellow-500"][i]
            }`}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};


export default CastingLine;
