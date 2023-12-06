type Race = { time: number; recordDistance: number };

export function parseRaces(lines: string[]) {
  const time = lines[0]
    .split(":")[1]
    .split(" ")
    .filter((n) => n)
    .map(Number)
    .join("");

  const distance = lines[1]
    .split(":")[1]
    .split(" ")
    .filter((n) => n)
    .map(Number)
    .join("");
  const races: Race[] = [
    { time: Number(time), recordDistance: Number(distance) },
  ];
  return races;
}

export function calculateWaysOfWinning(races: Race[]): number[] {
  const numberOfWays: number[] = [];
  races.forEach((race) => {
    let atLeast: number | undefined;
    let atMost: number | undefined;
    for (let i = 1; i < race.time; i++) {
      const remaining_time = race.time - i;
      const speed = i;
      const distance = remaining_time * speed;
      if (distance > race.recordDistance) {
        if (!atLeast) {
          atLeast = i;
        }
        atMost = i;
      }
    }
    if (atLeast && atMost) {
      numberOfWays.push(atMost - atLeast + 1);
    }
  });
  return numberOfWays;
}

export function solution(input: string): number {
  const lines = input.split("\n");
  const races = parseRaces(lines);
  const total = calculateWaysOfWinning(races);
  return total.reduce((a, b) => a * b, 1);
}
