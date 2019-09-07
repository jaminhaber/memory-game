export const spawnDeck = numCards => {
  const emojis = getEmojis();
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
      id: numCards + i
    };
    emojis.splice(v, 1);
  }
  deck.sort(() => Math.random() - 0.5);

  return deck;
};

export const getEmojis = () => require("../emojis.json").emojis;
