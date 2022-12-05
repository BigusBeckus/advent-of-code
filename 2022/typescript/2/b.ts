const sampleInput = Deno.readTextFileSync("../inputs/2_sample.txt");
const challengeInput = Deno.readTextFileSync("../inputs/2.txt");

// Legend
// ===
// X - Lose
// Y - Draw
// Z - Win
//
// A - 1 - Rock
// B - 2 - Paper
// C - 3 - Scissors

// Notes
// ===
// A
// - Lose: 2
// - Draw: 1
// - Win:  3
//
// B
// - Lose: 3
// - Draw: 2
// - Win:  1
//
// C
// - Lose: 1
// - Draw: 3
// - Win:  2

function getShapeScore(letter: string) {
  switch (letter) {
    case "A":
      return 1;
    case "B":
      return 2;
    case "C":
      return 3;
    default:
      return 0;
  }
}

function getWinnerShapeScore(loserScore: number) {
  switch (loserScore) {
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 1;
    default:
      return 0;
  }
}

function getLoserShapeScore(winnerScore: number) {
  switch (winnerScore) {
    case 1:
      return 3;
    case 2:
      return 1;
    case 3:
      return 2;
    default:
      return 0;
  }
}

function getRoundScore(opponentShape: string, outcome: string) {
  const opponentShapeScore = getShapeScore(opponentShape);
  // Draw
  if (outcome === "Y") {
    return opponentShapeScore + 3;
  }

  // Win
  if (outcome === "Z") {
    return getWinnerShapeScore(opponentShapeScore) + 6;
  }

  // Lose
  return getLoserShapeScore(opponentShapeScore);
}

function getTotalScore(input: string) {
  const plays = input.trimEnd().split("\n").map((line) => line.split(" "));
  console.log(plays.length + " rounds");
  console.log(
    plays.reduce((prev, curr) => prev + getRoundScore(curr[0], curr[1]), 0),
  );
}

getTotalScore(sampleInput);
getTotalScore(challengeInput);
