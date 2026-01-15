import React from "react";
import { motion } from "framer-motion";
import FigureCard from "./FigureCard";

export const HOUSE_ANCHORS = [
  { x: 0.75, y: 0.92 },
  { x: 0.50, y: 0.90 },
  { x: 0.25, y: 0.92 },

  { x: 0.12, y: 0.65 },
  { x: 0.10, y: 0.50 },
  { x: 0.12, y: 0.35 },

  { x: 0.25, y: 0.08 },
  { x: 0.50, y: 0.06 },
  { x: 0.75, y: 0.08 },

  { x: 0.88, y: 0.35 },
  { x: 0.90, y: 0.50 },
  { x: 0.88, y: 0.65 },
];

export default function HouseChart({ figures = [], size = 600 }) {
  if (figures.length < 12) return null;

  const cardScale = 0.65;
  const cardW = 110 * cardScale;
  const cardH = 150 * cardScale;

  return (
    <>
{figures.map((item, i) => {
  if (!item?.figure) return null; // safety guard

  const anchor = HOUSE_ANCHORS[i];
  const left = anchor.x * size - cardW / 2;
  const top = anchor.y * size - cardH / 2;

  return (
    <motion.div
      key={`house-${item.id}`}
      layoutId={`house-${item.id}`} // duplicate, not move
      style={{
        position: "absolute",
        left,
        top,
        width: cardW,
        height: cardH,
      }}
    >
      <FigureCard
        figure={item.figure}
        title={item.title}
      />
    </motion.div>
  );
})}

    </>
  );
}
