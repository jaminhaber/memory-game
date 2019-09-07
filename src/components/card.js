import React from "react";
import posed from "react-pose";

const cardCSS = {
  flex: "0 0 25%",
  border: "1px solid black",
  height: "0 !important",
  paddingBottom: "25%",
  position: "relative",
  margin: 0,
  boxSizing: "border-box"
};

const sideCSS = {
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "4rem"
};

const Card = ({ emoji, pose, onClick }) => (
  <div style={cardCSS} onClick={() => onClick()}>
    {console.log(pose)}
    <Front style={sideCSS} pose={pose}>
      {emoji}
    </Front>
    <Back style={sideCSS} pose={pose} />
  </div>
);

const Back = posed.div({
  init: { background: "goldenRod", opacity: 1, transition: { delay: 100 } },
  flipped: { opacity: 0 },
  solved: { opacity: 0 }
});

const Front = posed.div({
  init: { background: "pink", opacity: 0, transition: { delay: 100 } },
  flipped: { opacity: 1 },
  solved: { opacity: 1, background: "red" }
});

export default Card;
