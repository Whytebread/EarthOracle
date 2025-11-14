import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DiceRoller from "./DiceRoller";
import FigureCard from "./FigureCard";
import { geomanticFigures } from "../data/figures";

const CastingBoard = () => {
  const [mothers, setMothers] = useState([]);
  const [daughters, setDaughters] = useState([]);
  const [nieces, setNieces] = useState([]);
  const [witnesses, setWitnesses] = useState([]);
  const [judge, setJudge] = useState(null);

  /* ----------------- DICE ROLL → GENERATE MOTHERS ----------------- */

  const handleRollComplete = (pattern) => {
    const figure = geomanticFigures.find((f) =>
      f.pattern.every((p, i) => p === pattern[i])
    );

    const newMother = {
      name: figure ? figure.name : "Unknown",
      pattern,
    };

    setMothers((prev) => [...prev, newMother]);
  };

  const addFigures = (f1, f2) =>
    f1.map((line, idx) => (Number(f1[idx]) + Number(f2[idx])) % 2);

  /* ----------------------- GENERATE DAUGHTERS ----------------------- */

  useEffect(() => {
    if (mothers.length === 4) {
      const daughterPatterns = [0, 1, 2, 3].map((lineIdx) =>
        mothers.map((m) => m.pattern[lineIdx])
      );

      const derived = daughterPatterns.map((pattern) => {
        const f = geomanticFigures.find((g) =>
          g.pattern.every((p, i) => p === pattern[i])
        );
        return { name: f ? f.name : "Unknown", pattern };
      });

      setDaughters(derived);
    }
  }, [mothers]);

  /* ----------- GENERATE NIECES → WITNESSES → JUDGE ---------------- */

  useEffect(() => {
    if (mothers.length !== 4 || daughters.length !== 4) return;

    // Nieces
    const niecePatterns = [
      addFigures(mothers[0].pattern, mothers[1].pattern),
      addFigures(mothers[2].pattern, mothers[3].pattern),
      addFigures(daughters[0].pattern, daughters[1].pattern),
      addFigures(daughters[2].pattern, daughters[3].pattern),
    ];

    const niecesGen = niecePatterns.map((p) => {
      const f = geomanticFigures.find((g) => g.pattern.every((x, i) => x === p[i]));
      return { name: f ? f.name : "Unknown", pattern: p };
    });

    setNieces(niecesGen);

    // Witnesses
    const witnessPatterns = [
      addFigures(niecesGen[0].pattern, niecesGen[1].pattern),
      addFigures(niecesGen[2].pattern, niecesGen[3].pattern),
    ];

    const witnessesGen = witnessPatterns.map((p) => {
      const f = geomanticFigures.find((g) => g.pattern.every((x, i) => x === p[i]));
      return { name: f ? f.name : "Unknown", pattern: p };
    });

    setWitnesses(witnessesGen);

    // Judge
    const judgePattern = addFigures(witnessesGen[0].pattern, witnessesGen[1].pattern);
    const judgeFig = geomanticFigures.find((g) =>
      g.pattern.every((p, i) => p === judgePattern[i])
    );

    setJudge({
      name: judgeFig ? judgeFig.name : "Unknown",
      pattern: judgePattern,
    });
  }, [mothers, daughters]);

  const isDisabled = mothers.length >= 4;

  /* ----------------------- CARD ANIMATION ----------------------- */

  const renderFigure = (figure, title, idx) => (
    <motion.div
      key={title + idx}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: idx * 0.12 }}
    >
      <FigureCard title={title} figure={figure} />
    </motion.div>
  );

  /* ----------------------- TOP ROW (4 mothers, 4 daughters) ----------------------- */

  const renderTopRow = () => {
    if (mothers.length < 4) return null;
    if (daughters.length < 4) return null;

    const combined = [...mothers, ...daughters]; // M1-4 then D1-4

    return (
      <div className="w-full mb-8">
        <div className="grid grid-cols-8 gap-4 justify-items-center" style={{ direction: "rtl" }}>
          {combined.map((fig, idx) => {
            const title =
              idx < 4 ? `Mother ${idx + 1}` : `Daughter ${idx - 3}`;
            return renderFigure(fig, title, idx);
          })}
        </div>
      </div>
    );
  };

  /* ----------------------- SECOND ROW (4 nieces) ----------------------- */

  const renderNieces = () => {
    if (nieces.length < 4) return null;

    return (
      <div className="w-full mb-10">
        <div className="grid grid-cols-4 gap-6 justify-items-center" style={{ direction: "rtl" }}>
          {nieces.map((fig, idx) => renderFigure(fig, `Niece ${idx + 1}`, idx))}
        </div>
      </div>
    );
  };

  /* ----------------------- THIRD ROW (2 witnesses) ----------------------- */

  const renderWitnesses = () => {
    if (witnesses.length < 2) return null;

    return (
      <div className="w-full mb-10">
        <div className="grid grid-cols-2 gap-10 justify-items-center" style={{ direction: "rtl" }}>
          {witnesses.map((fig, idx) =>
            renderFigure(fig, `Witness ${idx + 1}`, idx)
          )}
        </div>
      </div>
    );
  };

  /* ----------------------- JUDGE ----------------------- */

  const renderJudge = () => {
    if (!judge) return null;

    return (
      <div className="w-full flex justify-center mt-4">
        {renderFigure(judge, "Judge", 0)}
      </div>
    );
  };

  /* ----------------------- RENDER ----------------------- */

  return (
    <div className="w-full max-w-6xl mx-auto p-4">

      {/* DICE + ROLL BUTTON */}
      <DiceRoller onRollComplete={handleRollComplete} disabled={isDisabled} />

      {/* SHIELD ROWS */}
      {renderTopRow()}
      {renderNieces()}
      {renderWitnesses()}
      {renderJudge()}
    </div>
  );
};

export default CastingBoard;
