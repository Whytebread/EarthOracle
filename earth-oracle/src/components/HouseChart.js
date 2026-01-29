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
      {slots.map((slot) => {
        const item = figures.find(f => f.house === slot.house);
        if (!item?.figure) return null;

        return (
          <motion.div
            key={`house-${slot.house}`}
            layoutId={`house-${item.id}`} 
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


