import { expect, test } from "bun:test";
import {
  getFewestCubesNeeded,
  isPossible,
  parseGame,
  solution,
} from "./solution";

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

test("counting the fewest cubes needed for a game to be possible", async () => {
  expect(getFewestCubesNeeded(parseGame(games[1]))).toEqual({
    blue: 6,
    red: 4,
    green: 2,
  });
  expect(getFewestCubesNeeded(parseGame(games[2]))).toEqual({
    blue: 4,
    red: 1,
    green: 3,
  });
  expect(getFewestCubesNeeded(parseGame(games[3]))).toEqual({
    blue: 6,
    red: 20,
    green: 13,
  });
  expect(getFewestCubesNeeded(parseGame(games[4]))).toEqual({
    blue: 15,
    red: 14,
    green: 3,
  });
  expect(getFewestCubesNeeded(parseGame(games[5]))).toEqual({
    blue: 2,
    red: 6,
    green: 3,
  });
});

test("the power of the minimum set of cubes in game 1 is 48", () => {
  const game = parseGame(games[1]);
  const set = getFewestCubesNeeded(game);
  const power = set.blue * set.red * set.green;
  expect(power).toBe(48);
});

test("the power of the minimum set of cubes in game 2 is 12", () => {
  const game = parseGame(games[2]);
  const set = getFewestCubesNeeded(game);
  const power = set.blue * set.red * set.green;
  expect(power).toBe(12);
});

test("the power of the minimum set of cubes in game 3 is 1560", () => {
  const game = parseGame(games[3]);
  const set = getFewestCubesNeeded(game);
  const power = set.blue * set.red * set.green;
  expect(power).toBe(1560);
});

test("the power of the minimum set of cubes in game 4 is 630", () => {
  const game = parseGame(games[4]);
  const set = getFewestCubesNeeded(game);
  const power = set.blue * set.red * set.green;
  expect(power).toBe(630);
});

test("the power of the minimum set of cubes in game 5 is 36", () => {
  const game = parseGame(games[5]);
  const set = getFewestCubesNeeded(game);
  const power = set.blue * set.red * set.green;
  expect(power).toBe(36);
});

test("adding up the five powers produces the sum 2286", async () => {
  const total = solution(input);
  expect(total).toBe(2286);
});
