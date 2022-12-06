const puzzleInput = Deno.readTextFileSync("../inputs/6.txt");
const sampleInput = Deno.readTextFileSync("../inputs/6_sample.txt");

export const samples = sampleInput.trim().split("\n");
export const puzzle = puzzleInput.trim();

export function findStartOfPacketMarker(input: string, sequenceLength = 4) {
  const markerCandidate: string[] = [];
  for (let i = 0; i < input.length; i++) {
    const character = input[i];
    if (markerCandidate.includes(character)) {
      const charIndex = markerCandidate.indexOf(character);
      markerCandidate.splice(0, charIndex + 1);
    }
    if (markerCandidate.length === sequenceLength - 1) {
      return i + 1;
    }
    markerCandidate.push(character);
  }
}
