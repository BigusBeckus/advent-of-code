import { puzzle, sample } from "./common.ts";

function isVisible(list: number[], index: number) {
  const item = list[index];
  // console.log("Direction: ", direction);
  // console.log("Number: ", list[index]);
  // console.log("Index:  ", index);
  // console.log("List:   ", list);
  // console.log("Left:   ", list.slice(0, index));
  // console.log("Right:  ", list.slice(index + 1));
  const visible = Math.max(...list.slice(0, index)) < item ||
    Math.max(...list.slice(index + 1)) < item;
  // console.log("Visible ", direction, visible);
  // console.log("\n");
  return visible;
}

function getVisibleTreesCount(grid: number[][]) {
  const visibleTrees: number[] = [];
  for (const [i, row] of grid.entries()) {
    // Add top and bottom edges to visible list
    if (i === 0 || i === grid.length - 1) {
      visibleTrees.push(...row);
      continue;
    }

    for (const [j, col] of row.entries()) {
      // Add right and left edges to visible list
      if (j === 0 || j === row.length - 1) {
        visibleTrees.push(col);
        continue;
      }
      const visible = isVisible(row, j) ||
        isVisible(grid.map((line) => line[j]), i);
      if (visible) {
        visibleTrees.push(col);
        // console.log("Added: ", col);
        // console.log("\n");
      }
    }
  }
  // return visibleTreeHeights.reduce((prev, curr) => prev + curr, 0);
  return visibleTrees.length;
}

console.log(
  "Sample: ",
  getVisibleTreesCount(sample),
);
console.log(
  "Puzzle: ",
  getVisibleTreesCount(puzzle),
);
