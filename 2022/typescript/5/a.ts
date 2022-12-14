import { CrateStack, getResults, Move, puzzle, sample } from "./common.ts";

function execute(input: { crates: CrateStack[]; moves: Move[] }) {
  const { crates, moves } = input;
  moves.forEach((move) => {
    const source = crates.find((crate) => crate.index === move.source);
    const destination = crates.find((crate) =>
      crate.index === move.destination
    );
    if (source && destination) {
      let count = move.count;
      while (count-- > 0) {
        const transferedCrate = source.crates.pop();
        if (transferedCrate) {
          destination.crates.push(transferedCrate);
        }
      }
    }
  });
  return crates;
}

const sampleResult = getResults(execute(sample));
const puzzleResult = getResults(execute(puzzle));

console.log(sampleResult);
console.log(puzzleResult);
