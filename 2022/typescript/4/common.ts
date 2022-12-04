
export const puzzleInput = Deno.readTextFileSync("./inputs/4.txt");
export const sampleInput = Deno.readTextFileSync("./inputs/4_sample.txt");

function parseInput(input: string) {
  return input.trim().split("\n").map((pair) =>
    pair.split(",").map((assignment) =>
      assignment.split("-").map((num) => parseInt(num))
    ).map((numArray) => ({ min: numArray[0], max: numArray[1] }))
  );
}

export const sample = parseInput(sampleInput);
export const puzzle = parseInput(puzzleInput);
