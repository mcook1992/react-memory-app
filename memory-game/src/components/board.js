import React, { Component } from "react";
import Card from "./card";
import Header from "./header";
import arrayOfCards from "../arrayFile";

var repeatClick = false;

class Board extends Component {
  state = {
    score: 0,
    wins: 0
  };

  currentNumber = this.state.score;

  handleSquareClicked = event => {
    event.preventDefault();
    console.log("Button was clicked");
    console.log(event.target.id);

    var currentNodeID = event.target.id;

    var currentNodeClasses = document.getElementById(currentNodeID).classList;

    console.log(currentNodeClasses);

    currentNodeClasses.forEach(function(e) {
      console.log(e);
      e == "clicked" ? (repeatClick = true) : currentNodeClasses.add("clicked");
    });

    repeatClick
      ? console.log("You lost!")
      : this.setState({ score: this.state.score + 1 });
  };

  //   id => {
  //     var clickedCard = document.getElementById(id);
  //   };

  render() {
    return (
      <div className="mainBoard">
        <Header score={this.state.score} wins={this.state.wins} />
        <div className="board">
          {arrayOfCards.map(card => (
            <Card
              number={card.cardNumber}
              hasBeenClicked={false}
              id={card.id}
              onClick={this.handleSquareClicked}
            />
          ))}
          {/* <Card number={1} hasBeenClicked={false} /> */}
        </div>
      </div>
    );
  }
}

export default Board;
