import React, { useState } from "react";
import geomanticFigures from "../data/figures";

// identifies the figure based on pattern from user input
const identifyFigure = (pattern) => {
    const match = geomanticFigures.find(
        (f) => JSON.stringify(f.pattern) === JSON.stringify(pattern)
    );
    return match
};

const CastingBoard = ({ onComplete }) => {
    const [currentMother, setCurrentMother] = useState(1);
    const [currentLine, setCurrentLine] = useState(1);
    const [dots, setDots] = useState([]);
    const [figures, setFigures] = useState([[], [], [], []]);

    const handleClick = () => {
        setDots([...dots, "•"]);
    };

    const completeLine = () => {
        const count = dots.length;
        const parity = count % 2 === 0 ? 0 : 1; // even=0, odd=1
        const updatedFigures = [...figures];
        updatedFigures[currentMother - 1][currentLine - 1] = parity;

        setFigures(updatedFigures);
        setDots([]); // reset dots for next line

        if (currentLine < 4) {
            setCurrentLine(currentLine + 1);
        } else if (currentMother < 4) {
            setCurrentLine(1);
            setCurrentMother(currentMother + 1);
        } else {
            const namedMothers = updatedFigures.map((fig) => ({
                name: identifyFigure(fig),
                pattern: fig,
            }));
            onComplete(namedMothers);
        }
    };
    return (
        <div
            style={{
                backgroundImage: "url('/parchment-texture.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "80vw"
            }}
        >
            <h2 className="text-2xl font-serif text-amber-900 mb-4">
                Concentrate on your question while clicking right to left
            </h2>

            <h3 className="text-lg text-amber-800 mb-2">
                Casting Mother {currentMother}, Line {currentLine}
            </h3>

            <div
                onClick={handleClick}
                className="cursor-pointer w-full h-48 flex flex-wrap justify-end items-center bg-amber-100/60 border border-amber-600 rounded-lg p-4"
            >
                {dots.map((dot, index) => (
                    <span
                        key={index}
                        className="text-3xl text-amber-900 mx-1 animate-pulse"
                    >
                        {dot}
                    </span>
                ))}
            </div>

            <button
                onClick={completeLine}
                className="mt-6 bg-amber-700 text-amber-100 px-6 py-2 rounded-xl hover:bg-amber-800 transition"
            >
                Complete Line
            </button>
        </div>
    );
};

export default CastingBoard;

