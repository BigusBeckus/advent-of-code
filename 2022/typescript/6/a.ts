import { findStartOfPacketMarker, puzzle, samples } from "./common.ts";

console.log("Samples:");
samples.forEach((sample, index) => {
  console.log(`${index + 1}: `, findStartOfPacketMarker(sample));
});
console.log("Puzzle:");
console.log(findStartOfPacketMarker(puzzle));
