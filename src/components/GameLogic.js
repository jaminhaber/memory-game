const emojis = require("../emojis.json").emojis;

export const spawnDeck = numCards => {
  const deck = [numCards];
  for (let i = 0; i < numCards / 2; i++) {
    const v = Math.floor(Math.random() * emojis.length);
    deck[i] = {
      emoji: emojis[v],
      pose: "init",
      id: i
    };
    deck[i + numCards] = {
      emoji: emojis[v],
      pose: "init",
      id: i + numCards
    };
    emojis.splice(v, 1);
  }
  deck.sort(() => Math.random() - 0.5);

  return deck;
};
