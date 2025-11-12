import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DiceRoller from "./DiceRoller";
import FigureCard from "./FigureCard";
import { geomanticFigures } from "../data/figures";

const CastingBoard = () => {
  const [mothers, setMothers] = useState([]);
  const [daughters, setDaughters] = useState([]);

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

  // Generate Daughters once all 4 Mothers are present
  useEffect(() => {
    if (mothers.length === 4) {
      const daughterPatterns = [0, 1, 2, 3].map((lineIdx) =>
        mothers.map((mother) => mother.pattern[lineIdx])
      );

      const derived = daughterPatterns.map((pattern, idx) => {
        const figure = geomanticFigures.find((f) =>
          f.pattern.every((p, i) => p === pattern[i])
        );
        return {
          name: figure ? figure.name : `Unknown D${idx + 1}`,
          pattern,
        };
      });

      setDaughters(derived);
    }
  }, [mothers]);

  const isDisabled = mothers.length >= 4;

  return (
    <div className="flex flex-col items-center gap-10">
      <DiceRoller onRollComplete={handleRollComplete} disabled={isDisabled} />

      {/* Mothers */}
      {mothers.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-amber-900 mb-2 text-center">
            Mothers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mothers.map((mother, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <FigureCard title={`Mother ${idx + 1}`} figure={mother} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Daughters */}
      {daughters.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-amber-900 mt-6 mb-2 text-center">
            Daughters
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {daughters.map((daughter, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <FigureCard title={`Daughter ${idx + 1}`} figure={daughter} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CastingBoard;