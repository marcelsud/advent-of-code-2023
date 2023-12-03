export const NOT_PART_NUMBER = false;
export const PART_NUMBER = true;

export function takePicture(
  lines: string[],
  number: number,
  lineNumber: number,
  indexOfNumber: number
): string {
  const aboveString = [
    lines[lineNumber - 1] ? lines[lineNumber - 1][indexOfNumber - 1] : ".",
    lines[lineNumber - 1]
      ? lines[lineNumber - 1].slice(
          indexOfNumber,
          indexOfNumber + number.toString().length
        )
      : ".".repeat(number.toString().length),
    lines[lineNumber - 1] &&
    lines[lineNumber - 1][indexOfNumber + number.toString().length]
      ? lines[lineNumber - 1][indexOfNumber + number.toString().length]
      : ".",
  ];
  const besidesString = [
    lines[lineNumber][indexOfNumber - 1]
      ? lines[lineNumber][indexOfNumber - 1]
      : ".",
    number.toString(),
    lines[lineNumber][indexOfNumber + number.toString().length]
      ? lines[lineNumber][indexOfNumber + number.toString().length]
      : ".",
  ];
  const belowString = [
    lines[lineNumber + 1] && lines[lineNumber + 1][indexOfNumber - 1]
      ? lines[lineNumber + 1][indexOfNumber - 1]
      : ".",
    lines[lineNumber + 1]
      ? lines[lineNumber + 1].slice(
          indexOfNumber,
          indexOfNumber + number.toString().length
        )
      : ".".repeat(number.toString().length),
    lines[lineNumber + 1] &&
    lines[lineNumber + 1][indexOfNumber + number.toString().length]
      ? lines[lineNumber + 1][indexOfNumber + number.toString().length]
      : ".",
  ];

  return [
    aboveString.join(""),
    besidesString.join(""),
    belowString.join(""),
  ].join("\n");
}

export function extractNumbers(
  lines: string[],
  lineIndex: number
): {
  number: number;
  position: number;
  isPart: boolean;
}[] {
  const regex = /\d+/g;
  let match;
  let results: {
    number: number;
    position: number;
    isPart: boolean;
  }[] = [];

  while ((match = regex.exec(lines[lineIndex])) !== null) {
    const number = Number(match[0]);
    const picture = takePicture(lines, number, lineIndex, match.index);
    results.push({
      number,
      position: match.index,
      isPart: isPartNumber(picture, number),
    });
  }

  return results;
}

export function isPartNumber(part: string, number: number): boolean {
  return (
    [
      ".".repeat(number.toString().length + 2),
      "." + number.toString() + ".",
      ".".repeat(number.toString().length + 2),
    ].join("\n") !== part
  );
}

export function findNumbers(lines: string[], isPart: boolean): number[] {
  return lines
    .map((_, index) =>
      extractNumbers(lines, index)
        .filter((n) => n.isPart === isPart)
        .map((n) => n.number)
    )
    .flat();
}

export function solution(input: string): number {
  const lines = input.split("\n");
  const numbers = findNumbers(lines, PART_NUMBER);
  return numbers.reduce((sum, number) => sum + number, 0);
}
