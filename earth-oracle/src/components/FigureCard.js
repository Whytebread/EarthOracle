import React from "react";

const FigureCard = ({ title, figure }) => {
  return (
    <div className="bg-amber-100 border-4 border-amber-700 rounded-xl p-4 shadow-lg w-40 text-center flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-amber-900">{title}</h3>
        <div className="flex flex-col items-center gap-1 mt-2">
          {figure.pattern.map((dot, i) => (
            <div
              key={i}
              className={`flex justify-center items-center h-4 ${
                dot === 1 ? "w-6" : "w-10"
              }`}
            >
              {dot === 1 ? (
                <div className="h-3 w-3 rounded-full bg-amber-900" />
              ) : (
                <div className="flex justify-between w-full px-1">
                  <div className="h-3 w-3 rounded-full bg-amber-900" />
                  <div className="h-3 w-3 rounded-full bg-amber-900" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 font-serif text-lg font-semibold text-amber-900 italic">
        {figure.name}
      </p>
    </div>
  );
};

export default FigureCard;