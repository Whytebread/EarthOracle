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

// Scaling for cards
const CARD_RATIO = 0.75; // width / height ratio of FigureCard

const CARD_SCALE_BY_TYPE = {
  mother: 0.85,
  daughter: 0.85,
  niece: 1.0,
  witness: 0.9,
  judge: 1.05,
};

const OPTICAL_OFFSETS = {
  witness: { x: 0, y: -6 },
  judge: { x: 0, y: -14 },
};



export default function CastingBoard() {
  const [mothers, setMothers] = useState([]);
  const [daughters, setDaughters] = useState([]);
  const [nieces, setNieces] = useState([]);
  const [witnesses, setWitnesses] = useState([]);
  const [judge, setJudge] = useState(null);
  const [stagedFigures, setStagedFigures] = useState([]);
  const [placedFigures, setPlacedFigures] = useState([]);

  /* ------------------------------ */
  /*       ADD A MOTHER FROM DICE   */
  /* ------------------------------ */
  const handleRoll = (pattern) => {
    const fig = geomanticFigures.find((f) =>
      f.pattern.every((v, i) => v === pattern[i])
    );

    if (!fig) return;

    const index = mothers.length;

    const mother = {
      name: fig.name,
      pattern,
    };

    setMothers((prev) => [...prev, mother]);

    setStagedFigures((prev) => [
      ...prev,
      {
        id: `mother-${index}`,
        figure: mother,
        title: `Mother ${index + 1}`,
        layoutIndex: index,
      },
    ]);

    setPlacedFigures((prev) => [
      ...prev,
      {
        id: `mother-${index}`,
        figure: mother,
        title: `Mother ${index + 1}`,
        layoutIndex: index,
        ...shieldSlots[index],
      },
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
  const Card = ({ fig, title, idx, width, layoutId }) => (
    <motion.div
      layoutId={layoutId}
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

  // cascade daughter cards
  useEffect(() => {
    if (mothers.length !== 4) return;

    daughters.forEach((fig, i) => {
      setTimeout(() => {
        const index = i + 4;

        setStagedFigures((prev) => [
          ...prev,
          {
            id: `daughter-${i}`,
            figure: fig,
            title: `Daughter ${i + 1}`,
            layoutIndex: index,
          },
        ]);

        setPlacedFigures((prev) => [
          ...prev,
          {
            id: `daughter-${i}`,
            figure: fig,
            title: `Daughter ${i + 1}`,
            layoutIndex: index,
            ...shieldSlots[index],
          },
        ]);
      }, i * 300);
    });
  }, [daughters]);

  // Cascade nieces
  // cascade nieces
  useEffect(() => {
    if (nieces.length !== 4) return;

    nieces.forEach((fig, i) => {
      setTimeout(() => {
        const index = i + 8;

        setStagedFigures((prev) => [
          ...prev,
          {
            id: `niece-${i}`,
            figure: fig,
            title: `Niece ${i + 1}`,
            layoutIndex: index,
          },
        ]);

        setPlacedFigures((prev) => [
          ...prev,
          {
            id: `niece-${i}`,
            figure: fig,
            title: `Niece ${i + 1}`,
            layoutIndex: index,
            ...shieldSlots[index],
          },
        ]);
      }, i * 300);
    });
  }, [nieces]);

  // cascade witnesses
  useEffect(() => {
    if (witnesses.length !== 2) return;

    witnesses.forEach((fig, i) => {
      const index = i === 0 ? 13 : 12; // right, then left

      setTimeout(() => {
        setStagedFigures((prev) => [
          ...prev,
          {
            id: `witness-${i}`,
            figure: fig,
            title: i === 0 ? "Right Witness" : "Left Witness",
            layoutIndex: index,
          },
        ]);

        setPlacedFigures((prev) => [
          ...prev,
          {
            id: `witness-${i}`,
            figure: fig,
            title: i === 0 ? "Right Witness" : "Left Witness",
            layoutIndex: index,
            ...shieldSlots[index],
          },
        ]);
      }, i * 300);
    });
  }, [witnesses]);

  // cascade judge
  useEffect(() => {
    if (!judge) return;

    const index = 14;

    setTimeout(() => {
      setStagedFigures((prev) => [
        ...prev,
        {
          id: "judge",
          figure: judge,
          title: "Judge",
          layoutIndex: index,
        },
      ]);

      setPlacedFigures((prev) => [
        ...prev,
        {
          id: "judge",
          figure: judge,
          title: "Judge",
          layoutIndex: index,
          ...shieldSlots[index],
        },
      ]);
    }, 400);
  }, [judge]);




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
            const layoutIndex = i < 4 ? i : i + 4;

            return (
              <motion.div
                key={label}
                layoutId={getLayoutId(layoutIndex)}
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
              layoutId={getLayoutId(i + 8)}
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
          <Card
            fig={witnesses[1]}
            title="Left Witness"
            idx={0}
            layoutId={getLayoutId(12)}
          />

          <Card
            fig={judge}
            title="Judge"
            idx={1}
            layoutId={getLayoutId(14)}
          />

          <Card
            fig={witnesses[0]}
            title="Right Witness"
            idx={2}
            layoutId={getLayoutId(13)}
          />
        </div>
      </Row>
    );
  };

  /*---------- HOUSE CHART --------------*/
  const houseFigures =
    mothers.length === 4 && daughters.length === 4 && nieces.length === 4
      ? [...mothers, ...daughters, ...nieces] // total = 12
      : [];


  const shieldFigures =
    mothers.length === 4 &&
      daughters.length === 4 &&
      nieces.length === 4 &&
      witnesses.length === 2 &&
      judge
      ? [
        ...mothers,      // 0–3
        ...daughters,    // 4–7
        ...nieces,       // 8–11
        witnesses[1],    // 12 → Left Witness
        witnesses[0],    // 13 → Right Witness
        judge,           // 14
      ]
      : [];

  const getLayoutId = (index) => `geomantic-figure-${index}`;

  const mothersComplete = mothers.length === 4;

  // shows house chart after the shield chart has been completed
  const shieldComplete =
    mothers.length === 4 &&
    daughters.length === 4 &&
    nieces.length === 4 &&
    witnesses.length === 2 &&
    judge;

  const [showHouseChart, setShowHouseChart] = useState(false);

  useEffect(() => {
    if (!shieldComplete) return;

    const t = setTimeout(() => {
      setShowHouseChart(true);
    }, 600);

    return () => clearTimeout(t);
  }, [shieldComplete]);

  // Capitalizes the title of the figure cards 
  const formatShieldTitle = (slot) => {
    switch (slot.type) {
      case "mother":
        return `Mother ${slot.order + 1}`;
      case "daughter":
        return `Daughter ${slot.order - 3}`;
      case "niece":
        return `Niece ${slot.order - 7}`;
      case "witness":
        return slot.id === "witness-left"
          ? "Left Witness"
          : "Right Witness";
      case "judge":
        return "Judge";
      default:
        return "";
    }
  };


  /* ------------------------------ */
  /*           MAIN RENDER          */
  /* ------------------------------ */
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Dice / lines remaining */}
        <DiceRoller onRollComplete={handleRoll} disabled={disabled} />

        {/* <TopRow />
        <NiecesRow />
        <CourtRow /> */}

        {/* CHART PANEL */}
        <div className="
    mt-10
    rounded-2xl
    bg-amber-50/70
    shadow-lg
    p-10
  ">

          {/* SHIELD CHART */}
          <div className="relative mx-auto" style={{ width: 900, height: 700 }}>
            <ShieldChartFrame />

            {/* ---------- STAGING AREA (INVISIBLE) ---------- */}
            <div
              className="absolute -top-[500px] left-0 right-0 flex justify-center gap-4 pointer-events-none"
            >
              {stagedFigures.map((fig, i) => (
                <motion.div
                  key={fig.id}
                  layoutId={getLayoutId(fig.layoutIndex)}
                >
                  <FigureCard figure={fig.figure} title={fig.title} />
                </motion.div>
              ))}
            </div>

            {/* ---------- SHIELD CARDS ---------- */}
            {placedFigures.map((placed) => (
              <motion.div
                key={placed.id}
                layoutId={getLayoutId(placed.layoutIndex)}
                layout
                style={{
                  position: "absolute",
                  left: placed.x,
                  top: placed.y,
                  width: placed.width,
                  height: placed.height,
                }}
              >
                <FigureCard
                  title={placed.title}
                  figure={placed.figure}
                />
              </motion.div>
            ))}
          </div>

          {showHouseChart && (
            <div
              className="relative mx-auto mt-20"
              style={{ width: 900, height: 900 }}
            >
              <HouseChartFrame size={600}>
                <HouseChart figures={houseFigures} />
              </HouseChartFrame>

            </div>
          )}

        </div>

      </div>
    </div>

  );
}
