import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        <AnimatePresence>
          {mothers.map((mother, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95, boxShadow: "0 0 20px rgba(251, 191, 36, 0.6)" }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                boxShadow: ["0 0 25px rgba(251,191,36,0.6)", "0 0 0 rgba(251,191,36,0)"],
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                boxShadow: { duration: 1.5, ease: "easeInOut" },
              }}
            >
              <FigureCard title={`Mother ${idx + 1}`} figure={mother} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CastingBoard;