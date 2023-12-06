import { test, expect } from "bun:test";
import {
  extractNumbers,
  findNumbers,
  NOT_PART_NUMBER,
  PART_NUMBER,
  solution,
} from "./solution";

const sample = await Bun.file("./day-3/part-1/sample").text();
const lines = sample.split("\n");

test("the sum of the part numbers is 4361", () => {
  const numbers = findNumbers(lines, PART_NUMBER);
  expect(numbers.reduce((sum, number) => sum + number, 0)).toBe(4361);
});

test("the sum of the non part numbers is 172", () => {
  const numbers = findNumbers(lines, NOT_PART_NUMBER);
  expect(numbers.reduce((sum, number) => sum + number, 0)).toBe(172);
});

test("the sum of the part numbers is 4361 based on the input", () => {
  const total = solution(sample);
  expect(total).toBe(4361);
});

test("should parse the positions correctly even if the numbers repeat", () => {
  const numbers = extractNumbers(["1..234..1..1"], 0);
  expect(numbers).toStrictEqual([
    { number: 1, position: 0, isPart: false },
    { number: 234, position: 3, isPart: false },
    { number: 1, position: 8, isPart: false },
    { number: 1, position: 11, isPart: false },
  ]);
});
