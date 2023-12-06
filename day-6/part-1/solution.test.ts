import { expect, test } from "bun:test";
import { calculateWaysOfWinning, parseRaces, solution } from "./solution";

const sample = await Bun.file("./day-6/part-1/sample").text();

test("parse races", () => {
  expect(parseRaces(sample.split("\n"))).toEqual([
    { time: 7, recordDistance: 9 },
    { time: 15, recordDistance: 40 },
    { time: 30, recordDistance: 200 },
  ]);
});

test("calculate ways of winning", () => {
  expect(calculateWaysOfWinning(parseRaces(sample.split("\n")))).toEqual([
    4, 8, 9,
  ]);
});

test("solution", () => {
  expect(solution(sample)).toEqual(288);
});
