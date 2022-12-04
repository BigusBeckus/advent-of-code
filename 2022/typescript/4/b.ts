export const puzzleInput = Deno.readTextFileSync("./inputs/4.txt");
export const sampleInput = Deno.readTextFileSync("./inputs/4_sample.txt");

function parseInput(input: string) {
  return input.trim().split("\n").map((pair) =>
    pair.split(",").map((assignment) =>
      assignment.split("-").map((num) => parseInt(num))
    ).map((numArray) => ({ min: numArray[0], max: numArray[1] }))
  );
}

function hasOverlap(input: { min: number; max: number }[]) {
  if (input[0].min <= input[1].min) {
    return input[0].max >= input[1].min;
  } else {
    return input[1].max >= input[0].min;
  }
}

let sampleOverlapingCount = 0, puzzleOverlapingCount = 0;

const sample = parseInput(sampleInput);
sample.forEach((pair) => {
  if (hasOverlap(pair)) sampleOverlapingCount += 1;
});

const puzzle = parseInput(puzzleInput);
puzzle.forEach((pair) => {
  if (hasOverlap(pair)) puzzleOverlapingCount += 1;
});

console.log("Sample (Control): ", sampleOverlapingCount);
console.log("Puzzle  (Actual): ", puzzleOverlapingCount);
