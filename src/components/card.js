import React from "react";
import posed from "react-pose";

const Card = ({ emoji, pose, onClick, id }) => (
  <div onClick={() => onClick(id)}>
    <Front pose={pose}>{emoji} </Front>
    <Back pose={pose} />
  </div>
);

const Back = posed.div({
  init: { background: "goldenRod", opacity: 1 },
  flipped: { opacity: 0 },
  solved: { opacity: 0 }
});

const Front = posed.div({
  init: { background: "pink", opacity: 0 },
  flipped: { opacity: 1 },
  solved: { opacity: 1, background: "red" }
});

export default Card;
