import { test, expect } from "bun:test";
import { predictNextValue, solution } from "./solution";

const sample = await Bun.file("./day-9/part-2/sample").text();
const lines = sample.split("\n");

test("case 1", () => {
  expect(predictNextValue(lines[0].split(" ").map(Number))).toBe(18);
});

test("case 2", () => {
  expect(predictNextValue(lines[1].split(" ").map(Number))).toBe(28);
});

test("case 3", () => {
  expect(predictNextValue(lines[2].split(" ").map(Number))).toBe(68);
});

test("solution", () => {
  expect(solution(sample)).toEqual(114);
});
