import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DiceRoller from "./DiceRoller";
import FigureCard from "./FigureCard";
import { geomanticFigures } from "../data/figures";
import HouseChart from "./HouseChart";
import HouseChartFrame from "./HouseChartFrame";
import ShieldChartFrame from "./ShieldChartFrame";
import { shieldSlots } from "./ShieldSlots";

/* --- SHARED LAYOUT CONSTANTS --- */
const CARD_W = 160;              // base card width
const GAP = 8;
const ROW_W = 8 * CARD_W + 7 * GAP; // exactly 8 card-widths

export default function CastingBoard() {
  const [mothers, setMothers] = useState([]);
  const [daughters, setDaughters] = useState([]);
  const [nieces, setNieces] = useState([]);
  const [witnesses, setWitnesses] = useState([]);
  const [judge, setJudge] = useState(null);

  /* ------------------------------ */
  /*       ADD A MOTHER FROM DICE   */
  /* ------------------------------ */
  const handleRoll = (pattern) => {
    const fig = geomanticFigures.find((f) =>
      f.pattern.every((v, i) => v === pattern[i])
    );
    setMothers((prev) => [
      ...prev,
      { name: fig ? fig.name : "Unknown", pattern },
    ]);
  };

  const xor = (a, b) => a.map((v, i) => (v + b[i]) % 2);

  /* ------------------------------ */
  /*         DERIVE DAUGHTERS       */
  /* ------------------------------ */
  useEffect(() => {
    if (mothers.length !== 4) return;

    const derived = [0, 1, 2, 3].map((row) => {
      const pattern = mothers.map((m) => m.pattern[row]);
      const fig = geomanticFigures.find((g) =>
        g.pattern.every((v, i) => v === pattern[i])
      );
      return { name: fig ? fig.name : "Unknown", pattern };
    });

    setDaughters(derived);
  }, [mothers]);

  /* ------------------------------ */
  /*       NIECES / WITNESS / JUDGE */
  /* ------------------------------ */
  useEffect(() => {
    if (mothers.length !== 4 || daughters.length !== 4) return;

    const nieceP = [
      xor(mothers[0].pattern, mothers[1].pattern),
      xor(mothers[2].pattern, mothers[3].pattern),
      xor(daughters[0].pattern, daughters[1].pattern),
      xor(daughters[2].pattern, daughters[3].pattern),
    ];

    const niecesGen = nieceP.map((p) => {
      const f = geomanticFigures.find((g) =>
        g.pattern.every((v, i) => v === p[i])
      );
      return { name: f ? f.name : "Unknown", pattern: p };
    });

    setNieces(niecesGen);

    const witnessP = [
      xor(niecesGen[0].pattern, niecesGen[1].pattern), // Right
      xor(niecesGen[2].pattern, niecesGen[3].pattern), // Left
    ];

    const witnessesGen = witnessP.map((p) => {
      const f = geomanticFigures.find((g) =>
        g.pattern.every((v, i) => v === p[i])
      );
      return { name: f ? f.name : "Unknown", pattern: p };
    });

    setWitnesses(witnessesGen);

    const jPattern = xor(witnessesGen[0].pattern, witnessesGen[1].pattern);
    const jFig = geomanticFigures.find((g) =>
      g.pattern.every((v, i) => v === jPattern[i])
    );
    setJudge({ name: jFig ? jFig.name : "Unknown", pattern: jPattern });
  }, [mothers, daughters]);

  const disabled = mothers.length >= 4;

  /* ------------------------------ */
  /*       REUSABLE CARD WRAPPER    */
  /* ------------------------------ */
  const Card = ({ fig, title, idx, width }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: idx * 0.07 }}
      style={{ width }}
      className="flex flex-col items-center"
    >
      <FigureCard title={title} figure={fig} />
    </motion.div>
  );


  const SHIELD_WIDTH = 1100;

  const Row = ({ children }) => (
    <div
      className="mx-auto mt-6"
      style={{ width: SHIELD_WIDTH }}
    >
      {children}
    </div>
  );

  /* ---------- TOP ROW: 8 COLUMNS ---------- */
  const TopRow = () => {
    const items =
      mothers.length === 4 && daughters.length === 4
        ? [...mothers, ...daughters]
        : mothers;

    return (
      <Row>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${items.length}, 1fr)`,
            direction: "rtl",
          }}
        >
          {items.map((fig, i) => {
            const label = i < 4 ? `Mother ${i + 1}` : `Daughter ${i - 3}`;
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="w-full"
              >
                <FigureCard title={label} figure={fig} />
              </motion.div>
            );
          })}
        </div>
      </Row>
    );
  };

  /* ---------- NIECES ROW: 4 BIGGER CARDS ---------- */
  const NiecesRow = () => {
    if (nieces.length < 4) return null;

    return (
      <Row>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            direction: "rtl",
          }}
        >
          {nieces.map((fig, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="w-full"
            >
              <FigureCard title={`Niece ${i + 1}`} figure={fig} />
            </motion.div>
          ))}
        </div>
      </Row>
    );
  };

  /* ---------- COURT ROW: 3 COLUMNS ---------- */
  const CourtRow = () => {
    if (!judge || witnesses.length < 2) return null;

    return (
      <Row>
        <div className="grid grid-cols-3 gap-2 mx-auto">
          <Card fig={witnesses[1]} title="Left Witness" idx={0} />
          <Card fig={judge} title="Judge" idx={1} />
          <Card fig={witnesses[0]} title="Right Witness" idx={2} />
        </div>
      </Row>
    );
  };

  /*---------- HOUSE CHART --------------*/
  const houseFigures =
    mothers.length === 4 && daughters.length === 4 && nieces.length === 4
      ? [...mothers, ...daughters, ...nieces] // total = 12
      : [];

  shieldSlots.top.map(slot => (
    <FigureCard
      key={slot.id}
      figure={data[slot.id]}
      x={slot.x}
      y={slot.y}
    />
  ));

  /* ------------------------------ */
  /*           MAIN RENDER          */
  /* ------------------------------ */
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Dice / lines remaining */}
        <DiceRoller onRollComplete={handleRoll} disabled={disabled} />

        <TopRow />
        <NiecesRow />
        <CourtRow />

        <ShieldChartFrame />
        {/* TEMP: house chart frame only */}
        <div className="mt-20 flex justify-center">
          <HouseChartFrame size={600} />
        </div>

      </div>
    </div>
  );
}
