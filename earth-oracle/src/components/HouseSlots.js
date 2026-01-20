export function getHouseSlots(size = 840) {
  const c = size / 2;

  const a = size * 0.18; // inner square half-width
  const d = a * 2;      // diamond half-diagonal

  // INNER SQUARE
  const IS = {
    tl: { x: c - a, y: c - a },
    tr: { x: c + a, y: c - a },
    br: { x: c + a, y: c + a },
    bl: { x: c - a, y: c + a },
  };

  // DIAMOND
  const D = {
    top: { x: c, y: c - d },
    right: { x: c + d, y: c },
    bottom: { x: c, y: c + d },
    left: { x: c - d, y: c },
  };

  // OUTER SQUARE
  const OS = {
    tl: { x: c - d, y: c - d },
    tr: { x: c + d, y: c - d },
    br: { x: c + d, y: c + d },
    bl: { x: c - d, y: c + d },
  };

  // Helper: centroid of triangle
  const centroid = (a, b, c) => ({
    x: (a.x + b.x + c.x) / 3,
    y: (a.y + b.y + c.y) / 3,
  });

  const CARD_W = 110;
  const CARD_H = 150;

  return [
    // House order: LEFT → counter-clockwise
    { house: 1, ...centroid(OS.bl, D.left, IS.bl) },
    { house: 2, ...centroid(D.left, IS.bl, IS.tl) },
    { house: 3, ...centroid(OS.tl, D.left, IS.tl) },

    { house: 4, ...centroid(OS.tl, D.top, IS.tl) },
    { house: 5, ...centroid(D.top, IS.tl, IS.tr) },
    { house: 6, ...centroid(OS.tr, D.top, IS.tr) },

    { house: 7, ...centroid(OS.tr, D.right, IS.tr) },
    { house: 8, ...centroid(D.right, IS.tr, IS.br) },
    { house: 9, ...centroid(OS.br, D.right, IS.br) },

    { house: 10, ...centroid(OS.br, D.bottom, IS.br) },
    { house: 11, ...centroid(D.bottom, IS.br, IS.bl) },
    { house: 12, ...centroid(OS.bl, D.bottom, IS.bl) },
  ].map(slot => ({
    ...slot,
    x: slot.x - CARD_W / 2,
    y: slot.y - CARD_H / 2,
    width: CARD_W,
    height: CARD_H,
  }));
}
