import { test, expect } from "bun:test";
import { calculateScore, parseCard, solution } from "./solution";

const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

test("parse the card", () => {
  const card = parseCard("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53");
  expect(card.number).toEqual(1);
  expect(card.myNumbers).toEqual([83, 86, 6, 31, 17, 9, 48, 53]);
  expect(card.winningNumbers).toEqual([41, 48, 83, 86, 17]);
  expect(card.matches).toEqual(4);
});

test("calculate the score", () => {
  const lines = input.split("\n");
  expect(calculateScore(parseCard(lines[0]))).toEqual(8);
  expect(calculateScore(parseCard(lines[1]))).toEqual(2);
  expect(calculateScore(parseCard(lines[2]))).toEqual(2);
  expect(calculateScore(parseCard(lines[3]))).toEqual(1);
  expect(calculateScore(parseCard(lines[4]))).toEqual(0);
  expect(calculateScore(parseCard(lines[5]))).toEqual(0);
});

test("solution", () => {
  const total = solution(input);
  expect(total).toEqual(13);
});