import { solution as day1part1 } from "./day-1/part-1/solution";
import { solution as day1part2 } from "./day-1/part-2/solution";

console.log("Day 1, part 1:");
await run("./day-1/part-1/input.txt", day1part1);

console.log("Day 1, part 2:");
await run("./day-1/part-1/input.txt", day1part2);

export async function run(inputPath: string, solution: (input: string) => any) {
  const input = await Bun.file(inputPath).text();
  console.log(`Answer: ${solution(input)} ✔️`);
}
