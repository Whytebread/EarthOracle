import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DiceRoller from "./DiceRoller";
import FigureCard from "./FigureCard";
import { geomanticFigures } from "../data/figures";

const CastingBoard = () => {
  const [mothers, setMothers] = useState([]);
  const [daughters, setDaughters] = useState([]);
  const [nieces, setNieces] = useState([]);
  const [witnesses, setWitnesses] = useState([]);
  const [judge, setJudge] = useState(null);

  // --- Dice roll callback for generating mothers ---
  const handleRollComplete = (pattern) => {
    // pattern is [0/1,0/1,0/1,0/1] top->bottom
    const figure = geomanticFigures.find((f) =>
      f.pattern.every((p, i) => p === pattern[i])
    );

    const newMother = {
      name: figure ? figure.name : `Unknown`,
      pattern,
    };

    setMothers((prev) => [...prev, newMother]);
  };

  // add binary figures line-by-line modulo 2
  const addFigures = (f1, f2) => f1.map((line, idx) => (Number(f1[idx]) + Number(f2[idx])) % 2);

  // --- Generate Daughters ---
  useEffect(() => {
    if (mothers.length === 4) {
      const daughterPatterns = [0, 1, 2, 3].map((lineIdx) =>
        mothers.map((mother) => mother.pattern[lineIdx])
      );

      const derived = daughterPatterns.map((pattern) => {
        const figure = geomanticFigures.find((f) =>
          f.pattern.every((p, i) => p === pattern[i])
        );
        return {
          name: figure ? figure.name : "Unknown",
          pattern,
        };
      });

      setDaughters(derived);
    }
  }, [mothers]);

  // --- Generate Nieces, Witnesses, Judge (map patterns to figure names) ---
  useEffect(() => {
    if (mothers.length === 4 && daughters.length === 4) {
      // Nieces: M1+M2, M3+M4, D1+D2, D3+D4
      const niecesGeneratedPatterns = [
        addFigures(mothers[0].pattern, mothers[1].pattern),
        addFigures(mothers[2].pattern, mothers[3].pattern),
        addFigures(daughters[0].pattern, daughters[1].pattern),
        addFigures(daughters[2].pattern, daughters[3].pattern),
      ];

      const niecesGenerated = niecesGeneratedPatterns.map((pattern) => {
        const fig = geomanticFigures.find((f) => f.pattern.every((p, i) => p === pattern[i]));
        return { name: fig ? fig.name : "Unknown", pattern };
      });
      setNieces(niecesGenerated);

      // Witnesses: N1+N2, N3+N4
      const witnessesGeneratedPatterns = [
        addFigures(niecesGenerated[0].pattern, niecesGenerated[1].pattern),
        addFigures(niecesGenerated[2].pattern, niecesGenerated[3].pattern),
      ];

      const witnessesGenerated = witnessesGeneratedPatterns.map((pattern) => {
        const fig = geomanticFigures.find((f) => f.pattern.every((p, i) => p === pattern[i]));
        return { name: fig ? fig.name : "Unknown", pattern };
      });
      setWitnesses(witnessesGenerated);

      // Judge: W1 + W2
      const judgePattern = addFigures(witnessesGenerated[0].pattern, witnessesGenerated[1].pattern);
      const judgeFig = geomanticFigures.find((f) => f.pattern.every((p, i) => p === judgePattern[i]));
      setJudge({ name: judgeFig ? judgeFig.name : "Unknown", pattern: judgePattern });
    }
  }, [mothers, daughters]);

  const isDisabled = mothers.length >= 4;

  // helper to make titles: "Mother 1", "Daughter 2", etc.
const renderRow = (figures, rowTitle, singularTitle) => {
  if (!figures || figures.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-amber-900 mt-6 mb-2 text-center">
        {rowTitle}
      </h2>

      {/* RTL grid so cards render right → left visually */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center"
        style={{ direction: "rtl" }}
      >
        {figures.map((figure, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            <FigureCard
              title={`${singularTitle} ${idx + 1}`}
              figure={figure}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Dice roller */}
      <DiceRoller onRollComplete={handleRollComplete} disabled={isDisabled} />

      {/* All rows */}
      <div className="w-full max-w-6xl mt-6">
        {renderRow(mothers, "Mothers", "Mother")}
        {renderRow(daughters, "Daughters", "Daughter")}
        {renderRow(nieces, "Nieces", "Niece")}
        {renderRow(witnesses, "Witnesses", "Witness")}
        {judge && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-bold text-amber-900 mb-2">Judge</h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <FigureCard title="Judge" figure={judge} />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CastingBoard;