
import React, { useState } from "react";
import { motion } from "framer-motion";

const diceColors = [
  { element: "Fire", color: "bg-red-500" },
  { element: "Air", color: "bg-yellow-400" },
  { element: "Water", color: "bg-blue-500" },
  { element: "Earth", color: "bg-green-600" },
];

const DiceRoller = ({ onRollComplete, disabled }) => {
  const [rolling, setRolling] = useState(false);
  const [results, setResults] = useState([null, null, null, null]);

  const rollDice = () => {
    if (disabled) return;
    setRolling(true);
    const newResults = diceColors.map(() => Math.ceil(Math.random() * 6));
    setTimeout(() => {
      setResults(newResults);
      setRolling(false);
      const line = newResults.map((num) => (num % 2 === 0 ? 0 : 1));
      onRollComplete(line);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-6">
        {diceColors.map((die, i) => (
          <motion.div
            key={i}
            animate={rolling ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.6 }}
            className={`w-16 h-16 rounded-xl ${die.color} flex flex-col items-center justify-center text-white text-2xl font-bold shadow-lg`}
          >
            <span>{results[i] || "-"}</span>
            <span className="text-xs mt-1">{die.element}</span>
          </motion.div>
        ))}
      </div>

      <button
        disabled={rolling || disabled}
        onClick={rollDice}
        className={`mt-6 px-6 py-2 rounded-xl text-amber-100 transition
          ${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-amber-700 hover:bg-amber-800"}`}
      >
        {rolling ? "Casting..." : "Cast Dice"}
      </button>
    </div>
  );
};

export default DiceRoller;
