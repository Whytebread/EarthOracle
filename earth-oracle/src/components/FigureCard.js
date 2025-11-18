import React from "react";
import { motion } from "framer-motion";

const FigureCard = ({ title, figure, scale = 1 }) => {
  return (
    <div
      className="bg-white border rounded-xl shadow p-2 flex flex-col items-center"
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
    >
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-gray-600">{figure?.name}

        {/* DOTS: slower sequential animation */}
        <div className="flex flex-col items-center gap-1 mt-2">
          {figure.pattern.map((dot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.3,   
                duration: 0.6,    
                ease: "easeOut"
              }}
              className={`flex justify-center items-center h-6 ${
                dot === 1 ? "w-8" : "w-20"
              }`}
            >
              {dot === 1 ? (
                <div className="h-4 w-4 rounded-full bg-amber-900" />
              ) : (
                <div className="flex justify-center gap-4">
                  <div className="h-4 w-4 rounded-full bg-amber-900" />
                  <div className="h-4 w-4 rounded-full bg-amber-900" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* BOTTOM: figure name */}
      <p className="mt-3 font-serif text-base font-semibold text-amber-900 italic">
        {figure.name}
      </p>
    </div>
  );
};

export default FigureCard;