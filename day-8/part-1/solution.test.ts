import { test, expect } from "bun:test";
import { solution } from "./solution";

const sample = await Bun.file("./day-8/part-1/sample").text();

test("solution", () => {
  expect(solution(sample)).toEqual(2);
});
