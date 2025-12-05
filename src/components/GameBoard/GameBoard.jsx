import "./GameBoard.css";

const GameBoard = ({ onSelectSquare, board }) => {
  return (
    <ol id="game-board">
      {/* Loop through each row of the board */}
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {/* Loop through each column inside the row */}
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* When clicked, send the rowIndex and colIndex to handleSelectSquare of App component to update that specific square */}
                <button
                  disabled={board[rowIndex][colIndex] !== null}
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                >
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
