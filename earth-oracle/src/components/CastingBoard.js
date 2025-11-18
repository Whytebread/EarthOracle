import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DiceRoller from "./DiceRoller";
import FigureCard from "./FigureCard";
import { geomanticFigures } from "../data/figures";

const CARD_W = 160;               // FigureCard width
const GAP = 8;                    // gap-2 = 0.5rem = 8px
const ROW_W = 8 * CARD_W + 7 * GAP; // full shield width (8 cards)

const CastingBoard = () => {
  const [mothers, setMothers] = useState([]);
  const [daughters, setDaughters] = useState([]);
  const [nieces, setNieces] = useState([]);
  const [witnesses, setWitnesses] = useState([]);
  const [judge, setJudge] = useState(null);

  /* ---------- DICE → MOTHER ---------- */
  const handleRoll = (line) => {
    const fig = geomanticFigures.find((f) =>
      f.pattern.every((v, i) => v === line[i])
    );
    setMothers((prev) => [
      ...prev,
      { name: fig ? fig.name : "??", pattern: line },
    ]);
  };

  const xor = (a, b) => a.map((v, i) => (v + b[i]) % 2);

  /* ---------- DERIVE EVERYTHING ---------- */
  useEffect(() => {
    if (mothers.length !== 4) return;
    const dPatterns = [0, 1, 2, 3].map((row) =>
      mothers.map((m) => m.pattern[row])
    );
    const derived = dPatterns.map((p) => {
      const f = geomanticFigures.find((g) =>
        g.pattern.every((v, i) => v === p[i])
      );
      return { name: f ? f.name : "??", pattern: p };
    });
    setDaughters(derived);
  }, [mothers]);

  useEffect(() => {
    if (mothers.length !== 4 || daughters.length !== 4) return;

    const n = [
      xor(mothers[0].pattern, mothers[1].pattern),
      xor(mothers[2].pattern, mothers[3].pattern),
      xor(daughters[0].pattern, daughters[1].pattern),
      xor(daughters[2].pattern, daughters[3].pattern),
    ];
    const niecesGen = n.map((p) => {
      const f = geomanticFigures.find((g) =>
        g.pattern.every((v, i) => v === p[i])
      );
      return { name: f ? f.name : "??", pattern: p };
    });
    setNieces(niecesGen);

    const w = [
      xor(niecesGen[0].pattern, niecesGen[1].pattern), // Right
      xor(niecesGen[2].pattern, niecesGen[3].pattern), // Left
    ];
    const witnessesGen = w.map((p) => {
      const f = geomanticFigures.find((g) =>
        g.pattern.every((v, i) => v === p[i])
      );
      return { name: f ? f.name : "??", pattern: p };
    });
    setWitnesses(witnessesGen);

    const j = xor(witnessesGen[0].pattern, witnessesGen[1].pattern);
    const judgeFig = geomanticFigures.find((g) =>
      g.pattern.every((v, i) => v === j[i])
    );
    setJudge({ name: judgeFig ? judgeFig.name : "??", pattern: j });
  }, [mothers, daughters]);

  const disabled = mothers.length >= 4;

  /* ---------- REUSABLE CARD ---------- */
const Card = ({ fig, title, idx, scale = 1 }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: idx * 0.07 }}
    className="flex justify-center"
  >
    <FigureCard title={title} figure={fig} scale={scale} />
  </motion.div>
);
  /* ---------- TOP ROW (mothers → mothers+daughters) ---------- */
  const TopRow = () => {
    const isFull = mothers.length === 4 && daughters.length === 4;
    const items = isFull
      ? [...mothers, ...daughters]
      : mothers; // only show what exists

    const cols = isFull ? 8 : mothers.length || 1; // 1 prevents empty grid

    return (
      <motion.div
        layout
        className="w-full"
        style={{ maxWidth: ROW_W }}
      >
        <div
          className={`grid gap-2 justify-center mx-auto`}
          style={{
            direction: "rtl",
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {items.map((fig, i) => {
            const label = i < 4 ? `Mother ${i + 1}` : `Daughter ${i - 3}`;
            return <Card key={i} fig={fig} title={label} idx={i} />;
          })}
        </div>
      </motion.div>
    );
  };

  /* ---------- NIECES ROW ---------- */
const NiecesRow = () => {
  if (nieces.length < 4) return null;

  return (
    <div className="w-full mt-0" style={{ maxWidth: ROW_W }}>
      <div
        className="grid gap-2 justify-center mx-auto"
        style={{
          direction: "rtl",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        }}
      >
        {nieces.map((fig, i) => (
          <Card
            key={i}
            fig={fig}
            title={`Niece ${i + 1}`}
            idx={i}
            scale={2}   
          />
        ))}
      </div>
    </div>
  );
};
  /* ---------- COURT ROW ---------- */
const CourtRow = () => {
  if (!judge || witnesses.length < 2) return null;

  return (
    <div className="w-full mt-0" style={{ maxWidth: ROW_W }}>
      <div
        className="grid gap-2 justify-center mx-auto"
        style={{
          direction: "rtl",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        }}
      >
        <Card fig={witnesses[1]} title="Left Witness" idx={0} />
        <Card fig={judge} title="Judge" idx={1} />
        <Card fig={witnesses[0]} title="Right Witness" idx={2} />
      </div>
    </div>
  );
};

  /* ---------- MAIN RENDER ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-6">
      <div className="max-w-7xl mx-auto space-y-0">
        <DiceRoller onRollComplete={handleRoll} disabled={disabled} />

        <TopRow />
        <NiecesRow />
        <CourtRow />
      </div>
    </div>
  );
};

export default CastingBoard;