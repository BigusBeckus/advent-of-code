import { getPositionString, Position, puzzle } from "./common.ts";

const sampleBInput = Deno.readTextFileSync("../inputs/9_sample_b.txt");
const sampleB = sampleBInput.trim().split("\n");

const sampleAInput = Deno.readTextFileSync("../inputs/9_sample.txt");
const sampleA = sampleAInput.trim().split("\n");

// function moveKnotOneWithTail(
//   head: Position,
//   tail: Position,
//   direction: string,
// ) {
//   const tailDiff = { x: 0, y: 0 } as Position;
//
//   if (["R", "L"].includes(direction)) {
//     const movesRight = direction === "R";
//     head.x = movesRight ? head.x + 1 : head.x - 1;
//
//     if (Math.abs(tail.x - head.x) > 1) {
//       // tail.x = movesRight ? tail.x + 1 : tail.x - 1;
//       tailDiff.x = movesRight ? 1 : -1;
//       if (tail.y !== head.y) {
//         tailDiff.y = head.y - tail.y;
//         tail.y = head.y;
//       }
//     }
//   } else if (["U", "D"].includes(direction)) {
//     const movesUp = direction === "U";
//     head.y = movesUp ? head.y + 1 : head.y - 1;
//
//     if (Math.abs(tail.y - head.y) > 1) {
//       // tail.y = movesUp ? tail.y + 1 : tail.y - 1;
//       tailDiff.y = movesUp ? 1 : -1;
//       if (tail.x !== head.x) {
//         tailDiff.x = head.x - tail.x;
//         tail.x = head.x;
//       }
//     }
//   }
//
//   return tailDiff;
// }

function countPositions(input: string[], knotsCount = 10) {
  // const startPosition = { x: 0, y: 0 } as Position;
  const knots: Position[] = [];
  for (let i = 0; i < knotsCount; i++) {
    knots.push(
      { x: 0, y: 0 } as Position,
    );
  }

  // const head = positions[0];
  const tail = knots[knots.length - 1];
  const uniqueTailVisits = new Set<string>();
  uniqueTailVisits.add(getPositionString(tail));

  for (const movement of input) {
    const [direction, stepsStr] = movement.split(" ");
    const steps = parseInt(stepsStr);
    const movementIsHorizontal = ["R", "L"].includes(direction);
    const movesRight = direction === "R";
    const movesUp = direction === "U";

    console.log(movement);

    for (let stepsIndex = 0; stepsIndex < steps; stepsIndex++) {
      // let tailDiff: Position | undefined;

      for (let knotsIndex = 0; knotsIndex < knots.length - 1; knotsIndex++) {
        const knot = knots[knotsIndex];

        // Head
        if (knotsIndex === 0) {
          if (movementIsHorizontal) {
            knot.x = movesRight ? knot.x + 1 : knot.x - 1;
          } else {
            knot.y = movesUp ? knot.y + 1 : knot.y - 1;
          }
          // tailDiff = moveKnotOneWithTail(position, nextPosition, direction);
          console.log(knotsIndex, ": ", knot);
          continue;
        }

        const prevKnot = knots[knotsIndex - 1];

        // Regular
        const knotsNotTouchingX = Math.abs(prevKnot.x - knot.x) > 1;
        const knotsNotTouchingY = Math.abs(prevKnot.y - knot.y) > 1;
        // console.log("  Knot Index: ", knotsIndex);
        // console.log("  Touching X: ", !knotsNotTouchingX);
        // console.log("  Touching Y: ", !knotsNotTouchingY);

        if (!(knotsNotTouchingX || knotsNotTouchingY)) {
          console.log(knotsIndex, ": ", knot);
          console.log("Still touching. Break!");
          break;
        }

        if (movementIsHorizontal && knotsNotTouchingX) {
          knot.x += movesRight ? 1 : -1;
          if (knot.y !== prevKnot.y) {
            knot.y = prevKnot.y;
          }
        } else if (knotsNotTouchingY) {
          knot.y += movesUp ? 1 : -1;
          if (knot.x !== prevKnot.x) {
            knot.x = prevKnot.x;
          }
        }
        console.log(knotsIndex, ": ", knot);
      }
      uniqueTailVisits.add(getPositionString(tail));
    }
  }

  return uniqueTailVisits.size;
}

console.log("Sample A: ", countPositions(sampleA));
// console.log("Sample B: ", countPositions(sampleB));
// console.log("Puzzle: ", countPositions(puzzle));
