import React from "react";

function Card({ number, hasBeenClicked }) {
  return <li className="memoryCard">{number} </li>;
}

export default Card;
