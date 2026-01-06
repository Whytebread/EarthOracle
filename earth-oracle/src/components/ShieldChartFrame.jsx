import React from "react";

export default function ShieldFrame({ width = 900 }) {
    const height = Math.round(width * 0.86);

    return (
        <div className="mx-auto" style={{ width }}>
            <svg
                viewBox="0 0 900 780"
                width={width}
                height={height}
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Outer shield outline */}
                <path
                    d="
            M 50 40
            H 850
            V 420
            C 850 520, 700 650, 450 740
            C 200 650, 50 520, 50 420
            Z
          "
                    fill="none"
                    stroke="#92400e"
                    strokeWidth="4"
                />

                {/* Horizontal divider between mothers/daughters and nieces */}
                <line
                    x1="50"
                    y1="200"
                    x2="850"
                    y2="200"
                    stroke="#92400e"
                    strokeWidth="2"
                />

                {/* Vertical dividers for top row (8 columns) */}
                {Array.from({ length: 7 }).map((_, i) => (
                    <line
                        key={i}
                        x1={50 + ((i + 1) * 800) / 8}
                        y1="40"
                        x2={50 + ((i + 1) * 800) / 8}
                        y2="200"
                        stroke="#92400e"
                        strokeWidth="2"
                    />
                ))}

                {/* Vertical dividers for niece row (4 columns) */}
                {Array.from({ length: 3 }).map((_, i) => (
                    <line
                        key={i}
                        x1={50 + ((i + 1) * 800) / 4}
                        y1="200"
                        x2={50 + ((i + 1) * 800) / 4}
                        y2="420"
                        stroke="#92400e"
                        strokeWidth="2"
                    />
                ))}

                {/* Bottom divider under nieces */}
                <line
                    x1="50"
                    y1="420"
                    x2="850"
                    y2="420"
                    stroke="#92400e"
                    strokeWidth="2"
                />

                {/* Judge triangle */}
                <line
                    x1="250"
                    y1="420"
                    x2="450"
                    y2="740"
                    stroke="#92400e"
                    strokeWidth="2"
                />

                <line
                    x1="650"
                    y1="420"
                    x2="450"
                    y2="740"
                    stroke="#92400e"
                    strokeWidth="2"
                />


            </svg>
        </div>
    );
}
