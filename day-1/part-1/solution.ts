export function solution(input: string) {
  return input
    .split("\n")
    .map((str: string) => {
      const digits = str
        .split("")
        .map((x) => parseInt(x))
        .filter((n) => !Number.isNaN(n));
      return parseInt([digits.at(0), digits.at(-1)].join(""));
    })
    .reduce((a, b) => a + b);
}
