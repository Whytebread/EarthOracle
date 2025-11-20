import React from "react";
import { motion } from "framer-motion";
import FigureCard from "./FigureCard"; // your existing card

// Helper: polar -> cartesian
const polarToXY = (cx, cy, r, deg) => {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

export default function HouseChart({ figures = [], size = 700 }) {
  if (!Array.isArray(figures) || figures.length < 12) {
    return <div className="text-center p-6">House chart needs 12 figures</div>;
  }

  // layout constants
  const svgW = size;
  const svgH = size;
  const cx = svgW / 2;
  const cy = svgH / 2;
  const squareSize = Math.round(size * 0.32); // inner square size
  const innerRadius = squareSize / Math.sqrt(2) / 2 + 10; // distance from center to triangle base
  const outerRadius = size * 0.42; // where triangle tips point to (cards will be placed around here)
  const cardOffset = 28; // nudge card position inward from triangle tip
  const cardW = 140; // approximate card width for positioning
  const cardH = 120; // approximate card height

  // angles for houses starting at middle-left and going counter-clockwise
  const angles = [180, 210, 240, 270, 300, 330, 0, 30, 60, 90, 120, 150];

  // Polygons for the triangles: we will draw 12 triangular wedge shapes
  // Each wedge uses: base points close to square edge and tip at outerRadius at angle.
  const squareHalf = squareSize / 2;
  const sqPoints = [
    { x: cx - squareHalf, y: cy - squareHalf }, // top-left
    { x: cx + squareHalf, y: cy - squareHalf }, // top-right
    { x: cx + squareHalf, y: cy + squareHalf }, // bottom-right
    { x: cx - squareHalf, y: cy + squareHalf }, // bottom-left
  ];

  // For each angle produce triangle polygon points [near-left, near-right, tip]
  const buildTriangle = (deg) => {
    // tip
    const tip = polarToXY(cx, cy, outerRadius, deg);
    // base center on innerRadius at same angle:
    const baseCenter = polarToXY(cx, cy, innerRadius, deg);
    // compute a small perpendicular offset to make a short base segment
    const perp = 12; // half-base length
    const rad = (deg * Math.PI) / 180;
    const px = Math.cos(rad);
    const py = Math.sin(rad);
    // perpendicular vector (rotated 90deg)
    const ux = -py;
    const uy = px;
    const p1 = { x: baseCenter.x + ux * perp, y: baseCenter.y + uy * perp };
    const p2 = { x: baseCenter.x - ux * perp, y: baseCenter.y - uy * perp };
    return [p1, p2, tip];
  };

  // Animation stagger config
  const baseDelay = 0.08;

  return (
    <div style={{ width: svgW, margin: "0 auto", position: "relative" }}>
      <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="xMidYMid meet">
        {/* background subtle */}
        <rect x="0" y="0" width={svgW} height={svgH} rx={12} fill="transparent" />

        {/* center square */}
        <rect
          x={cx - squareHalf}
          y={cy - squareHalf}
          width={squareSize}
          height={squareSize}
          fill="rgba(255,250,240,0.9)"
          stroke="#b7710b"
          strokeWidth={2}
          rx={8}
        />

        {/* draw all 12 triangular wedges */}
        <g>
          {angles.map((ang, i) => {
            const tri = buildTriangle(ang);
            const points = tri.map((p) => `${p.x},${p.y}`).join(" ");
            return (
              <polygon
                key={`tri-${i}`}
                points={points}
                fill="rgba(251, 191, 36, 0.08)"
                stroke="rgba(184, 134, 11, 0.25)"
                strokeWidth={1}
              />
            );
          })}
        </g>

        {/* optional guide lines from square corners to outer midpoints (the 4 large triangles divided) */}
        {/* draw 4 larger triangle halves as lines */}
        {[
          [sqPoints[0], { x: cx, y: -999 }], // we don't need exact big triangles; skip heavy geometry
        ]}
      </svg>

      {/* Overlay HTML cards positioned at polar points (absolute) */}
      <div style={{ position: "absolute", left: 0, top: 0, width: svgW, height: svgH, pointerEvents: "none" }}>
        {angles.map((ang, i) => {
          const pos = polarToXY(cx, cy, outerRadius - cardOffset, ang);
          // offset the top-left of the card so it centers on that pos
          const left = pos.x - cardW / 2;
          const top = pos.y - cardH / 2;
          const fig = figures[i];

          return (
            <motion.div
              layout
              key={`house-${i}`}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * baseDelay, duration: 0.45 }}
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
              {/* We render the card inside, but keep pointerEvents so it can be interactive */}
              <div style={{ width: "100%", pointerEvents: "auto" }}>
                {/* House number at top (inside the card container) */}
                <div style={{ textAlign: "center", fontWeight: 700, color: "#92400e", marginBottom: 4 }}>
                  House {i + 1}
                </div>

                {/* Reuse your FigureCard but hide its top title to avoid duplication.
                    We will pass a blank title prop and render house label above. */}
                <FigureCard title={""} figure={fig} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
