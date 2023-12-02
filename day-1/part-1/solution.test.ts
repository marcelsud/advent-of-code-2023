import { expect, test } from "bun:test";
import { solution } from "./solution";

const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

test("adding these together produces 142", () => {
  expect(solution(input)).toEqual(142);
});
