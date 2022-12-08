const puzzleInput = Deno.readTextFileSync("../inputs/7.txt");
const sampleInput = Deno.readTextFileSync("../inputs/7_sample.txt");

export const sample = sampleInput.trim().split("\n");
export const puzzle = puzzleInput.trim().split("\n");

export type DirNode = {
  name: string;
  size?: number;
  parentDir?: DirNode;
  children?: DirNode[];
};

function getDirectoryTree(input: string[]) {
  const root: DirNode = { name: "", children: [] };
  let currentDir = root;

  for (let i = 0; i < input.length; i++) {
    const lineParts = input[i].split(" ");
    if (lineParts[0] === "$") {
      // Commands
      if (lineParts[1] === "ls") {
        continue;
      }
      if (lineParts[1] === "cd") {
        if (lineParts[2] === "/") {
          currentDir = root;
        } else if (lineParts[2] === "..") {
          currentDir = currentDir.parentDir ?? root;
        } else {
          const fileName = lineParts.splice(2).reduce(
            (prev, curr) => `${prev} ${curr}`,
            "",
          );
          const targetDir = currentDir.children?.find((child) =>
            child.name === fileName && child.children !== undefined
          );
          if (targetDir) {
            currentDir = targetDir;
          } else {
            throw new Error("Directory not found");
          }
        }
      }
    } else {
      if (lineParts[0] === "dir") {
        // Directory
        const dirName = lineParts.splice(1).reduce(
          (prev, curr) => `${prev} ${curr}`,
          "",
        );
        if (
          currentDir.children &&
          !currentDir.children.find((child) => child.name === dirName)
        ) {
          currentDir.children!.push({
            name: dirName,
            parentDir: currentDir,
            children: [],
          });
        } else {
          throw new Error("Directory with the same name already exists.");
        }
      } else {
        // File
        const fileSize = parseInt(lineParts[0]);
        const fileName = lineParts.splice(1).reduce(
          (prev, curr) => `${prev} ${curr}`,
          "",
        );
        if (currentDir.children !== undefined) {
          currentDir.children.push({
            name: fileName,
            parentDir: currentDir,
            size: fileSize,
          });
        }
      }
    }
  }

  return root;
}

export function padLeft(text: string, amount: number, padding = "  ") {
  let result = "";
  for (let i = 0; i < amount; i++) {
    result += padding;
  }
  return `${result}${text}`;
}

export function outputTree(root: DirNode, nest = 0) {
  console.log(root.name ? padLeft(`- ${root.name} (dir)`, nest) : "- / (dir)");
  if (root.children) {
    root.children.forEach((child) => {
      let line = "- ";
      if (child.children === undefined) {
        line += `${child.name} (file, size=${child.size ?? "0"})`;
        console.log(padLeft(line, nest + 1));
      } else {
        outputTree(child, nest + 1);
      }
    });
  }
}

export function treeSum(root: DirNode): number {
  if (root.children && root.children.length > 0) {
    return root.children.reduce((prev, curr) => prev + treeSum(curr), 0);
  }
  return root.size ?? 0;
}

export const sampleDirTree = getDirectoryTree(sample);
export const puzzleDirTree = getDirectoryTree(puzzle);
