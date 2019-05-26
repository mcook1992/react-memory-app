import React from "react";

function Card({ number, hasBeenClicked, id, onClick }) {
  return (
    <li
      onClick={onClick}
      className="memoryCard"
      data-value={hasBeenClicked}
      id={id}
    >
      {number}
    </li>
  );
}

export default Card;
