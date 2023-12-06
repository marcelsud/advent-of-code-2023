type Almanac = {
  [key: string]: {
    source: string;
    destination: string;
    ranges: [number, number, number][];
    map: Record<number, number>;
  };
};

function* generateRange(start: number, end: number, step = 1) {
  if (end === undefined) [end, start] = [start, 0];
  for (let n = start; n < end; n += step) yield n;
}

export function solution(input: string) {
  const lines = input.split("\n");
  const initialSeeds = lines[0].split(": ")[1].split(" ").map(Number);
  const seedRanges: [number, number][] = [];
  for (let i = 0; i < initialSeeds.length; i += 2) {
    seedRanges.push([initialSeeds[i], initialSeeds[i + 1]]);
  }
  const almanac = parseAlmanac(lines);
  let lowestLocationNumber = Number.MAX_SAFE_INTEGER;
  for (let seedRange of seedRanges) {
    let counter = 0;
    for (const seed of generateRange(
      seedRange[0],
      seedRange[0] + seedRange[1]
    )) {
      let result = seed;
      for (let type of Object.keys(almanac)) {
        const range = getRangeFor(almanac, type, result);
        result = range ? range[0] - range[1] + result : result;
      }
      if (counter > 0 && counter % 100000 === 0) {
        console.log(counter);
      }
      lowestLocationNumber = Math.min(lowestLocationNumber, result);
      counter++;
    }
  }
  return lowestLocationNumber;
}

export function parseAlmanac(lines: string[]) {
  const almanac: Almanac = {};
  let currentType: string;
  for (const line of lines.slice(2)) {
    if (line.includes("map")) {
      const type = line.split(" ")[0];
      const source = type.split("-to-")[0];
      const destination = type.split("-to-")[1];
      almanac[type] = {
        source,
        destination,
        ranges: [],
        map: {},
      };
      currentType = type;
      continue;
    }
    if (line === "") {
      continue;
    }
    almanac[currentType!].ranges.push(
      line.split(" ").map(Number) as [number, number, number]
    );
  }
  return almanac;
}

export function getRangeFor(
  almanac: Almanac,
  type: string,
  value: number
): [number, number, number] | undefined {
  return almanac[type].ranges.find(
    ([_, start, length]) => value >= start && value <= start + length - 1
  );
}
