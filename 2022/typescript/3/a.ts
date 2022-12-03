import { getCommonItemPriority, puzzleInput, sampleInput } from "./common.ts";

export function getCompartmentalized(input: string, compartmentsCount = 2) {
  const compartments = [], increment = input.length / compartmentsCount;

  let lastIndex = 0;
  while (lastIndex < input.length - 1) {
    compartments.push(input.slice(lastIndex, lastIndex + increment));
    lastIndex += increment;
  }
  return compartments;
}

const sample = sampleInput.trim().split("\n").map((rucksack) =>
  getCompartmentalized(rucksack)
);
const puzzle = puzzleInput.trim().split("\n").map((rucksack) =>
  getCompartmentalized(rucksack)
);

const sampleCommons: number[] = [], puzzleCommons: number[] = [];
sample.forEach((rucksack) =>
  sampleCommons.push(getCommonItemPriority(rucksack))
);
puzzle.forEach((rucksack) =>
  puzzleCommons.push(getCommonItemPriority(rucksack))
);

console.log(
  "Sample sum (Control): ",
  sampleCommons.reduce((prev, curr) => prev + curr, 0),
);
console.log(
  "Puzzle sum (Actual) : ",
  puzzleCommons.reduce((prev, curr) => prev + curr, 0),
);
