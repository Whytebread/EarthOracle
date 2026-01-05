const LEFT = 50;
const RIGHT = 850;
const TOP = 40;

const WIDTH = 800;

// Row Y positions (matched to ShieldFrame)
const TOP_ROW_Y = 40;
const TOP_ROW_H = 160;

const NIECE_ROW_Y = 200;
const NIECE_ROW_H = 220;

const BOTTOM_Y = 420;

// Slot sizes
const TOP_SLOT_W = WIDTH / 8;
const NIECE_SLOT_W = WIDTH / 4;


export const shieldSlots = [
  /* =========================
     MOTHERS (1–4)
     ========================= */

  ...[0, 1, 2, 3].map(i => {
    const slotX = LEFT + (7 - i) * TOP_SLOT_W;
    return {
      id: `mother-${i + 1}`,
      type: "mother",
      order: i,
      x: slotX,
      y: TOP_ROW_Y,
      width: TOP_SLOT_W,
      height: TOP_ROW_H,
    };
  }),

  /* =========================
     DAUGHTERS (5–8)
     ========================= */

  ...[0, 1, 2, 3].map(i => {
    const slotX = LEFT + (3 - i) * TOP_SLOT_W;
    return {
      id: `daughter-${i + 1}`,
      type: "daughter",
      order: i + 4,
      x: slotX,
      y: TOP_ROW_Y,
      width: TOP_SLOT_W,
      height: TOP_ROW_H,
    };
  }),

  /* =========================
     NIECES (9–12)
     ========================= */

  ...[0, 1, 2, 3].map(i => {
    const slotX = LEFT + (3 - i) * NIECE_SLOT_W;
    return {
      id: `niece-${i + 1}`,
      type: "niece",
      order: i + 8,
      x: slotX,
      y: NIECE_ROW_Y,
      width: NIECE_SLOT_W,
      height: NIECE_ROW_H,
    };
  }),

  /* =========================
     WITNESSES (13–14)
     ========================= */

  {
    id: "witness-left",
    type: "witness",
    order: 12,
    x: LEFT,
    y: BOTTOM_Y,
    width: WIDTH / 2,
    height: 160,
  },

  {
    id: "witness-right",
    type: "witness",
    order: 13,
    x: LEFT + WIDTH / 2,
    y: BOTTOM_Y,
    width: WIDTH / 2,
    height: 160,
  },

  /* =========================
     JUDGE (15)
     ========================= */

  {
    id: "judge",
    type: "judge",
    order: 14,
    x: LEFT + WIDTH * 0.25,
    y: BOTTOM_Y + 160,
    width: WIDTH * 0.5,
    height: 200,
  },
];
