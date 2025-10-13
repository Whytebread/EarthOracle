import React from "react";


const FigureCard = ({ name, pattern }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl shadow-md flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-3">{name}</h2>
      <div className="flex flex-col gap-2">
        {pattern.map((line, i) => (
          <div key={i} className="flex justify-center gap-2">
            {line === 1 ? (
              <div className="w-3 h-3 bg-white rounded-full"></div>
            ) : (
              <>
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FigureCard;