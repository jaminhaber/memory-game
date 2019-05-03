import React from "react";
import Card from "./card";
import Counter from "./TurnCounter";
import { spawnDeck } from "./GameLogic";

class GameManager extends React.Component {
  state = {
    numCards: this.props.numCards || 8,
    numClicks: 1,
    deck: [],
    last: null
  };

  componentDidMount() {
    this.setState({
      deck: spawnDeck(this.state.numCards)
    });
    console.log(this.props);
  }

  checkIfSolved() {
    const { deck } = this.state;

    deck.forEach(c => {
      if (c.pose !== "solved") c.pose = "init";
    });

    this.setState({ deck: deck });
  }

  cardClicked(id) {
    const { numClicks, deck, last } = this.state;
    const card = deck.find(s => s.id === id);

    if (card.pose === "solved") return;
    card.pose = "flipped";

    if (numClicks % 2 === 0) {
      if (last.emoji === card.emoji) {
        last.pose = card.pose = "solved";
      }
      setTimeout(() => this.checkIfSolved(), 500);
    }

    this.setState({ deck: deck, numClicks: numClicks + 1, last: card });
  }

  render() {
    const { deck, numClicks } = this.state;

    return (
      <div className="game">
        <Counter numClicks={numClicks} />
        <div className="game-board">
          {deck.map((c, i) => (
            <Card onClick={c => this.cardClicked(c)} key={i} {...c} />
          ))}
        </div>
      </div>
    );
  }
}

export default GameManager;
