import { test, expect } from "bun:test";
import { solution } from "./solution";

const sample = await Bun.file("./day-3/part-2/sample").text();

test("adding up all of the gear ratios produces 467835", () => {
  const total = solution(sample);
  expect(total).toBe(467835);
});
