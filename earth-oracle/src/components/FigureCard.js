import React from "react";
import { motion } from "framer-motion";

export default function FigureCard({ title, figure, className = "" }) {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-between ${className}`}
    >
      {/* TOP: optional title */}
      {title && (
        <div className="text-xs text-center text-amber-800 leading-tight">
          {title}
        </div>
      )}

      {/* MIDDLE: dots (flex-grow keeps it centered) */}
      <div className="flex flex-col items-center justify-center flex-grow gap-1">
        {figure.pattern.map((dot, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.2,
              duration: 0.4,
              ease: "easeOut",
            }}
            className={`flex justify-center items-center ${
              dot === 1 ? "w-6" : "w-14"
            }`}
          >
            {dot === 1 ? (
              <div className="h-3 w-3 rounded-full bg-amber-900" />
            ) : (
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-900" />
                <div className="h-3 w-3 rounded-full bg-amber-900" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* BOTTOM: figure name */}
      <div className="text-xs text-center text-amber-700 leading-tight">
        {figure.name}
      </div>
    </div>
  );
}
