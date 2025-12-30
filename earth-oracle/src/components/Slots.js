export const CARD_WIDTH = 90;
export const CARD_HEIGHT = 140;

/* -----------------------------
   SHIELD CHART SLOTS
----------------------------- */

export const shieldSlots = {
  // Mothers + Daughters
  top: [
    { id: "mother4", x: 800, y: 120 },
    { id: "mother3", x: 700, y: 120 },
    { id: "mother2", x: 600, y: 120 },
    { id: "mother1", x: 500, y: 120 },
    { id: "daughter4", x: 400, y: 120 },
    { id: "daughter3", x: 300, y: 120 },
    { id: "daughter2", x: 200, y: 120 },
    { id: "daughter1", x: 100, y: 120 },
  ],

  // Nieces 
  nieces: [
    { id: "niece4", x: 725, y: 310 },
    { id: "niece3", x: 525, y: 310 },
    { id: "niece2", x: 325, y: 310 },
    { id: "niece1", x: 125, y: 310 },
  ],

  // Witnesses
  witnesses: {
    left: { id: "leftWitness", x: 275, y: 500 },
    right: { id: "rightWitness", x: 625, y: 500 },
  },

  // Judge
  judge: {
    id: "judge",
    x: 450,
    y: 590,
  },
};
