export function convert(line: string): number {
  const digits = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ]
    .reduce(
      (acc, word, index) => acc.replaceAll(word, word + (index + 1) + word),
      line
    )
    .split("")
    .map(Number)
    .filter(Boolean);
  return parseInt([digits.at(0), digits.at(-1)].join(""));
}

export function solution(input: string): number {
  return input
    .split("\n")
    .map((phrase: string) => convert(phrase))
    .reduce((a, b) => a + b);
}
