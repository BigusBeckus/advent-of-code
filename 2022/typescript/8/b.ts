import { puzzle, sample } from "./common.ts";

function getHighestSceinicScore(grid: number[][]) {
  const sceinicScores: number[] = [];
  for (let i = 1; i < grid.length - 1; i++) {
    const row = grid[i];
    for (let j = 1; j < row.length - 1; j++) {
      const current = row[j];
      const column = grid.map((row) => row[j]);

      const leftView = grid[i].slice(0, j).reverse();
      const rightView = grid[i].slice(j + 1);
      const upView = column.slice(0, i).reverse();
      const downView = column.slice(i + 1);

      const sceinicScore = [leftView, rightView, upView, downView].map(
        (view) => {
          const coverIndex = view.findIndex((item) => item >= current);
          return coverIndex === -1 ? view.length : coverIndex + 1;
        },
      ).reduce((prev, curr) => prev * curr, 1);
      sceinicScores.push(sceinicScore);
    }
  }
  return sceinicScores;
}

console.log("Sample: ", Math.max(...getHighestSceinicScore(sample)));
console.log("Puzzle: ", Math.max(...getHighestSceinicScore(puzzle)));
