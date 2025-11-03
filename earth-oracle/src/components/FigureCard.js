import React from "react";

const FigureCard = ({ title, figure }) => {
  return (
    <div className="bg-amber-100 border-4 border-amber-700 rounded-xl p-4 shadow-lg w-40 text-center">
      <h3 className="font-bold text-amber-900">{title}</h3>
      <div className="flex justify-center my-2 space-x-2">
        {figure.pattern.map((dot, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              dot ? "bg-black" : "bg-transparent border border-black"
            }`}
          ></div>
        ))}
      </div>
      <p className="text-sm text-amber-800 italic">{figure.name}</p>
    </div>
  );
};

export default FigureCard;