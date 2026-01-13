import React from "react";
import { motion } from "framer-motion";
import FigureCard from "./FigureCard";

export default function HouseChart({ figures = [], getLayoutId }) {
  if (figures.length < 12) {
    return (
      <div className="text-center py-16 text-amber-700 text-xl font-medium">
        Waiting for full shield chart…
      </div>
    );
  }

  const size = 720;
  const cx = size / 2;
  const cy = size / 2;

  const squareSide = size * 0.28;
  const half = squareSide / 2;

  const innerR = half + 20;
  const outerR = size * 0.45;

  // House 1 = middle left, counter-clockwise
  const angles = [
    180, // House 1 (middle left)
    150, // House 2
    120, // House 3
    90, // House 4 (top middle)
    60, // House 5
    30, // House 6
    0, // House 7 (right middle)
    330, // House 8
    300, // House 9
    270, // House 10 (bottom middle)
    240, // House 11
    210  // House 12 (upper left-ish)
  ];

  const houseSlots = angles.map((deg, i) => {
    const rad = (deg * Math.PI) / 180;

    const tip = { x: cx + outerR * Math.cos(rad), y: cy + outerR * Math.sin(rad) };
    const base = { x: cx + innerR * Math.cos(rad), y: cy + innerR * Math.sin(rad) };

    const perp = rad + Math.PI / 2;
    const baseWidth = 56;
    const p1 = { x: base.x + baseWidth * Math.cos(perp), y: base.y + baseWidth * Math.sin(perp) };
    const p2 = { x: base.x - baseWidth * Math.cos(perp), y: base.y - baseWidth * Math.sin(perp) };

    const anchor = {
      x: base.x * 0.6 + tip.x * 0.4,
      y: base.y * 0.6 + tip.y * 0.4,
    };

    return {
      house: i + 1,
      tip,
      base,
      p1,
      p2,
      anchor,
    };
  });


  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      {houseSlots.map((t, i) => {
        const fig = figures[i];
        if (!fig || !t.tip || !t.base) return null;

        const depth = Math.hypot(
          t.tip.x - t.base.x,
          t.tip.y - t.base.y
        );

        const cardH = depth * 0.65;
        const cardW = cardH * 0.74;

        const left = t.anchor.x - cardW / 2;
        const top = t.anchor.y - cardH / 2;

        return (
          <motion.div
            key={`house-${i}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            style={{
              position: "absolute",
              left: t.anchor.x - cardW / 2,
              top: t.anchor.y - cardH / 2,
              width: cardW,
              height: cardH,
            }}
            className="drop-shadow-2xl"
          >
            <div className="text-center font-bold text-amber-800 text-sm mb-1">
              House {t.house}
            </div>
            <FigureCard figure={fig} title="" />
          </motion.div>
        );
      })}
    </div>
  );
}
