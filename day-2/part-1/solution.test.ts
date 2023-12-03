import { expect, test } from "bun:test";
import { isPossible, parseGame, solution } from "./solution";

const games = {
  1: "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  2: "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  3: "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  4: "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  5: "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
};
const input = Object.values(games).join("\n");

test("parsing the game with ids and colors", () => {
  expect(parseGame(games[1])).toEqual({
    id: 1,
    blue: [3, 6, 0],
    red: [4, 1, 0],
    green: [0, 2, 2],
  });

  expect(parseGame(games[2])).toEqual({
    id: 2,
    blue: [1, 4, 1],
    red: [0, 1, 0],
    green: [2, 3, 1],
  });

  expect(parseGame(games[3])).toEqual({
    id: 3,
    blue: [6, 5, 0],
    red: [20, 4, 1],
    green: [8, 13, 5],
  });

  expect(parseGame(games[4])).toEqual({
    id: 4,
    blue: [6, 0, 15],
    red: [3, 6, 14],
    green: [1, 3, 3],
  });

  expect(parseGame(games[5])).toEqual({
    id: 5,
    blue: [1, 2],
    red: [6, 1],
    green: [3, 2],
  });
});

test("checks if the game is possible", () => {
  expect(isPossible(parseGame(games[1]))).toBe(true);
  expect(isPossible(parseGame(games[2]))).toBe(true);
  expect(isPossible(parseGame(games[3]))).toBe(false);
  expect(isPossible(parseGame(games[4]))).toBe(false);
  expect(isPossible(parseGame(games[5]))).toBe(true);
});

test("adding up the ids of the possible games should be 8", async () => {
  const total = solution(input);
  expect(total).toBe(8);
});
