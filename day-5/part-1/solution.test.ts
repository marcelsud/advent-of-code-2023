import { expect, test } from "bun:test";
import { solution } from "./solution";

const sample = await Bun.file("./day-5/part-1/sample").text();

test("solution", () => {
  const location = solution(sample);
  expect(location).toBe(35);
});
