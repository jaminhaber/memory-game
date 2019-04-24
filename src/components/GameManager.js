import React from "react";
import Card from "./card";
const emojis = require("../emojis.json").emojis;

class GameManager extends React.Component {
  state = {
    numCards: 12,
    numClicks: 0,
    deck: []
  };

  componentDidMount() {
    this.spawnDeck(this.state.numCards);
  }

  spawnDeck(numCards) {
    const deck = [numCards];
    for (let i = 0; i < numCards / 2; i++) {
      const v = Math.floor(Math.random() * emojis.length);
      //TODO: make sure v cant equal previously used v
      deck[i] = deck[i + numCards] = {
        emoji: emojis[v],
        flipped: false
      };
    }
    deck.sort(() => Math.random() - 0.5);
    this.setState({
      deck: deck
    });
  }

  cardClicked(card) {
    const { numClicks, deck } = this.state;
    if (numClicks % 2 === 0) {
    }
    card.flipped = true;
  }

  render() {
    const { deck } = this.state;

    return (
      <div className="game-board">
        {deck.map((c, i) => (
          <Card onClick={c => this.cardClicked(c)} key={i} {...c} />
        ))}
      </div>
    );
  }
}

export default GameManager;
