type Almanac = {
  [key: string]: {
    source: string;
    destination: string;
    ranges: [number, number, number][];
    map: Record<number, number>;
  };
};

export function solution(input: string) {
  const lines = input.split("\n");
  const initialSeeds = lines[0].split(": ")[1].split(" ").map(Number);
  const almanac = parseAlmanac(lines);
  let lowestLocationNumber = Number.MAX_SAFE_INTEGER;

  for (const seed of initialSeeds) {
    let range = getRangeFor(almanac, "seed-to-soil", seed);
    const soil = range ? range[0] - range[1] + seed : seed;

    range = getRangeFor(almanac, "soil-to-fertilizer", soil);
    const fertilizer = range ? range[0] - range[1] + soil : soil;

    range = getRangeFor(almanac, "fertilizer-to-water", fertilizer);
    const water = range ? range[0] - range[1] + fertilizer : fertilizer;

    range = getRangeFor(almanac, "water-to-light", water);
    const light = range ? range[0] - range[1] + water : water;

    range = getRangeFor(almanac, "light-to-temperature", light);
    const temperature = range ? range[0] - range[1] + light : light;

    range = getRangeFor(almanac, "temperature-to-humidity", temperature);
    const humidity = range ? range[0] - range[1] + temperature : temperature;

    range = getRangeFor(almanac, "humidity-to-location", humidity);
    const location = range ? range[0] - range[1] + humidity : humidity;

    lowestLocationNumber = Math.min(lowestLocationNumber, location);
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

  // for (const entry of Object.values(almanac)) {
  //   entry.ranges.map((range) => {
  //     const [tableOffset, start, length] = [...range];
  //     const max = start + length - 1;
  //     let j = 0;
  //     for (let k = start; k <= max; k++) {
  //       entry.map[k] = tableOffset + j++;
  //     }
  //   });
  // }

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
