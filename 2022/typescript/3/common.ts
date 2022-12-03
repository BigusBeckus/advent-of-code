function getItemTypePriority(itemType: string) {
  const itemTypeAscii = itemType.charCodeAt(0);
  // Assign priorities 1 - 26 to a - z
  if (itemTypeAscii >= 97 && itemTypeAscii <= 122) {
    return itemTypeAscii - 96;
  } // Assign priorites 27 - 52 to A - Z
  else if (itemTypeAscii >= 65 && itemTypeAscii <= 90) {
    return itemTypeAscii - 38; // 65 - 27
  } else {
    return 0;
  }
}

export function getCommonItemPriority(itemLists: string[]) {
  const [first, ...remaining] = itemLists;
  for (const item of first) {
    const commonFound = remaining.reduce(
      (prev, curr) => prev && curr.includes(item),
      true,
    );
    if (commonFound) {
      return getItemTypePriority(item);
    }
  }
  return 0;
}

export const puzzleInput = Deno.readTextFileSync("./inputs/3.txt");
export const sampleInput = Deno.readTextFileSync("./inputs/3_sample.txt");
