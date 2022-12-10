const sampleInput = Deno.readTextFileSync("../inputs/8_sample.txt");
const puzzleInput = Deno.readTextFileSync("../inputs/8.txt");

function parseInput(input: string) {
  return input.trim().split("\n").map((line) =>
    line.split("").map((character) => parseInt(character))
  );
}

export const sample = parseInput(sampleInput);
export const puzzle = parseInput(puzzleInput);

