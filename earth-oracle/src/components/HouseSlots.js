export function getHouseAnchors(size) {
  const c = size / 2;
  const a = size * 0.18;
  const d = a * 2;

  const IS = {
    tl: { x: c - a, y: c - a },
    tr: { x: c + a, y: c - a },
    br: { x: c + a, y: c + a },
    bl: { x: c - a, y: c + a },
  };

  const D = {
    top: { x: c, y: c - d },
    right: { x: c + d, y: c },
    bottom: { x: c, y: c + d },
    left: { x: c - d, y: c },
  };

  // Counter-clockwise, House 1 → 12
  return [
    midpoint(D.left, IS.bl),   // 1
    midpoint(IS.bl, D.bottom), // 2
    midpoint(D.bottom, IS.br), // 3

    midpoint(IS.br, D.right),  // 4
    midpoint(D.right, IS.tr),  // 5
    midpoint(IS.tr, D.top),    // 6

    midpoint(D.top, IS.tl),    // 7
    midpoint(IS.tl, D.left),   // 8
    midpoint(D.left, IS.bl),   // 9 

    midpoint(D.right, IS.br),  // 10
    midpoint(IS.br, D.bottom), // 11
    midpoint(D.bottom, IS.bl), // 12
  ];
}

function midpoint(a, b) {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}
