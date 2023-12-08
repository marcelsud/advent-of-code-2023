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

function findLeastCommonMultiple(a: number, b: number): number {
  const gcd = (x: number, y: number): number => {
    while (y > 0) [x, y] = [y, x % y];
    return x;
  };
  return (a * b) / gcd(a, b);
}

export function solution(input: string): number {
  const { directions, nodes } = parseInput(input);
  const starts = Object.keys(nodes).filter((id) => id[2] === "A");
  const calculatePathLength = (start: string): number => {
    let steps = 0;
    let current = start;
    while (current[2] !== "Z") {
      current =
        nodes[current][directions[steps % directions.length] === "L" ? 0 : 1];
      steps++;
    }
    return steps;
  };
  const pathLengths = starts.map(calculatePathLength);
  return pathLengths.reduce(findLeastCommonMultiple, 1);
}
