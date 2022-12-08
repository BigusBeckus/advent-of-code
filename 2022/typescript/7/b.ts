import { DirNode, puzzleDirTree, sampleDirTree, treeSum } from "./common.ts";

function getMinAboveTreshold(root: DirNode, treshold: number) {
  if (!(root.children && root.children.length > 0)) {
    return 0;
  }

  const dirSum = treeSum(root);
  if (dirSum === treshold) {
    return dirSum;
  }
  if (dirSum < treshold) {
    return 0;
  }

  let optimalSize = dirSum;
  for (const child of root.children) {
    const childSize = getMinAboveTreshold(child, treshold);
    if (childSize === treshold) {
      optimalSize = treshold;
      break;
    }
    if (childSize > treshold && childSize < optimalSize) {
      optimalSize = childSize;
    }
  }
  return optimalSize;
}

function getSmallestDeletableDir(
  root: DirNode,
  targetFreeSpace = 30000000,
  totalDiskSpace = 70000000,
) {
  const currentFreeSpace = totalDiskSpace - treeSum(root);
  const requiredFreeSpace = targetFreeSpace - currentFreeSpace;
  return getMinAboveTreshold(root, requiredFreeSpace);
}

console.log("Sample: ", getSmallestDeletableDir(sampleDirTree));
console.log("Puzzle: ", getSmallestDeletableDir(puzzleDirTree));
