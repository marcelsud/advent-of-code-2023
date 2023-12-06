import { test, expect } from "bun:test";
import { parseCard, solution } from "./solution";

const sample = await Bun.file("./day-4/part-2/sample").text();

test("parse the card", () => {
  const card = parseCard("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53");
  expect(card.number).toEqual(1);
  expect(card.myNumbers).toEqual([83, 86, 6, 31, 17, 9, 48, 53]);
  expect(card.winningNumbers).toEqual([41, 48, 83, 86, 17]);
  expect(card.matches).toEqual(4);
});

test("solution", () => {
  expect(solution(sample)).toEqual(30);
});
