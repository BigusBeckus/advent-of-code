export const sampleInput = Deno.readTextFileSync("../inputs/5_sample.txt");
export const puzzleInput = Deno.readTextFileSync("../inputs/5.txt");

export type CrateStack = {
  index: number;
  crates: string[];
};

export type Move = {
  count: number;
  source: number;
  destination: number;
};

function parseCrates(cratesStr: string) {
  const crates: string[][] = [];
  let iterator = 0, stackIndex = 0, isSeparator = false;
  while (iterator < cratesStr.length) {
    const increment = isSeparator ? 1 : 3;
    const current = cratesStr.slice(iterator, iterator + increment);

    if (!isSeparator) {
      const item = current.trim() ? current[1] : "";
      if (item) {
        if (crates[stackIndex]) {
          crates[stackIndex].unshift(item);
        } else {
          crates[stackIndex] = [item];
        }
      }
      stackIndex++;
    } else {
      if (current === "\n") {
        stackIndex = 0;
      }
    }

    iterator += increment;
    isSeparator = !isSeparator;
  }
  return crates.map((crateList) => ({
    index: parseInt(crateList[0]),
    crates: crateList.splice(1),
  } as CrateStack));
}

function parseMoves(movesStr: string) {
  const movesRegex = /^move ([0-9]+) from ([0-9]+) to ([0-9]+)$/;
  const moves: Move[] = [];
  movesStr.split("\n").forEach((moveLine) => {
    const matches = movesRegex.exec(moveLine);
    if (matches) {
      moves.push({
        count: parseInt(matches[1]),
        source: parseInt(matches[2]),
        destination: parseInt(matches[3]),
      } as Move);
    }
  });
  return moves;
}

function parseInput(input: string) {
  const [cratesStr, movesStr] = input.split("\n\n");
  return { crates: parseCrates(cratesStr), moves: parseMoves(movesStr) };
}

export function getResults(crates: CrateStack[]) {
  let result = "";
  crates.forEach((crate) => {
    const top = crate.crates[crate.crates.length - 1];
    if (top) {
      result += top;
    }
  });
  return result;
}

export const sample = parseInput(sampleInput);
export const puzzle = parseInput(puzzleInput);
