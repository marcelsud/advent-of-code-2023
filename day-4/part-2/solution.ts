type Card = {
  number: number;
  winningNumbers: number[];
  myNumbers: number[];
  matches: number;
  copies: number;
};

export function parseCard(line: string): Card {
  const number = Number(line.split(":")[0].replace("Card ", ""));
  const winningNumbers = line
    .split(":")[1]
    .split("|")[0]
    .trim()
    .replace(/\s\s+/g, " ")
    .split(" ")
    .map(Number);
  const myNumbers = line
    .split(":")[1]
    .split("|")[1]
    .trim()
    .replace(/\s\s+/g, " ")
    .split(" ")
    .map(Number);

  return {
    number: Number(number),
    winningNumbers,
    myNumbers,
    matches: myNumbers.filter((n) => winningNumbers.includes(n)).length,
    copies: 1,
  };
}

export function solution(input: string): number {
  const cards = input.split("\n").map(parseCard);
  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < cards[i].copies; j++) {
      cards
        .slice(cards[i].number, cards[i].number + cards[i].matches)
        .forEach((copy) => {
          cards[copy.number - 1].copies += 1;
        });
    }
  }

  return cards.map((c) => c.copies).reduce((a, b) => a + b, 0);
}
