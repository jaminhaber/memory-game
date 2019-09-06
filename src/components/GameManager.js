import React from "react";
import Card from "./card";
import Counter from "./TurnCounter";
import { spawnDeck } from "./GameLogic";

const gameBoardCss = {
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  justifyContent: "space-around",
  flexWrap: "wrap",
  width: "80%",
  margin: "0 auto"
};

class GameManager extends React.Component {
  state = {
    numCards: this.props.numCards || 12,
    win: false,
    numClicks: 1,
    numSolved: 0,
    deck: [],
    last: null
  };

  componentDidMount() {
    this.setState({
      deck: spawnDeck(this.state.numCards)
    });
  }

  checkIfSolved() {
    const { deck, numSolved, numCards } = this.state;

    if (numSolved >= numCards / 2) {
      this.setState({ win: true });
    }

    deck.forEach(c => {
      if (c.pose !== "solved") c.pose = "init";
    });

    this.setState({ deck: deck });
  }

  cardClicked(id) {
    const { numSolved, numClicks, deck, last } = this.state;
    const card = deck.find(s => s.id === id);

    if (card.pose === "solved") return;
    card.pose = "flipped";

    if (numClicks % 2 === 0) {
      if (last.emoji === card.emoji) {
        last.pose = card.pose = "solved";
        this.setState({ numSolved: numSolved + 1 });
      }
      setTimeout(() => this.checkIfSolved(), 500);
    }

    this.setState({ deck: deck, numClicks: numClicks + 1, last: card });
  }

  render() {
    const { deck, numClicks, win } = this.state;

    return (
      <div className="game">
        {win && <h1>Win!</h1>}
        <Counter numClicks={numClicks} />
        <div style={gameBoardCss}>
          {deck.map((c, i) => (
            <Card onClick={c => this.cardClicked(c)} key={i} {...c} />
          ))}
        </div>
      </div>
    );
  }
}

export default GameManager;
