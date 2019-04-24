import React from "react";
import posed from "react-pose";

const cardCSS = { width: "100px", height: "100px" };

class Card extends React.Component {
  state = {
    emoji: this.props.emoji,
    flipped: false
  };

  clickHandler() {
    this.setState({ flipped: !this.state.flipped });
    // if (!this.state.flipped) {
    //   // eventually we have to hold this hostage for turn confirmation
    //   this.setState({
    //     flipped: !this.state.flipped
    //   });
    // }
  }

  render() {
    const { flipped, emoji } = this.state;
    const pose = flipped ? "flipped" : "init";
    return (
      <div onClick={() => this.clickHandler()} style={cardCSS}>
        <Front pose={pose}>{emoji} </Front>
        <Back pose={pose} />
      </div>
    );
  }
}
const Back = posed.div({
  init: { background: "goldenRod", opacity: 1 },
  flipped: { opacity: 0 }
});

const Front = posed.div({
  init: { background: "pink", opacity: 0 },
  flipped: { opacity: 1 }
});

export default Card;
