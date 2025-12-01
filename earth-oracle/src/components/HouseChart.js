import React from "react";
import { motion } from "framer-motion";
import FigureCard from "./FigureCard";

// Helper: polar -> cartesian (math-friendly: angle degrees, 0 = right, + = CCW)
const polarToXY = (cx, cy, r, deg) => {
  const rad = (deg * Math.PI) / 180;
  // NOTE: use y = cy - r * sin for math (CCW) orientation in screen coords
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
};

/**
 * HouseChart
 *
 * - figures: array of 12 figures (mothers 1..4, daughters 1..4, nieces 1..4)
 * - size: pixel square for the SVG viewport
 * - direction: "cw" | "ccw" (controls order around the square)
 *
 * Default behaviour: starting at middle-left and proceed downward and around
 * so the sequence goes (middle-left) -> (down-left) -> ... -> (upper-left).
 */
export default function HouseChart({ figures = [], size = 700, direction = "ccw" }) {
  if (!Array.isArray(figures) || figures.length < 12) {
    return <div className="text-center p-6">House chart needs 12 figures</div>;
  }

  const svgW = size;
  const svgH = size;
  const cx = svgW / 2;
  const cy = svgH / 2;

  // central square sizing
  const squareSize = Math.round(size * 0.30); // inner square size (tweak if needed)
  const half = squareSize / 2;

  // radii controlling triangle geometry & card placement
  const innerRadius = half + 18; // distance from center to triangle base
  const outerRadius = size * 0.42; // triangle tip distance from center
  const cardOffset = 28; // nudge card inward from triangle tip
  const cardW = Math.round(size * 0.14);
  const cardH = Math.round(size * 0.12);

  // the 12 angular positions — chosen so index 0 is middle-left, then moves down & around.
  // angles are given in degrees in math coordinates (0 = right, 90 = up, 180 = left, 270 = down)
  // this sequence: 180 (mid-left), 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150
  const baseAngles = [180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150];

  // If user asks for clockwise instead, just reverse the order
  const angles = direction === "ccw" ? baseAngles : [...baseAngles].reverse();

  // build triangle polygon given an angle (base near the square, tip at outerRadius)
  const buildTriangle = (deg) => {
    const tip = polarToXY(cx, cy, outerRadius, deg);
    const baseCenter = polarToXY(cx, cy, innerRadius, deg);

    // create a small perpendicular base (so each wedge has a small base width)
    const perp = Math.max(10, Math.round(size * 0.018)); // adjust base width relative to size
    const rad = (deg * Math.PI) / 180;
    const px = Math.cos(rad);
    const py = Math.sin(rad);
    // perp vector (rotated 90 degrees), note use of math coordinates
    const ux = -py;
    const uy = px;

    const p1 = { x: baseCenter.x + ux * perp, y: baseCenter.y + uy * perp };
    const p2 = { x: baseCenter.x - ux * perp, y: baseCenter.y - uy * perp };

    return [p1, p2, tip];
  };

  // small helper to draw an SVG polygon from points
  const polyPoints = (pts) => pts.map((p) => `${p.x},${p.y}`).join(" ");

  // animation base delay
  const baseDelay = 0.06;

  return (
    <div style={{ width: svgW, margin: "0 auto", position: "relative" }}>
      <svg
        width={svgW}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* background */}
        <rect x="0" y="0" width={svgW} height={svgH} fill="transparent" rx={8} />

        {/* central square */}
        <rect
          x={cx - half}
          y={cy - half}
          width={squareSize}
          height={squareSize}
          fill="rgba(255,250,240,0.95)"
          stroke="#b7710b"
          strokeWidth={2}
          rx={6}
        />

        {/* draw 12 small triangular wedges */}
        <g>
          {angles.map((ang, i) => {
            const tri = buildTriangle(ang);
            return (
              <polygon
                key={`tri-${i}`}
                points={polyPoints(tri)}
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(184,134,11,0.18)"
                strokeWidth={1}
              />
            );
          })}
        </g>

        {/* guide lines from square corners to outer midpoints (optional, subtle) */}
        {/* draw the four large diagonal lines from square corners outward (visual scaffold) */}
        {[
          // top-left corner to top-left outer (approx)
          [ { x: cx - half, y: cy - half }, polarToXY(cx, cy, outerRadius, 150) ],
          [ { x: cx + half, y: cy - half }, polarToXY(cx, cy, outerRadius, 30) ],
          [ { x: cx + half, y: cy + half }, polarToXY(cx, cy, outerRadius, 330) ],
          [ { x: cx - half, y: cy + half }, polarToXY(cx, cy, outerRadius, 210) ],
        ].map((pair, idx) => (
          <line
            key={`guide-${idx}`}
            x1={pair[0].x}
            y1={pair[0].y}
            x2={pair[1].x}
            y2={pair[1].y}
            stroke="rgba(184,134,11,0.08)"
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Overlay HTML cards positioned at triangle tips */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: svgW,
          height: svgH,
          pointerEvents: "none",
        }}
      >
        {angles.map((ang, i) => {
          const pos = polarToXY(cx, cy, outerRadius - cardOffset, ang);
          const left = pos.x - cardW / 2;
          const top = pos.y - cardH / 2;
          const fig = figures[i];

          return (
            <motion.div
              key={`house-${i}`}
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * baseDelay, duration: 0.4 }}
              style={{
                position: "absolute",
                left,
                top,
                width: cardW,
                height: cardH,
                pointerEvents: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "100%", pointerEvents: "auto" }}>
                <div style={{ textAlign: "center", fontWeight: 700, color: "#92400e", marginBottom: 6 }}>
                  {/* House numbering uses user-requested ordering: i=0 -> House 1 */}
                  House {i + 1}
                </div>

                {/* Render FigureCard with an empty top title to avoid duplicate labels */}
                <FigureCard title={""} figure={fig} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
