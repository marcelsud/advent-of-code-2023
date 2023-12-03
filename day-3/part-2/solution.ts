export function solution(input: string): number {
  const lines = input.split("\n");
  const symbols = ["*"];
  const reg = /\d+/g;

  const gearCoords = collectGearCoordinates(lines, symbols);
  const numbers = collectNumbers(lines, reg);

  return calculateValue(gearCoords, numbers);
}

function collectGearCoordinates(
  lines: string[],
  symbols: string[]
): Array<Array<[number, number]>> {
  const gearCoords: Array<Array<[number, number]>> = [];
  symbols.forEach((symbol) => {
    lines.forEach((row, i) => {
      row.split("").forEach((char, j) => {
        if (char === symbol) {
          gearCoords.push(getAdjacentCoords(i, j));
        }
      });
    });
  });
  return gearCoords;
}

function getAdjacentCoords(i: number, j: number): Array<[number, number]> {
  return [
    [i - 1, j],
    [i + 1, j],
    [i, j - 1],
    [i, j + 1],
    [i - 1, j - 1],
    [i - 1, j + 1],
    [i + 1, j - 1],
    [i + 1, j + 1],
  ];
}

function collectNumbers(lines: string[], reg: RegExp) {
  return lines.flatMap((row, i) => {
    return [...row.matchAll(reg)].map((match) => {
      const start = match.index ?? 0;
      const wordCoords = Array.from({ length: match[0].length }, (_, j) => [
        i,
        start + j,
      ]);
      return { coords: wordCoords, val: +match[0] };
    });
  });
}

function calculateValue(
  gearCoords: Array<Array<[number, number]>>,
  numbers: any[]
): number {
  let val = 0;
  gearCoords.forEach((gear) => {
    const adjacentNumbers = numbers.filter(({ coords }) =>
      gear.some((gearCoord) =>
        coords.some(
          (coord: any) => coord[0] === gearCoord[0] && coord[1] === gearCoord[1]
        )
      )
    );

    if (adjacentNumbers.length > 1) {
      val += adjacentNumbers.reduce((acc, { val }) => acc * val, 1);
    }
  });
  return val;
}
