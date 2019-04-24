import React from "react";
import Card from "./card";

const emojis = require("../emojis.json").emojis;

class GameManager extends React.Component {
  constructor(num) {
    super();
    this.state = {
      numCards: 4,
      deck: [
        { emoji: "🌲" },
        { emoji: "💗" },
        { emoji: "🌈" },
        { emoji: "🍦" },
        { emoji: "⛈" },
        { emoji: "🌻" },
        { emoji: "💯" },
        { emoji: "👽" }
      ]
    };
    this.emojis = emojis;
  }

  randomizeDeck() {}

  spawnDeck(numCards) {
    for (let i = 0; i < numCards; i++) {
      this.setState({
        deck: this.updateExpression(this.state.items, {
          i: { deck: { $push: this.emojis[i] } }
        })
      });
    }
  }

  render() {
    const { deck } = this.state;

    return (
      <div class="game-board">
        {deck.map((c, i) => (
          <Card key={i} {...c} />
        ))}
      </div>
    );
  }
}

export default GameManager;
