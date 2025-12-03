import "./GameBoard.css";
import { useState } from "react";

/* This is the starting 3×3 board for Tic-Tac-Toe.
 Each cell starts as `null`, meaning "empty". */
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = ({ onSelectSquare, activePlayerSymbol }) => {
  /* React state to store the current board.
   Initially, it contains the empty 3×3 board above.*/
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  /*This function runs whenever a user clicks a square in board.
   It updates the click board square with the player symbol.*/
  const handleSelectSquare = (rowIndex, colIndex) => {
    // Update the board using the state setter function.
    setGameBoard((prevGameBoard) => {
      /* Create a deep copy of the previous board.(Because React state must be updated immutably.)
      changing the current board will not change the reference of the state variable which will not re-render the component */
      const updatedBoard = prevGameBoard.map((row) => [...row]);

      // Put the current player's symbol (X or O) into the clicked square.
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;

      return updatedBoard; // This becomes the new state.
    });

    // Call the parent function so the parent (App.js) can change the active player.
    onSelectSquare();
  };

  return (
    <ol id="game-board">
      {/* Loop through each row of the board */}
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {/* Loop through each column inside the row */}
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* When clicked, update that specific square */}
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  {/* Display X, O, or nothing depending on the state */}
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
