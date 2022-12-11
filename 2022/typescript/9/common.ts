const puzzleInput = Deno.readTextFileSync("../inputs/9.txt");

export const puzzle = puzzleInput.trim().split("\n");

export type Position = {
  x: number;
  y: number;
};

export function getPositionString(position: Position) {
  return `${position.x},${position.y}`;
}
