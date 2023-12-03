import { test, expect } from "bun:test";
import { solution } from "./solution";

const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

test("adding up all of the gear ratios produces 467835", () => {
  const total = solution(input);
  expect(total).toBe(467835);
});
