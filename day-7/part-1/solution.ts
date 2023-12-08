export enum HandTypes {
  FIVE_OF_A_KIND = "A",
  FOUR_OF_A_KIND = "B",
  FULL_HOUSE = "C",
  THREE_OF_A_KIND = "D",
  TWO_PAIR = "E",
  ONE_PAIR = "F",
  HIGH_CARD = "G",
}

export type Hand = {
  cards: string[];
  map: {
    [key: string]: number;
  };
  bid: number;
  type: HandTypes;
};

const types = Object.values(HandTypes)
  .map(String)
  .filter((v) => v.length === 1);

const labels = "AKQJT98765432".split("");

export function rankHands(hands: Hand[]): {
  hand: Hand;
  rank: number;
}[] {
  return sortHands(hands)
    .reverse()
    .map((h, i) => {
      return {
        hand: h,
        rank: i + 1,
      };
    });
}

export function sortHands(arr: Hand[]) {
  return arr.sort((a, b) => {
    if (a.type !== b.type) {
      return types.indexOf(a.type) - types.indexOf(b.type);
    }
    for (let i = 0; i < a.cards.length; i++) {
      if (a.cards[i] !== b.cards[i]) {
        return (
          labels.indexOf(String(a.cards[i])) -
          labels.indexOf(String(b.cards[i]))
        );
      }
    }
    return 0;
  });
}

export function sortCards(cards: string[]) {
  return cards.sort((a, b) => {
    return labels.indexOf(a) - labels.indexOf(b);
  });
}

export function parseHand(line: string): Hand {
  const bid = Number(line.split(" ")[1]);
  const cards = line.split(" ")[0].split("");
  const cardsMap: {
    [key: string]: number;
  } = {};
  cards.forEach((label, i) => {
    if (!cardsMap[label]) {
      cardsMap[label] = 0;
    }
    cardsMap[label]++;
  });
  let type: HandTypes;
  if (Object.keys(cardsMap).length === 1) {
    type = HandTypes.FIVE_OF_A_KIND;
  }
  if (Object.keys(cardsMap).length === 2) {
    if (
      cardsMap[Object.keys(cardsMap).at(0)!] === 4 ||
      cardsMap[Object.keys(cardsMap).at(1)!] === 4
    ) {
      type = HandTypes.FOUR_OF_A_KIND;
    } else {
      type = HandTypes.FULL_HOUSE;
    }
  }
  if (Object.keys(cardsMap).length === 3) {
    if (
      cardsMap[Object.keys(cardsMap).at(0)!] === 3 ||
      cardsMap[Object.keys(cardsMap).at(1)!] === 3 ||
      cardsMap[Object.keys(cardsMap).at(2)!] === 3
    ) {
      type = HandTypes.THREE_OF_A_KIND;
    } else {
      type = HandTypes.TWO_PAIR;
    }
  }
  if (Object.keys(cardsMap).length === 4) {
    type = HandTypes.ONE_PAIR;
  }
  if (Object.keys(cardsMap).length === 5) {
    type = HandTypes.HIGH_CARD;
  }
  return {
    cards,
    map: cardsMap,
    type: type!,
    bid,
  };
}

export function solution(input: string) {
  const hands = input.split("\n").map(parseHand);
  const rankedHands = rankHands(hands);
  return Object.values(rankedHands).reduce(
    (acc, hand) => acc + hand.rank * hand.hand.bid,
    0
  );
}
