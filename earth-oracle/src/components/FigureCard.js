import React from "react";
import { motion } from "framer-motion";

const FigureCard = ({ title, figure }) => {
  return (
    <div className="bg-white rounded-xl shadow p-3 w-full flex flex-col items-center">
      <div className="font-bold text-center text-amber-800 mb-2">
        {title}

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
      <div className="text-sm text-center text-amber-700 mt-2">
        {figure.name}
      </div>
    </div>
  );
};

export default FigureCard;