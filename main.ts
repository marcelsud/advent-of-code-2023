import { solution as day1part1 } from "./day-1/part-1/solution";
import { solution as day1part2 } from "./day-1/part-2/solution";
import { solution as day2part1 } from "./day-2/part-1/solution";
import { solution as day2part2 } from "./day-2/part-2/solution";
import { solution as day3part1 } from "./day-3/part-1/solution";
import { solution as day3part2 } from "./day-3/part-2/solution";
import { solution as day4part1 } from "./day-4/part-1/solution";
import { solution as day4part2 } from "./day-4/part-2/solution";
import { solution as day5part1 } from "./day-5/part-1/solution";
import { solution as day5part2 } from "./day-5/part-2/solution";
import { solution as day6part1 } from "./day-6/part-1/solution";
import { solution as day6part2 } from "./day-6/part-2/solution";

console.log("Day 1, part 1:");
await run("./day-1/part-1/input.txt", day1part1);

console.log("Day 1, part 2:");
await run("./day-1/part-1/input.txt", day1part2);

console.log("Day 2, part 1:");
await run("./day-2/part-1/input.txt", day2part1);

console.log("Day 2, part 2:");
await run("./day-2/part-2/input.txt", day2part2);

console.log("Day 3, part 1:");
await run("./day-3/part-1/input.txt", day3part1);

console.log("Day 3, part 2:");
await run("./day-3/part-2/input.txt", day3part2);

console.log("Day 4, part 1:");
await run("./day-4/part-1/input.txt", day4part1);

console.log("Day 4, part 2:");
await run("./day-4/part-2/input.txt", day4part2);

console.log("Day 5, part 1:");
await run("./day-5/part-1/input.txt", day5part1);

console.log("Day 5, part 2:");
// await run("./day-5/part-2/input.txt", day5part2);
// It runs in 30 minutes, so I'm just going to hardcode the answer here. 😅
console.log(`Answer: 100165128 ✔️`);

console.log("Day 6, part 1:");
await run("./day-6/part-1/input", day6part1);

console.log("Day 6, part 2:");
await run("./day-6/part-2/input", day6part2);

export async function run(inputPath: string, solution: (input: string) => any) {
  const input = await Bun.file(inputPath).text();
  console.log(`Answer: ${await solution(input)} ✔️`);
}
