import { expect, test } from "bun:test";
import { calculateWaysOfWinning, parseRaces, solution } from "./solution";

const sample = await Bun.file("./day-6/part-1/sample").text();

test("parse races", () => {
  expect(parseRaces(sample.split("\n"))).toEqual([
    { time: 71530, recordDistance: 940200 },
  ]);
});

test("calculate ways of winning", () => {
  expect(calculateWaysOfWinning(parseRaces(sample.split("\n")))).toEqual([
    71503,
  ]);
});

test("solution", () => {
  expect(solution(sample)).toEqual(71503);
});
