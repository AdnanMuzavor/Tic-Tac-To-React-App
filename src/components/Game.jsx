import React, { Component } from "react";
import Board from "./Board";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      isX: true,
      stepNumber:0,
    };
  }
  jumpto(step){
    this.setState({
      stepNumber:step,
      isX:(step%2)===0,
    })
  }
  Calculate_Winner(squares) {
    console.log("Method called");
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber+1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.Calculate_Winner(squares) != null || squares[i] != null) {
      return;
    }
    squares[i] = this.state.isX ? "X" : "0";
    this.setState({
      history: history.concat([{ squares: squares }]),
      isX: !this.state.isX,
      stepNumber:history.length,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.Calculate_Winner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpto(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      //If(winner) means winner!=NULL
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.isX ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <li>{moves}</li>
        </div>
      </div>
    );
  }
}

export default Game;
