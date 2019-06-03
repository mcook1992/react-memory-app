import React, { Component } from "react";
import Card from "./card";
import Header from "./header";
import arrayOfCards from "../arrayFile";

var repeatClick = false;
var testArray = [];
var counter = 0;

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

// function youLose(array) {
//   alert("You lose! Try again");
//   this.setState({ vulnerableIDs: [], score: 0 });
//   shuffle(array);
// }

// function youWin(array) {
//   alert("You won! Great job!");
//   this.setState({ vulnerableIDs: [], score: 0, wins: this.state.wins++ });
//   shuffle(array);
// }

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
    vulnerableIDs: [],
    gameLost: false
  };

  handleSquareClicked = event => {
    event.preventDefault();

    // console.log("This is the beginning state " + this.state);
    // console.log("Button was clicked");
    // console.log(event.target.id);

    var currentNodeID = event.target.id;
    console.log(currentNodeID);

    //go through and see if the player has lost

    this.state.vulnerableIDs.forEach(element => {
      if (currentNodeID == element) {
        alert("You lose! Try again");
        this.setState(
          { vulnerableIDs: testArray, score: 0, gameLost: true },
          function() {
            arrayOfCards.forEach(element => {
              element.hasBeenClicked = false;
            });
            shuffle(arrayOfCards);
            counter++;
          }
        );
        //resetting all the values in the array
      } else {
        shuffle(arrayOfCards);
        counter++;
      }

      if (counter == this.state.vulnerableIDs.length) {
        if (this.state.gameLost == false) {
          arrayOfCards.forEach(element => {
            // console.log(element);
            if (element.id == currentNodeID) {
              element.hasBeenClicked = true;
              this.setState({
                vulnerableIDs: this.state.vulnerableIDs.concat(currentNodeID)
              });
              // testArray.push(element);
              // console.log("The test array is " + typeof testArray);
              // this.state.vulnerableIDs.push(currentNodeID);
              this.setState(
                {
                  score: this.state.score + 1
                },
                function() {
                  if (this.state.score > 11) {
                    alert("You won! Great job!");
                    this.setState({
                      vulnerableIDs: testArray,
                      score: 0,
                      wins: this.state.wins++
                    });

                    console.log("this is the state after a win " + this.state);
                    arrayOfCards.forEach(element => {
                      element.hasBeenClicked = false;
                    });
                    shuffle(arrayOfCards);
                  } else {
                    shuffle(arrayOfCards);
                  }
                }
              );
            }
          });
        }
      }
    });
  };

  // console.log(currentNodeClasses);

  //if they haven't lost
  // if (this.state.gameLost == false) {
  //   console.log("this is the state when the button is false " + this.state);
  //   //may not need this stuff-test without it
  //   arrayOfCards.forEach(element => {
  //     // console.log(element);
  //     if (element.id == currentNodeID) {
  //       element.hasBeenClicked = true;
  //       // testArray.push(element);
  //       // console.log("The test array is " + typeof testArray);
  //       // this.state.vulnerableIDs.push(currentNodeID);
  //       this.setState({
  //         score: this.state.score + 1
  //       });

  //       this.setState({
  //         vulnerableIDs: this.state.vulnerableIDs.concat(currentNodeID)
  //       });

  //       if (this.state.score > 11) {
  //         alert("You won! Great job!");
  //         this.setState({
  //           vulnerableIDs: testArray,
  //           score: 0,
  //           wins: this.state.wins++
  //         });

  //         console.log("this is the state after a win " + this.state);
  //         arrayOfCards.forEach(element => {
  //           element.hasBeenClicked = false;
  //         });
  //         shuffle(arrayOfCards);
  //       } else {
  //         shuffle(arrayOfCards);

  //         console.log("this is the state after a new turn " + this.state);
  //       }
  //     }
  //   });
  // }

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
              link={card.link}
            />
          ))}
          {/* <Card number={1} hasBeenClicked={false} /> */}
        </div>
      </div>
    );
  }
}

export default Board;
