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
    180, 210, 240, 270, 300, 330,
      0,  30,  60,  90, 120, 150
  ];

  const triangles = angles.map((deg, i) => {
    const rad = (deg * Math.PI) / 180;

    const tip = { x: cx + outerR * Math.cos(rad), y: cy + outerR * Math.sin(rad) };
    const base = { x: cx + innerR * Math.cos(rad), y: cy + innerR * Math.sin(rad) };

    const perp = rad + Math.PI / 2;
    const baseWidth = 56;
    const p1 = { x: base.x + baseWidth * Math.cos(perp), y: base.y + baseWidth * Math.sin(perp) };
    const p2 = { x: base.x - baseWidth * Math.cos(perp), y: base.y - baseWidth * Math.sin(perp) };

    const anchor = {
      x: base.x * 0.72 + tip.x * 0.28,
      y: base.y * 0.72 + tip.y * 0.28,
    };

    return { anchor, house: i + 1 };
  });

  const cardW = 132;
  const cardH = 178;

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      {triangles.map((t, i) => {
        const fig = figures[i];
        if (!fig) return null;

        const left = t.anchor.x - cardW / 2;
        const top = t.anchor.y - cardH / 2;

        return (
          <motion.div
            key={i}
            layoutId={getLayoutId(i)}
            layout
            style={{
              position: "absolute",
              left,
              top,
              width: cardW,
              height: cardH,
            }}
            className="drop-shadow-2xl"
          >
            <div className="text-center font-bold text-amber-800 text-sm mb-1">
              House {t.house}
            </div>
            <FigureCard title="" figure={fig} />
          </motion.div>
        );
      })}
    </div>
  );
}
