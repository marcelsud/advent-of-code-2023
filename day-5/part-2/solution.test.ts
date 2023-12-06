import { expect, test } from "bun:test";
import { solution } from "./solution";

const sample = await Bun.file("./day-5/part-2/sample").text();

test("solution", async () => {
  const location = solution(sample);
  expect(location).toBe(46);
});
