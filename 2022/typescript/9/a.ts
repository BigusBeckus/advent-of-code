const puzzleInput = Deno.readTextFileSync("../inputs/9.txt");
const sampleInput = Deno.readTextFileSync("../inputs/9_sample.txt");

export const sample = sampleInput.trim().split("\n");
export const puzzle = puzzleInput.trim().split("\n");

type Position = {
  x: number;
  y: number;
};

function getPositionString(position: Position) {
  return `${position.x},${position.y}`;
}

function move(
  head: Position,
  tail: Position,
  direction: string,
  steps: number,
) {
  const visits = new Set<string>();

  for (let i = 0; i < steps; i++) {
    if (["R", "L"].includes(direction)) {
      const movesRight = direction === "R";
      head.x = movesRight ? head.x + 1 : head.x - 1;

      if (Math.abs(tail.x - head.x) > 1) {
        tail.x = movesRight ? tail.x + 1 : tail.x - 1;
        if (tail.y !== head.y) {
          tail.y = head.y;
        }
      }
    } else if (["U", "D"].includes(direction)) {
      const movesUp = direction === "U";
      head.y = movesUp ? head.y + 1 : head.y - 1;

      if (Math.abs(tail.y - head.y) > 1) {
        tail.y = movesUp ? tail.y + 1 : tail.y - 1;
        if (tail.x !== head.x) {
          tail.x = head.x;
        }
      }
    }
    // console.log(getPositionString(tail));
    visits.add(getPositionString(tail));
  }

  return visits;
}

function countPositions(input: string[]) {
  const startPosition = { x: 0, y: 0 } as Position;

  const headPosition = { x: startPosition.x, y: startPosition.y } as Position;
  const tailPosition = { x: startPosition.x, y: startPosition.y } as Position;

  let uniqueTailVisits = new Set<string>();
  uniqueTailVisits.add(getPositionString(startPosition));

  for (const movement of input) {
    const [direction, stepsStr] = movement.split(" ");
    const steps = parseInt(stepsStr);
    uniqueTailVisits = new Set([
      ...uniqueTailVisits,
      ...move(headPosition, tailPosition, direction, steps),
    ]);
  }

  return uniqueTailVisits.size;
}

console.log("Sample: ", countPositions(sample));
console.log("Puzzle: ", countPositions(puzzle));
