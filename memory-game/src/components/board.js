import React, { Component } from "react";
import Card from "./card";
import Header from "./header";
import arrayOfCards from "../arrayFile";

var repeatClick = false;

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// function shuffleCards() {
//   arrayOfCards.forEach(function(element) {
//     element.cardNumber = Math.floor(Math.random() * arrayOfCards.length);
//     console.log(element);
//   });

//   arrayOfCards.sort(function(a, b) {
//     return a.cardNumber - b.cardNumber;
//   });
// }

class Board extends Component {
  state = {
    score: 0,
    wins: 0,
    vulnerableIDs: []
  };

  currentNumber = this.state.score;

  handleSquareClicked = event => {
    event.preventDefault();
    // console.log("Button was clicked");
    // console.log(event.target.id);

    var currentNodeID = event.target.id;
    console.log(currentNodeID);

    var currentNodeClasses = document.getElementById(currentNodeID).classList;

    this.state.vulnerableIDs.forEach(element => {
      if (currentNodeID == element) {
        console.log("you lose");
      }
    });

    // console.log(currentNodeClasses);
    arrayOfCards.forEach(element => {
      console.log(element);
      if (element.id == currentNodeID) {
        if (element.hasBeenClicked == true) {
          //   console.log(element);
          //   console.log("You lose!");
        } else {
          element.hasBeenClicked = true;
          this.state.vulnerableIDs.push(currentNodeID);
          this.setState({
            score: this.state.score + 1
          });
          shuffle(arrayOfCards);
        }
      }
    });

    //     currentNodeClasses.forEach(function(e) {
    //       //   console.log(e);
    //       e == "clicked" ? (repeatClick = true) : console.log("Nothing to do here");
    //     });

    //     if (repeatClick) {
    //       console.log("You lost!");
    //     } else {
    //     }
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
              hasBeenClicked={card.hasBeenClicked}
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
