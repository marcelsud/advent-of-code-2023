function parseInput(input: string): {
  directions: string[];
  nodes: Record<string, [string, string]>;
} {
  const [line1, _, ...lines] = input.split("\n");
  const nodes: Record<string, [string, string]> = {};
  lines.forEach((line) => {
    const nodeId = line.slice(0, 3);
    const leftNode = line.slice(7, 10);
    const rightNode = line.slice(12, 15);
    nodes[nodeId] = [leftNode, rightNode];
  });

  return {
    directions: line1.split(""),
    nodes,
  };
}

export function solution(input: string): number {
  const { directions, nodes } = parseInput(input);

  let steps = 0;
  let current = "AAA";

  while (current !== "ZZZ") {
    const directionIndex =
      directions[steps % directions.length] === "L" ? 0 : 1;
    current = nodes[current][directionIndex];
    steps++;
  }

  return steps;
}
