import { expect, test } from "bun:test";
import { solution } from "./solution";

test("adding these together produces 142", async () => {
  const sample = await Bun.file("./day-1/part-1/sample").text();
  expect(solution(sample)).toEqual(142);
});
