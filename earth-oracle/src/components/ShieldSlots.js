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

const CARD_W = 90;
const CARD_H = 120;

// helper to center card inside a slot
const center = (slotX, slotY, slotW, slotH) => ({
  x: slotX + slotW / 2 - CARD_W / 2,
  y: slotY + slotH / 2 - CARD_H / 2,
});

export const shieldSlots = [
  /* =========================
     MOTHERS (1–4)
     ========================= */

  ...[0, 1, 2, 3].map(i => {
    const slotX = LEFT + (7 - i) * TOP_SLOT_W;
    const pos = center(slotX, TOP_ROW_Y, TOP_SLOT_W, TOP_ROW_H);
    return {
      id: `mother-${i + 1}`,
      type: "mother",
      order: i,
      ...pos,
      width: CARD_W,
      height: CARD_H,
    };
  }),

  /* =========================
     DAUGHTERS (5–8)
     ========================= */

  ...[0, 1, 2, 3].map(i => {
    const slotX = LEFT + (3 - i) * TOP_SLOT_W;
    const pos = center(slotX, TOP_ROW_Y, TOP_SLOT_W, TOP_ROW_H);
    return {
      id: `daughter-${i + 1}`,
      type: "daughter",
      order: i + 4,
      ...pos,
      width: CARD_W,
      height: CARD_H,
    };
  }),

  /* =========================
     NIECES (9–12)
     ========================= */

  ...[0, 1, 2, 3].map(i => {
    const slotX = LEFT + (3 - i) * NIECE_SLOT_W;
    const pos = center(slotX, NIECE_ROW_Y, NIECE_SLOT_W, NIECE_ROW_H);
    return {
      id: `niece-${i + 1}`,
      type: "niece",
      order: i + 8,
      ...pos,
      width: CARD_W,
      height: CARD_H,
    };
  }),

  /* =========================
     WITNESSES (13–14)
     ========================= */

  {
    id: "witness-left",
    type: "witness",
    order: 12,
    x: LEFT + WIDTH * 0.25 - CARD_W / 2,
    y: BOTTOM_Y + 30,
    width: CARD_W,
    height: CARD_H,
  },

  {
    id: "witness-right",
    type: "witness",
    order: 13,
    x: LEFT + WIDTH * 0.75 - CARD_W / 2,
    y: BOTTOM_Y + 30,
    width: CARD_W,
    height: CARD_H,
  },

  /* =========================
     JUDGE (15)
     ========================= */

  {
    id: "judge",
    type: "judge",
    order: 14,
    x: LEFT + WIDTH / 2 - CARD_W / 2,
    y: BOTTOM_Y + 90,
    width: CARD_W,
    height: CARD_H,
  },
];
