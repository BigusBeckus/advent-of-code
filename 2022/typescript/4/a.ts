export const puzzleInput = Deno.readTextFileSync("./inputs/4.txt");
export const sampleInput = Deno.readTextFileSync("./inputs/4_sample.txt");

function parseInput(input: string) {
  return input.trim().split("\n").map((pair) =>
    pair.split(",").map((assignment) =>
      assignment.split("-").map((num) => parseInt(num))
    ).map((numArray) => ({ min: numArray[0], max: numArray[1] }))
  );
}

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

const sample = parseInput(sampleInput);
sample.forEach((pair) => {
  if (hasFullContainment(pair)) sampleContainedCount += 1;
});

const puzzle = parseInput(puzzleInput);
puzzle.forEach((pair) => {
  if (hasFullContainment(pair)) puzzleContainedCount += 1;
});

console.log("Sample (Control): ", sampleContainedCount);
console.log("Puzzle  (Actual): ", puzzleContainedCount);
