import {
  getCommonItemPriority,
  puzzleInput,
  sampleInput,
} from "./common.ts";

const sample = sampleInput.trim().split("\n");
const puzzle = puzzleInput.trim().split("\n");

let sampleGroupSum = 0, puzzleGroupSum = 0;
for (let i = 0; i < sample.length; i += 3) {
  sampleGroupSum += getCommonItemPriority([
    sample[i],
    sample[i + 1],
    sample[i + 2],
  ]);
}
for (let i = 0; i < puzzle.length; i += 3) {
  puzzleGroupSum += getCommonItemPriority([
    puzzle[i],
    puzzle[i + 1],
    puzzle[i + 2],
  ]);
}

console.log("Sample group (Control): ", sampleGroupSum);
console.log("Puzzle group (Actual) : ", puzzleGroupSum);
