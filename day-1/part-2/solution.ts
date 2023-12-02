const lettersMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

export function translate(phrase: string): string {
  let newPhrase = "";
  for (let i = 0; i < phrase.length; i++) {
    let matched = false;
    for (let [key, value] of Object.entries(lettersMap)) {
      if (phrase.slice(i, i + key.length) === key) {
        newPhrase += value;
        i += key.length - 1;
        matched = true;
      }
    }
    if (!matched) newPhrase += phrase[i];
  }
  return newPhrase;
}

export function convert(line: string): number {
  const digits = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ]
    .reduce(
      (acc, word, index) => acc.replaceAll(word, word + (index + 1) + word),
      line
    )
    .split("")
    .map(Number)
    .filter(Boolean);
  return parseInt([digits.at(0), digits.at(-1)].join(""));
}

export function solution(input: string): number {
  return (
    input
      .split("\n")
      // .map((line: string) => translate(line))
      .map((phrase: string) => convert(phrase))
      .reduce((a, b) => a + b)
  );
}
