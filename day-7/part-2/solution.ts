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
  original: {
    cards: string[];
    map: {
      [key: string]: number;
    };
    type: HandTypes;
  };
  remapped: {
    cards: string[];
    map: {
      [key: string]: number;
    };
    type: HandTypes;
  };
  bid: number;
};

const types = Object.values(HandTypes)
  .map(String)
  .filter((v) => v.length === 1);

const labels = "AKQT98765432J".split("");

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
    if (a.remapped.type !== b.remapped.type) {
      return types.indexOf(a.remapped.type) - types.indexOf(b.remapped.type);
    }
    for (let i = 0; i < a.original.cards.length; i++) {
      if (a.original.cards[i] !== b.original.cards[i]) {
        return (
          labels.indexOf(String(a.original.cards[i])) -
          labels.indexOf(String(b.original.cards[i]))
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
  cards.forEach((label) => {
    if (!cardsMap[label]) {
      cardsMap[label] = 0;
    }
    cardsMap[label]++;
  });

  const sortedCards = Object.keys(cardsMap).sort((a, b) => {
    return cardsMap[b] - cardsMap[a];
  });

  let toReplace: string = "J";

  for (let i = 0; i < sortedCards.length; i++) {
    if (sortedCards[i] !== "J") {
      toReplace = sortedCards[i];
      break;
    }
  }
  const remappedCards = line.split(" ")[0].replaceAll("J", toReplace).split("");

  const remappedCardsMap: {
    [key: string]: number;
  } = {};
  remappedCards.forEach((label) => {
    if (!remappedCardsMap[label]) {
      remappedCardsMap[label] = 0;
    }
    remappedCardsMap[label]++;
  });

  let handType: HandTypes;
  if (Object.keys(cardsMap).length === 1) {
    handType = HandTypes.FIVE_OF_A_KIND;
  }
  if (Object.keys(cardsMap).length === 2) {
    if (
      cardsMap[Object.keys(cardsMap).at(0)!] === 4 ||
      cardsMap[Object.keys(cardsMap).at(1)!] === 4
    ) {
      handType = HandTypes.FOUR_OF_A_KIND;
    } else {
      handType = HandTypes.FULL_HOUSE;
    }
  }
  if (Object.keys(cardsMap).length === 3) {
    if (
      cardsMap[Object.keys(cardsMap).at(0)!] === 3 ||
      cardsMap[Object.keys(cardsMap).at(1)!] === 3 ||
      cardsMap[Object.keys(cardsMap).at(2)!] === 3
    ) {
      handType = HandTypes.THREE_OF_A_KIND;
    } else {
      handType = HandTypes.TWO_PAIR;
    }
  }
  if (Object.keys(cardsMap).length === 4) {
    handType = HandTypes.ONE_PAIR;
  }
  if (Object.keys(cardsMap).length === 5) {
    handType = HandTypes.HIGH_CARD;
  }

  let remappedHandType: HandTypes;
  if (Object.keys(remappedCardsMap).length === 1) {
    remappedHandType = HandTypes.FIVE_OF_A_KIND;
  }
  if (Object.keys(remappedCardsMap).length === 2) {
    if (
      remappedCardsMap[Object.keys(remappedCardsMap).at(0)!] === 4 ||
      remappedCardsMap[Object.keys(remappedCardsMap).at(1)!] === 4
    ) {
      remappedHandType = HandTypes.FOUR_OF_A_KIND;
    } else {
      remappedHandType = HandTypes.FULL_HOUSE;
    }
  }
  if (Object.keys(remappedCardsMap).length === 3) {
    if (
      remappedCardsMap[Object.keys(remappedCardsMap).at(0)!] === 3 ||
      remappedCardsMap[Object.keys(remappedCardsMap).at(1)!] === 3 ||
      remappedCardsMap[Object.keys(remappedCardsMap).at(2)!] === 3
    ) {
      remappedHandType = HandTypes.THREE_OF_A_KIND;
    } else {
      remappedHandType = HandTypes.TWO_PAIR;
    }
  }
  if (Object.keys(remappedCardsMap).length === 4) {
    remappedHandType = HandTypes.ONE_PAIR;
  }
  if (Object.keys(remappedCardsMap).length === 5) {
    remappedHandType = HandTypes.HIGH_CARD;
  }

  return {
    original: {
      cards,
      map: cardsMap,
      type: handType!,
    },
    remapped: {
      cards: remappedCards,
      map: remappedCardsMap,
      type: remappedHandType!,
    },
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
