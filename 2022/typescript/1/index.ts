const input = Deno.readTextFileSync("../inputs/1.txt");

const elfCarryAmounts = input.trim().split("\n\n").map((elfAmount) =>
  elfAmount.split("\n").map((amountStr) => parseInt(amountStr))
);
const calorieTotals = elfCarryAmounts.map((elfCalorieList) =>
  elfCalorieList.reduce((prev, curr) => prev + curr, 0)
).sort();

console.log(calorieTotals[calorieTotals.length - 1]);
console.log(
  [
    calorieTotals[calorieTotals.length - 1],
    calorieTotals[calorieTotals.length - 2],
    calorieTotals[calorieTotals.length - 3],
  ].reduce((prev, curr) => prev + curr, 0),
);
