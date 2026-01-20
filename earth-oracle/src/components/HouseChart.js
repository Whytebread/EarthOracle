import React from "react";
import { motion } from "framer-motion";
import FigureCard from "./FigureCard";
import { getHouseAnchors } from "./HouseSlots";
import { getHouseSlots } from "./HouseSlots";

export default function HouseChart({ figures = [], size = 840 }) {
  if (figures.length < 12) return null;

  const slots = getHouseSlots(size);

  return (
    <>
      {slots.map((slot, i) => {
        const item = figures[i];
        if (!item?.figure) return null;

        return (
          <motion.div
            key={slot.house}
            layoutId={`house-${item.id}`} // duplicate, not move
            style={{
              position: "absolute",
              left: slot.x,
              top: slot.y,
              width: slot.width,
              height: slot.height,
            }}
          >
            <FigureCard
              figure={item.figure}
              title={`House ${slot.house}`}
            />
          </motion.div>
        );
      })}
    </>
  );
}

