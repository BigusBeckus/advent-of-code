import { CrateStack, getResults, Move, puzzle, sample } from "./common.ts";

function execute(input: { crates: CrateStack[]; moves: Move[] }) {
  const { crates, moves } = input;
  moves.forEach((move) => {
    const source = crates.find((crate) => crate.index === move.source);
    const destination = crates.find((crate) =>
      crate.index === move.destination
    );
    if (source && destination) {
      const transferedCrates = source.crates.splice(
        source.crates.length - move.count,
        source.crates.length,
      );
      if (transferedCrates) {
        destination.crates = [...destination.crates, ...transferedCrates];
      }
    }
  });
  return crates;
}

const sampleResult = getResults(execute(sample));
const puzzleResult = getResults(execute(puzzle));

console.log(sampleResult);
console.log(puzzleResult);
