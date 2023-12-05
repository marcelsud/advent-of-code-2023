// scratchcards
// card number
// two list of numbers separated by a "|"
// winning numbers
// numbers I have
// first match is worth 1 point
// each subsequent match doubles the point value of the matched card

// 1. parse the card
// 2. parse the numbers
// 3. compare the numbers
// 4. calculate the score

/*
For example:

Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
*/

type Card = {
  number: number;
  winningNumbers: number[];
  myNumbers: number[];
  matches: number;
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
  };
}

export function calculateScore(card: Card): number {
  let score = 0;
  for (let i = 0; i < card.matches; i++) {
    if (score === 0) {
      score += 1;
    } else {
      score *= 2;
    }
  }
  return score;
}

export function solution(input: string): number {
  const lines = input.split("\n");
  const cards = lines.map(parseCard);
  const scores = cards.map(calculateScore);
  return scores.reduce((a, b) => a + b, 0);
}
