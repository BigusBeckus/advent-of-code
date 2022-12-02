// type EncryptedPlay = {
//   letter: string;
//   value: number;
//   name: string;
// }

const sampleInput = Deno.readTextFileSync('./inputs/2_sample.txt');
const challengeInput = Deno.readTextFileSync('./inputs/2a.txt');
// const values: EncryptedPlay = [
//   { letter: 'A', value: 1, name: 'Rock' },
//   { letter: 'X', value: 1, name: 'Rock' },
//   { letter: 'B', value: 2, name: 'Paper' },
//   { letter: 'Y', value: 2, name: 'Paper' },
//   { letter: 'C', value: 3, name: 'Scissors' },
//   { letter: 'Z', value: 3, name: 'Scissors' },
// ]
function getLetterScore(letter: string) {
  if (['A', 'X'].includes(letter))
    return 1;
  if (['B', 'Y'].includes(letter))
    return 2;
  if (['C', 'Z'].includes(letter))
    return 3;

  return 0;
}

function getRoundScore(play: [string, string]) {
  // Win conditions:
  // Opponent     -  Player
  // ============================
  // Rock(1)      -  Paper(2)
  // Paper(2)     -  Scissors(3)
  // Scissors(3)  -  Rock(1)
  const winConditions = ['1-2', '2-3', '3-1'];

  const [opponent, suggestion] = play;
  let totalScore = 0;

  const opponentShapeScore = getLetterScore(opponent);
  const playerShapeScore = getLetterScore(suggestion);

  totalScore += playerShapeScore;

  if (playerShapeScore === opponentShapeScore) {
    // Draw
    totalScore += 3;
  }
  else if (winConditions.includes(`${opponentShapeScore}-${playerShapeScore}`)) {
    totalScore += 6;
  }

  return totalScore;
}

function getTotalScore(input: string) {
  const plays = input.trimEnd().split('\n').map(line => line.split(' '));
  console.log(plays.length + " rounds");
  console.log(plays.reduce((prev, curr) => prev + getRoundScore([curr[0], curr[1]]), 0));
}

getTotalScore(sampleInput);
getTotalScore(challengeInput);

