import { puzzle, sample } from "./common.ts";

function hasFullContainment(input: { min: number; max: number }[]) {
  if (input[0].min <= input[1].min && input[0].max >= input[1].max) {
    return true;
  }

  if (input[1].min <= input[0].min && input[1].max >= input[0].max) {
    return true;
  }
  return false;
}

let sampleContainedCount = 0, puzzleContainedCount = 0;

sample.forEach((pair) => {
  if (hasFullContainment(pair)) sampleContainedCount += 1;
});

puzzle.forEach((pair) => {
  if (hasFullContainment(pair)) puzzleContainedCount += 1;
});

console.log("Sample (Control): ", sampleContainedCount);
console.log("Puzzle  (Actual): ", puzzleContainedCount);
