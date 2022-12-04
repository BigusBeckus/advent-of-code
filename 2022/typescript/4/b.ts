import { puzzle, sample } from "./common.ts";

function hasOverlap(input: { min: number; max: number }[]) {
  if (input[0].min <= input[1].min) {
    return input[0].max >= input[1].min;
  } else {
    return input[1].max >= input[0].min;
  }
}

let sampleOverlapingCount = 0, puzzleOverlapingCount = 0;

sample.forEach((pair) => {
  if (hasOverlap(pair)) sampleOverlapingCount += 1;
});

puzzle.forEach((pair) => {
  if (hasOverlap(pair)) puzzleOverlapingCount += 1;
});

console.log("Sample (Control): ", sampleOverlapingCount);
console.log("Puzzle  (Actual): ", puzzleOverlapingCount);
