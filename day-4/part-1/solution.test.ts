import { test, expect } from "bun:test";
import { calculateScore, parseCard, solution } from "./solution";

const sample = await Bun.file("./day-4/part-1/sample").text();

test("parse the card", () => {
  const card = parseCard("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53");
  expect(card.number).toEqual(1);
  expect(card.myNumbers).toEqual([83, 86, 6, 31, 17, 9, 48, 53]);
  expect(card.winningNumbers).toEqual([41, 48, 83, 86, 17]);
  expect(card.matches).toEqual(4);
});

test("calculate the score", () => {
  const lines = sample.split("\n");
  expect(calculateScore(parseCard(lines[0]))).toEqual(8);
  expect(calculateScore(parseCard(lines[1]))).toEqual(2);
  expect(calculateScore(parseCard(lines[2]))).toEqual(2);
  expect(calculateScore(parseCard(lines[3]))).toEqual(1);
  expect(calculateScore(parseCard(lines[4]))).toEqual(0);
  expect(calculateScore(parseCard(lines[5]))).toEqual(0);
});

test("solution", () => {
  const total = solution(sample);
  expect(total).toEqual(13);
});
