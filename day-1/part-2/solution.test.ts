import { expect, test } from "bun:test";
import { solution, convert } from "./solution";

const sample = await Bun.file("./day-1/part-2/sample").text();

test("it should convert each line correctly", () => {
  expect(convert("two1nine")).toBe(29);
  expect(convert("eightwothree")).toBe(83);
  expect(convert("abcone2threexyz")).toBe(13);
  expect(convert("xtwone3four")).toBe(24);
  expect(convert("4nineeightseven2")).toBe(42);
  expect(convert("zoneight234")).toBe(14);
  expect(convert("7pqrstsixteen")).toBe(76);
});

test("adding these together produces 281", () => {
  expect(solution(sample)).toBe(281);
});
