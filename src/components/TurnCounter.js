import React from "react";

const Counter = ({ numClicks }) => <h2>{Math.floor((numClicks - 1) / 2)}</h2>;

export default Counter;
