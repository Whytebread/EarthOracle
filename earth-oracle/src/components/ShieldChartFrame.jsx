export default function ShieldChartFrame({ slotWidth = 140, slotHeight = 180 }) {
  const gap = 16;

  const slotStyle = {
    width: slotWidth,
    height: slotHeight,
    border: "2px dashed rgba(180,83,9,0.45)",
    borderRadius: 12,
    background: "rgba(255,248,220,0.35)",
  };

  return (
    <div className="flex flex-col items-center gap-6">

      {/* Mothers + Daughters (8 total, right → left) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(8, ${slotWidth}px)`,
          gap,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={slotStyle} />
        ))}
      </div>

      {/* Nieces (4) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(4, ${slotWidth * 2}px)`,
          gap,
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={slotStyle} />
        ))}
      </div>

      {/* Witnesses + Judge */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(3, ${slotWidth}px)`,
          gap,
        }}
      >
        <div style={slotStyle} /> {/* Left Witness */}
        <div style={slotStyle} /> {/* Judge */}
        <div style={slotStyle} /> {/* Right Witness */}
      </div>
    </div>
  );
}
