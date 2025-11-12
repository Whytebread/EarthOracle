import React from "react";
import { motion } from "framer-motion";

const FigureCard = ({ title, figure }) => {
  return (
    <div className="bg-amber-100 border-4 border-amber-700 rounded-xl p-4 shadow-lg w-36 sm:w-40 md:w-44 text-center flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-amber-900 text-sm sm:text-base md:text-lg">
          {title}
        </h3>

        <div className="flex flex-col items-center gap-2 mt-2">
          {figure.pattern.map((dot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3, duration: 0.5 }}
              className={`flex justify-center items-center h-4 sm:h-5 md:h-6`}
            >
              {dot === 1 ? (
                <div className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 rounded-full bg-amber-900" />
              ) : (
                <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-5">
                  <div className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 rounded-full bg-amber-900" />
                  <div className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 rounded-full bg-amber-900" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-col items-center">
        <p className="font-serif text-sm sm:text-base md:text-lg font-semibold text-amber-900 italic">
          {figure.name}
        </p>
      </div>
    </div>
  );
};

export default FigureCard;