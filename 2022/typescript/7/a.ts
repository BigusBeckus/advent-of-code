import { DirNode, puzzleDirTree, sampleDirTree, treeSum } from "./common.ts";
function treeSumWithMinTreshold(root: DirNode, treshold = 100000): number {
  if (root.children && root.children.length > 0) {
    let sum = treeSum(root);
    if (sum > treshold) {
      sum = 0;
    }
    return sum + root.children.reduce(
      (prev, curr) => prev + treeSumWithMinTreshold(curr),
      0,
    );
  }
  return 0;
}

// outputTree(sampleDirTree);
console.log("Sample: ", treeSumWithMinTreshold(sampleDirTree));
console.log("Puzzle: ", treeSumWithMinTreshold(puzzleDirTree));
