export type Game = {
  id: number;
  blue: number[];
  red: number[];
  green: number[];
};

export type Set = {
  blue: number;
  red: number;
  green: number;
};

export const AVAILABLE_CUBES = {
  red: 12,
  green: 13,
  blue: 14,
};

export function parseGame(line: string): Game {
  const id = parseInt(line.split(":")[0].replace("Game ", ""));
  const sets = line
    .split(":")[1]
    .trim()
    .split(";")
    .map((set) => {
      const colors: Record<string, number> = {
        blue: 0,
        red: 0,
        green: 0,
      };

      set
        .trim()
        .split(",")
        .forEach((s) => {
          const [count, color] = s.trim().split(" ");
          colors[color] = parseInt(count);
        });

      return colors;
    });

  return {
    id,
    blue: sets.map((set) => set.blue),
    red: sets.map((set) => set.red),
    green: sets.map((set) => set.green),
  };
}

export function isPossible(game: Game): boolean {
  if (
    game.blue.every((count) => count <= AVAILABLE_CUBES.blue) &&
    game.red.every((count) => count <= AVAILABLE_CUBES.red) &&
    game.green.every((count) => count <= AVAILABLE_CUBES.green)
  ) {
    return true;
  }
  return false;
}

export function getFewestCubesNeeded(game: Game): Set {
  return {
    blue: Math.max(...game.blue),
    red: Math.max(...game.red),
    green: Math.max(...game.green),
  };
}

export function solution(input: string): number {
  const total = input
    .split("\n")
    .map(parseGame)
    .map(getFewestCubesNeeded)
    .map((set) => {
      return set.blue * set.red * set.green;
    })
    .reduce((acc, power) => acc + power, 0);

  return total;
}
