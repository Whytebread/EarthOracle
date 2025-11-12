import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DiceRoller from "./DiceRoller";
import FigureCard from "./FigureCard";
import { geomanticFigures } from "../data/figures";

const CastingBoard = () => {
  // --- State for each generation ---
  const [mothers, setMothers] = useState([]);
  const [daughters, setDaughters] = useState([]);
  const [nieces, setNieces] = useState([]);
  const [witnesses, setWitnesses] = useState([]);
  const [judge, setJudge] = useState(null);

  // --- Dice roll callback for generating mothers ---
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

  const addFigures = (f1, f2) => f1.map((line, idx) => (f1[idx] + f2[idx]) % 2);

  // --- Generate Daughters ---
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

  // --- Generate Nieces, Witnesses, Judge ---
  useEffect(() => {
    if (mothers.length === 4 && daughters.length === 4) {
      // Nieces
      const niecesGenerated = [
        { name: "Niece 1", pattern: addFigures(mothers[0].pattern, mothers[1].pattern) },
        { name: "Niece 2", pattern: addFigures(mothers[2].pattern, mothers[3].pattern) },
        { name: "Niece 3", pattern: addFigures(daughters[0].pattern, daughters[1].pattern) },
        { name: "Niece 4", pattern: addFigures(daughters[2].pattern, daughters[3].pattern) },
      ];

      setNieces(niecesGenerated);

      // Witnesses
      const witnessesGenerated = [
        { name: "Witness 1", pattern: addFigures(niecesGenerated[0].pattern, niecesGenerated[1].pattern) },
        { name: "Witness 2", pattern: addFigures(niecesGenerated[2].pattern, niecesGenerated[3].pattern) },
      ];

      setWitnesses(witnessesGenerated);

      // Judge
      setJudge({
        name: "Judge",
        pattern: addFigures(witnessesGenerated[0].pattern, witnessesGenerated[1].pattern),
      });
    }
  }, [mothers, daughters]);

  const isDisabled = mothers.length >= 4;

  // --- Helper to render a generation ---
  const renderGeneration = (title, figures) => (
    figures && figures.length > 0 && (
      <div>
        <h2 className="text-xl font-bold text-amber-900 mt-6 mb-2 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
          {figures.map((figure, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <FigureCard title={`${title} ${idx + 1}`} figure={figure} />
            </motion.div>
          ))}
        </div>
      </div>
    )
  );

  return (
    <div className="flex flex-col items-center gap-10">
      <DiceRoller onRollComplete={handleRollComplete} disabled={isDisabled} />

      {/* Mothers */}
      {renderGeneration("Mother", mothers)}

      {/* Daughters */}
      {renderGeneration("Daughter", daughters)}

      {/* Nieces */}
      {renderGeneration("Niece", nieces)}

      {/* Witnesses */}
      {renderGeneration("Witness", witnesses)}

      {/* Judge */}
      {judge && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-amber-900 mb-2 text-center">Judge</h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FigureCard title="Judge" figure={judge} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CastingBoard;