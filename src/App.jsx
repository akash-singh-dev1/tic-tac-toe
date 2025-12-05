import React from "react";
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import { useState } from "react";
import Log from "./components/Log_/Log";
import { WINNING_COMBINATIONS } from "../winning-combinations";

/* This is the starting 3×3 board for Tic-Tac-Toe.
 Each cell starts as `null`, meaning "empty".i will contain the symbol of player which have Choosen that particular square  */
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//function to know the active player and also change it to "O" if it is "X".
const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

// function to know the winner .

function App() {
  /* state to know which square is clicked on the gameboard and by which player. 
  This state is is an array Which will have multiple object Which will consist of two properties square and player.
  Square is also an object which will contain row and col Properties. player property will have value( current player symbol). */
  const [gameTurns, setGameTurns] = useState([]);
  // to Exactly know the  current activePlayer.
  let activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

  /* overwriting the gameBoard data when player interact with the GameBoard and component re-render.
  -- overwriting the gameBoard data using state(gameTurns) from App component using prop.
  -- will not execute if there is no data(initial state) */
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  //code to know the winner.
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  //function to handle the selected square.
  function handleSelectSquare(rowIndex, colIndex) {
    //setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));

    setGameTurns((prevTurns) => {
      //To exactly know the current Pactivelayer.
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      console.log(updatedTurns);
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={"player 1"}
            symbol={"X"}
            isActive={activePlayer === "X"}
          />
          <Player
            initialName={"player 2"}
            symbol={"O"}
            isActive={activePlayer === "O"}
          />
        </ol>
        {/*to conditionally show the winner of the same if there is */}
        {winner && <p>you won ,{winner}!</p>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        <Log clickInfo={gameTurns} />
      </div>
    </main>
  );
}

export default App;
