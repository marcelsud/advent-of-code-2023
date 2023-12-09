export function predictNextValue(numbers: number[]): number {
  const finalNumbers = calculate(numbers);
  return (numbers.pop() || 0) - (finalNumbers.pop() || 0);
}

function calculate(numbers: number[]) {
  if (numbers.every((n) => n === 0)) {
    numbers.push(0);
    return numbers;
  }
  const diffs: number[] = [];
  for (let i = 0; i < numbers.length - 1; i++) {
    diffs.push(numbers[i + 1] - numbers[i]);
  }
  const prediction = calculate(diffs);
  const result = prediction[prediction.length - 1] - diffs[diffs.length - 1];
  diffs.push(result);
  return diffs;
}

export function solution(input: string): number {
  return input
    .split("\n")
    .map((line) => predictNextValue(line.split(" ").map(Number)))
    .reduce((acc, v) => acc + v, 0);
}
