import React, { useReducer } from "react";
import Card from "./card";
import Counter from "./TurnCounter";
import { spawnDeck } from "./GameLogic";
import { reducer } from "./Reducer";

const gameBoardCss = {
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  justifyContent: "space-around",
  flexWrap: "wrap",
  width: "80%",
  margin: "0 auto"
};

const GameManager = ({ numCards }) => {
  if (!numCards) numCards = 12;
  const winCondition = Math.floor(numCards / 2);
  const [{ deck, numSolved, refresh }, dispatch] = useReducer(reducer, {
    deck: spawnDeck(numCards || 12),
    numClicks: 0,
    numSolved: 0,
    refresh: false
  });

  if (refresh) {
    setTimeout(() => dispatch({ type: "new-turn" }), 500);
  }
  return (
    <div className="game">
      <div style={{ display: "flex", justifyContent: "center" }}>
        {numSolved >= winCondition && (
          <div>
            <h1>Win!</h1>
            <button onClick={() => window.location.reload()}>new deck</button>
          </div>
        )}
        <div>solved: {numSolved}</div>
      </div>
      <div style={gameBoardCss}>
        {deck.map((c, i) => (
          <Card
            onClick={() => dispatch({ type: "flip-card", payload: { index: i } })}
            key={i}
            {...c}
          />
        ))}
      </div>
    </div>
  );
};

export default GameManager;
