const puzzleInput = Deno.readTextFileSync("./inputs/3.txt");
const sampleInput = Deno.readTextFileSync("./inputs/3_sample.txt");

function getItemTypePriority(itemType: string) {
  const itemTypeAscii = itemType.charCodeAt(0);
  // Assign priorities 1 - 26 to a - z
  if (itemTypeAscii >= 97 && itemTypeAscii <= 122) {
    return itemTypeAscii - 96;
  } // Assign priorites 27 - 52 to A - Z
  else if (itemTypeAscii >= 65 && itemTypeAscii <= 90) {
    return itemTypeAscii - 38; // 65 - 27
  } else {
    return 0;
  }
}

function getCommonItemPriority(rucksack: string[]) {
  const [firstCompartment, secondCompartment] = rucksack;
  for (const item of firstCompartment) {
    const commonFound = secondCompartment.includes(item);
    if (commonFound) {
      return getItemTypePriority(item);
    }
  }
  return 0;
}

function getCompartmentalized(input: string) {
  return [
    input.slice(0, input.length / 2),
    input.slice(input.length / 2),
  ];
}

const sampleCommons: number[] = [], puzzleCommons: number[] = [];

const sample = sampleInput.trim().split("\n").map((rucksack) =>
  getCompartmentalized(rucksack)
);
const puzzle = puzzleInput.trim().split("\n").map((rucksack) =>
  getCompartmentalized(rucksack)
);

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
