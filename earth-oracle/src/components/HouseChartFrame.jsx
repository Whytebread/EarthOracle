import React from "react";

export default function HouseChartFrame({ size = 600 }) {
    const c = size / 2;

    const a = size * 0.18; // inner square half-width
    const d = a * 2;      // diamond half-diagonal & outer square half-width

    // INNER SQUARE
    const IS = {
        tl: { x: c - a, y: c - a },
        tr: { x: c + a, y: c - a },
        br: { x: c + a, y: c + a },
        bl: { x: c - a, y: c + a },
    };

    // DIAMOND (|x| + |y| = d)
    const D = {
        top: { x: c, y: c - d },
        right: { x: c + d, y: c },
        bottom: { x: c, y: c + d },
        left: { x: c - d, y: c },
    };

    // OUTER SQUARE (touches diamond points at midpoints)
    const OS = {
        tl: { x: c - d, y: c - d },
        tr: { x: c + d, y: c - d },
        br: { x: c + d, y: c + d },
        bl: { x: c - d, y: c + d },
    };

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{ display: "block", margin: "0 auto" }}
        >
            {/* Outer square */}
            <rect
                x={OS.tl.x}
                y={OS.tl.y}
                width={d * 2}
                height={d * 2}
                fill="none"
                stroke="#d97706"
                strokeWidth="2"
            />

            {/* Diamond */}
            <polygon
                points={`
          ${D.top.x},${D.top.y}
          ${D.right.x},${D.right.y}
          ${D.bottom.x},${D.bottom.y}
          ${D.left.x},${D.left.y}
        `}
                fill="none"
                stroke="#b45309"
                strokeWidth="2"
            />

            {/* Inner square */}
            <rect
                x={IS.tl.x}
                y={IS.tl.y}
                width={a * 2}
                height={a * 2}
                fill="none"
                stroke="#92400e"
                strokeWidth="2"
            />

            {/* Corner divider lines (outer square → inner square corners) */}
            <line
                x1={OS.tl.x}
                y1={OS.tl.y}
                x2={IS.tl.x}
                y2={IS.tl.y}
                stroke="#b45309"
                strokeWidth="1.5"
            />

            <line
                x1={OS.tr.x}
                y1={OS.tr.y}
                x2={IS.tr.x}
                y2={IS.tr.y}
                stroke="#b45309"
                strokeWidth="1.5"
            />

            <line
                x1={OS.br.x}
                y1={OS.br.y}
                x2={IS.br.x}
                y2={IS.br.y}
                stroke="#b45309"
                strokeWidth="1.5"
            />

            <line
                x1={OS.bl.x}
                y1={OS.bl.y}
                x2={IS.bl.x}
                y2={IS.bl.y}
                stroke="#b45309"
                strokeWidth="1.5"
            />

        </svg>
    );
}
