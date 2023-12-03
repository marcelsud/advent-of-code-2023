import { expect, test } from "bun:test";
import { isPossible, parseGame, solution } from "./solution";

const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

test("parsing the game with ids and colors", () => {
  expect(
    parseGame("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green")
  ).toEqual({
    id: 1,
    blue: [3, 6, 0],
    red: [4, 1, 0],
    green: [0, 2, 2],
  });

  expect(
    parseGame(
      "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"
    )
  ).toEqual({
    id: 2,
    blue: [1, 4, 1],
    red: [0, 1, 0],
    green: [2, 3, 1],
  });

  expect(
    parseGame(
      "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
    )
  ).toEqual({
    id: 3,
    blue: [6, 5, 0],
    red: [20, 4, 1],
    green: [8, 13, 5],
  });

  expect(
    parseGame(
      "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red"
    )
  ).toEqual({
    id: 4,
    blue: [6, 0, 15],
    red: [3, 6, 14],
    green: [1, 3, 3],
  });

  expect(
    parseGame("Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green")
  ).toEqual({
    id: 5,
    blue: [1, 2],
    red: [6, 1],
    green: [3, 2],
  });
});

test("checks if the game is possible", () => {
  expect(
    isPossible(
      parseGame("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green")
    )
  ).toBe(true);
  expect(
    isPossible(
      parseGame(
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"
      )
    )
  ).toBe(true);
  expect(
    isPossible(
      parseGame(
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
      )
    )
  ).toBe(false);
  expect(
    isPossible(
      parseGame(
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red"
      )
    )
  ).toBe(false);
  expect(
    isPossible(
      parseGame("Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green")
    )
  ).toBe(true);
});

test("adding up the ids of the possible games should be 8", async () => {
  const total = solution(input);
  expect(total).toBe(8);
});
