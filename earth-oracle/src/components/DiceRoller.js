import React, { useState } from "react";
import { motion } from "framer-motion";

const diceColors = [
  { element: "Fire", color: "bg-red-500" },
  { element: "Air", color: "bg-yellow-400" },
  { element: "Water", color: "bg-blue-500" },
  { element: "Earth", color: "bg-green-600" },
];

const DiceRoller = ({ onRollComplete }) => {
  const [rolling, setRolling] = useState(false);
  const [results, setResults] = useState([null, null, null, null]);

  const rollDice = () => {
    setRolling(true);
    const newResults = diceColors.map(() => Math.ceil(Math.random() * 6));
    setTimeout(() => {
      setResults(newResults);
      setRolling(false);
      // Convert to binary line (odd=1, even=0)
      const line = newResults.map((num) => (num % 2 === 0 ? 0 : 1));
      onRollComplete(line);
    }, 1200); // fake roll duration
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-6">
        {results.map((num, i) => (
          <motion.div
            key={i}
            animate={rolling ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.6 }}
            className={`w-16 h-16 rounded-xl ${diceColors[i].color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
          >
            {num || "-"}
          </motion.div>
        ))}
      </div>

      <button
        disabled={rolling}
        onClick={rollDice}
        className="mt-6 bg-amber-700 text-amber-100 px-6 py-2 rounded-xl hover:bg-amber-800 transition"
      >
        {rolling ? "Casting..." : "Cast Dice"}
      </button>
    </div>
  );
};

export default DiceRoller;
