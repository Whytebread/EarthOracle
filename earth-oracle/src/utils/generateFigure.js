export function generateRandomFigure() {
  const pattern = Array.from({ length: 4 }, () => Math.round(Math.random()));
  return pattern;
}