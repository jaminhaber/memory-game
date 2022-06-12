import React, { useReducer } from "react";
import Card from "./card";
import { spawnDeck } from "./GameLogic";
import { reducer } from "./Reducer";

const gameBoardCss = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gridTemplateRows: "1fr 1fr 1fr",
  width: "100%",
  margin: "0 auto",
};

const GameManager = ({ numCards }) => {
  if (!numCards) numCards = 12;
  const winCondition = Math.floor(numCards / 2);
  const [{ deck, numSolved, refresh }, dispatch] = useReducer(reducer, {
    deck: spawnDeck(numCards || 12),
    numClicks: 0,
    numSolved: 0,
    refresh: false,
  });

  if (refresh) {
    setTimeout(() => dispatch({ type: "new-turn" }), 500);
  }

  const didWin = numSolved >= winCondition;
  return (
    <div className="game">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {didWin ? (
          <>
            <h3 class="title">Win</h3>
            <button onClick={() => window.location.reload()}>new deck</button>
          </>
        ) : (
          <>
            <h3 class="title">Memory Game</h3>
            <div className="score">solved: {numSolved}</div>
          </>
        )}
      </div>
      <div style={gameBoardCss} className="flex-1">
        {deck.map((c, i) => (
          <Card
            onClick={() =>
              dispatch({ type: "flip-card", payload: { index: i } })
            }
            key={i}
            {...c}
          />
        ))}
      </div>
    </div>
  );
};

export default GameManager;
