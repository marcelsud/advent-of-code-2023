import { test, expect } from "bun:test";
import { HandTypes, parseHand, rankHands, solution } from "./solution";

const sample = await Bun.file("./day-7/part-1/sample").text();

test("parse hand", () => {
  expect(parseHand("32T3K 765")).toEqual({
    original: {
      cards: ["3", "2", "T", "3", "K"],
      map: {
        "2": 1,
        "3": 2,
        T: 1,
        K: 1,
      },
      type: HandTypes.ONE_PAIR,
    },
    remapped: {
      cards: ["3", "2", "T", "3", "K"],
      map: {
        "2": 1,
        "3": 2,
        T: 1,
        K: 1,
      },
      type: HandTypes.ONE_PAIR,
    },
    bid: 765,
  });
  expect(parseHand("KK677 28")).toEqual({
    original: {
      cards: ["K", "K", "6", "7", "7"],
      map: {
        K: 2,
        "7": 2,
        "6": 1,
      },
      type: HandTypes.TWO_PAIR,
    },
    remapped: {
      cards: ["K", "K", "6", "7", "7"],
      map: {
        K: 2,
        "7": 2,
        "6": 1,
      },
      type: HandTypes.TWO_PAIR,
    },
    bid: 28,
  });
  expect(parseHand("KTJJT 220")).toEqual({
    original: {
      cards: ["K", "T", "J", "J", "T"],
      map: {
        K: 1,
        T: 2,
        J: 2,
      },
      type: HandTypes.TWO_PAIR,
    },
    remapped: {
      cards: ["K", "T", "T", "T", "T"],
      map: {
        K: 1,
        T: 4,
      },
      type: HandTypes.FOUR_OF_A_KIND,
    },
    bid: 220,
  });
  expect(parseHand("T55J5 684")).toEqual({
    original: {
      cards: ["T", "5", "5", "J", "5"],
      map: {
        5: 3,
        T: 1,
        J: 1,
      },
      type: HandTypes.THREE_OF_A_KIND,
    },
    remapped: {
      cards: ["T", "5", "5", "5", "5"],
      map: {
        5: 4,
        T: 1,
      },
      type: HandTypes.FOUR_OF_A_KIND,
    },
    bid: 684,
  });
  expect(parseHand("QQQJA 483")).toEqual({
    original: {
      cards: ["Q", "Q", "Q", "J", "A"],
      map: {
        Q: 3,
        J: 1,
        A: 1,
      },
      type: HandTypes.THREE_OF_A_KIND,
    },
    remapped: {
      cards: ["Q", "Q", "Q", "Q", "A"],
      map: {
        Q: 4,
        A: 1,
      },
      type: HandTypes.FOUR_OF_A_KIND,
    },
    bid: 483,
  });
});

test("sort hands by weakest to strongest", () => {
  const rankedHands = rankHands(sample.split("\n").map(parseHand));
  expect(rankedHands[0].hand.original.cards.join("")).toEqual("32T3K");
  expect(rankedHands[1].hand.original.cards.join("")).toEqual("KK677");
  expect(rankedHands[2].hand.original.cards.join("")).toEqual("T55J5");
  expect(rankedHands[3].hand.original.cards.join("")).toEqual("QQQJA");
  expect(rankedHands[4].hand.original.cards.join("")).toEqual("KTJJT");
});

test("breaking ties between two hands of the same type - edge case 1", () => {
  const input = `QQQQ2 1\nJKKK2 1`;
  const rankedHands = rankHands(input.split("\n").map(parseHand));
  expect(rankedHands[0].hand.original.cards.join("")).toEqual("JKKK2");
  expect(rankedHands[1].hand.original.cards.join("")).toEqual("QQQQ2");
});

test("breaking ties between two hands of the same type - edge case 2", () => {
  const input = `QQQQQ 1\nJJJJJ 1`;
  const rankedHands = rankHands(input.split("\n").map(parseHand));
  expect(rankedHands[0].hand.original.cards.join("")).toEqual("JJJJJ");
  expect(rankedHands[1].hand.original.cards.join("")).toEqual("QQQQQ");
});

test("solution", () => {
  expect(solution(sample)).toEqual(5905);
});
