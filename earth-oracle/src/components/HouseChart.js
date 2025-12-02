import React from "react";
import { motion } from "framer-motion";
import FigureCard from "./FigureCard"; // adjust path if needed

const polarToXY = (cx, cy, r, deg) => {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const triangleCentroid = (p1, p2, p3) => ({
  x: (p1.x + p2.x + p3.x) / 3,
  y: (p1.y + p2.y + p3.y) / 3,
});

export default function HouseChart({ figures = [], size = 700 }) {
  if (!Array.isArray(figures) || figures.length < 12) {
    return <div className="text-center p-6">House chart needs 12 figures</div>;
  }

  const svgSize = size;
  const cx = svgSize / 2;
  const cy = svgSize / 2;

  // square inside
  const squareSide = Math.round(size * 0.28);
  const half = squareSide / 2;

  // radii
  const innerRadius = half + 18; // base center from center
  const outerRadius = size * 0.45; // triangle tip distance

  const baseHalf = Math.max(10, size * 0.02); // half width of small triangle base

  // square corners
  const sq = [
    { x: cx - half, y: cy - half }, // top-left
    { x: cx + half, y: cy - half }, // top-right
    { x: cx + half, y: cy + half }, // bottom-right
    { x: cx - half, y: cy + half }, // bottom-left
  ];

  const lerp = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

  // Build sideCenters exactly as before but keep mapping clear:
  const sideCenters = [
    // LEFT side: top->bottom is sq[0] -> sq[3]
    [lerp(sq[0], sq[3], 0.5), lerp(sq[0], sq[3], 0.85), lerp(sq[0], sq[3], 0.15)],
    // BOTTOM side: left->right sq[3] -> sq[2]
    [lerp(sq[3], sq[2], 0.5), lerp(sq[3], sq[2], 0.85), lerp(sq[3], sq[2], 0.15)],
    // RIGHT side: bottom->top sq[2] -> sq[1]
    [lerp(sq[2], sq[1], 0.5), lerp(sq[2], sq[1], 0.85), lerp(sq[2], sq[1], 0.15)],
    // TOP side: right->left sq[1] -> sq[0]
    [lerp(sq[1], sq[0], 0.5), lerp(sq[1], sq[0], 0.85), lerp(sq[1], sq[0], 0.15)],
  ];

  // final order starting left-middle (house1), counter-clockwise -> left-upper (house12)
  const orderedBase = [
    { side: 0, pos: 0 }, // left-middle -> H1
    { side: 0, pos: 1 }, // left-lower -> H2
    { side: 1, pos: 2 }, // bottom-left -> H3
    { side: 1, pos: 0 }, // bottom-middle -> H4
    { side: 1, pos: 1 }, // bottom-right -> H5
    { side: 2, pos: 2 }, // right-lower -> H6
    { side: 2, pos: 0 }, // right-middle -> H7
    { side: 2, pos: 1 }, // right-upper -> H8
    { side: 3, pos: 2 }, // top-right -> H9
    { side: 3, pos: 0 }, // top-middle -> H10
    { side: 3, pos: 1 }, // top-left -> H11
    { side: 0, pos: 2 }, // left-upper -> H12
  ];

  // build triangles and card anchor points
  const triangles = orderedBase.map(({ side, pos }, i) => {
    const baseCenter = sideCenters[side][pos];
    // vector from center to baseCenter
    const vx = baseCenter.x - cx;
    const vy = baseCenter.y - cy;
    const len = Math.sqrt(vx * vx + vy * vy) || 1;
    const nx = vx / len;
    const ny = vy / len;
    // perp vector
    const ux = -ny;
    const uy = nx;
    const p1 = { x: baseCenter.x + ux * baseHalf, y: baseCenter.y + uy * baseHalf };
    const p2 = { x: baseCenter.x - ux * baseHalf, y: baseCenter.y - uy * baseHalf };
    // tip
    let tip = { x: cx + nx * outerRadius, y: cy + ny * outerRadius };

    // flanking triangles should be pulled toward base (so they don't stick out)
    const posIsMiddle = pos === 0;
    if (!posIsMiddle) {
      const pull = 0.45; // increase to pull tip closer to square
      const innerTip = { x: cx + nx * (innerRadius + 8), y: cy + ny * (innerRadius + 8) };
      tip = {
        x: tip.x * (1 - pull) + innerTip.x * pull,
        y: tip.y * (1 - pull) + innerTip.y * pull,
      };
    }

    // choose card anchor: a point between baseCenter and tip, biased to baseCenter (so card is inside triangle)
    const anchorBias = 0.28; // 0..1 ; lower = closer to baseCenter
    const anchor = {
      x: baseCenter.x * (1 - anchorBias) + tip.x * anchorBias,
      y: baseCenter.y * (1 - anchorBias) + tip.y * anchorBias,
    };

    return { p1, p2, tip, baseCenter, anchor, houseIndex: i };
  });

  const baseDelay = 0.06;

  // card size smaller so they fit within triangles
  const cardW = Math.round(size * 0.14);
  const cardH = Math.round(size * 0.12);

  return (
    <div style={{ width: svgSize, margin: "0 auto", position: "relative" }}>
      <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
        {/* center square */}
        <rect
          x={cx - half}
          y={cy - half}
          width={squareSide}
          height={squareSide}
          rx={6}
          fill="rgba(255,250,240,0.95)"
          stroke="#b7710b"
          strokeWidth={2}
        />

        {/* draw all triangles */}
        <g>
          {triangles.map((t, idx) => {
            const pts = `${t.p1.x},${t.p1.y} ${t.p2.x},${t.p2.y} ${t.tip.x},${t.tip.y}`;
            // highlight middles
            const ref = orderedBase[idx];
            const isMiddle = ref.pos === 0;
            return (
              <polygon
                key={`tri-${idx}`}
                points={pts}
                fill={isMiddle ? "rgba(251,191,36,0.12)" : "rgba(251,191,36,0.06)"}
                stroke="rgba(184,134,11,0.16)"
                strokeWidth={1}
              />
            );
          })}
        </g>
      </svg>

      {/* overlay cards at anchor points (inside triangles) */}
      <div style={{ position: "absolute", left: 0, top: 0, width: svgSize, height: svgSize }}>
        {triangles.map((t, i) => {
          const anchor = t.anchor;
          const left = anchor.x - cardW / 2;
          const top = anchor.y - cardH / 2;
          const fig = figures[i];

          return (
            <motion.div
              key={`house-card-${i}`}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * baseDelay, duration: 0.42 }}
              style={{
                position: "absolute",
                left,
                top,
                width: cardW,
                height: cardH,
                pointerEvents: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <div style={{ width: "100%", textAlign: "center", fontWeight: 700, color: "#92400e", marginBottom: 4 }}>
                {`House ${i + 1}`}
              </div>

              <div style={{ width: "100%", pointerEvents: "auto" }}>
                <FigureCard title={""} figure={fig} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
