import { spawnDeck } from "./GameLogic";

export const reducer = (state, action) => {
  switch (action.type) {
    case "new-deck":
      return { ...state, deck: spawnDeck(action.payload.numCards || 12) };
    case "flip-card":
      const selectedCard = state.deck[action.payload.index];

      if (state.last && selectedCard.id === state.last.id) return state;
      if (state.refresh || selectedCard.pose !== "init") return state;

      const match = state.last && state.last.emoji === selectedCard.emoji;

      return {
        ...state,
        last: selectedCard,
        refresh: state.numClicks % 2,
        numClicks: state.numClicks + 1,
        numSolved: match ? state.numSolved + 1 : state.numSolved,
        deck: state.deck.map((card, index) =>
          match
            ? card.emoji === selectedCard.emoji
              ? { ...card, pose: "solved" }
              : card
            : index === action.payload.index
            ? { ...card, pose: "flipped" }
            : card
        )
      };
    case "new-turn":
      return {
        ...state,
        refresh: false,
        last: null,
        deck: state.deck.map(card => (card.pose === "solved" ? card : { ...card, pose: "init" }))
      };

    default:
      return state;
  }
};
