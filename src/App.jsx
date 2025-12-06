import React from "react";
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import { useState } from "react";
import Log from "./components/Log_/Log";
import { WINNING_COMBINATIONS } from "../winning-combinations";
import GameOver from "./components/GameOver/GameOver";

/* This is the starting 3×3 board for Tic-Tac-Toe.
 Each cell starts as `null`, meaning "empty".i will contain the symbol of player which have Choosen that particular square  */
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//object to define the initial palyer names with there symbols.
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

//function to know the active player and also change it to "O" if it is "X".
const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

// function to know the winner .
const deriveWinner = (gameBoard, players) => {
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
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
};

const deriveGameBoard = (gameTurns) => {
  let gameBoard = INITIAL_GAME_BOARD.map((row) => [...row]);

  /* overwriting the gameBoard data when player interact with the GameBoard and component re-render.
  -- overwriting the gameBoard data using state(gameTurns) from App component using prop.
  -- will not execute if there is no data(initial state) */
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
};

function App() {
  /* state to know which square is clicked on the gameboard and by which player. 
  This state is is an array Which will have multiple object Which will consist of two properties square and player.
  Square is also an object which will contain row and col Properties. player property will have value( current player symbol). */
  const [gameTurns, setGameTurns] = useState([]);

  // state to save the playername.
  const [players, setPlayers] = useState(PLAYERS);

  // to Exactly know the  current activePlayer.
  let activePlayer = deriveActivePlayer(gameTurns);

  // to derive the gameBoard array from gameTurns array.
  const gameBoard = deriveGameBoard(gameTurns);

  // to know the winner.
  const winner = deriveWinner(gameBoard, players);

  //code to know if game is draw or not variable hasDraw is a boolean to know if match is draw or not.
  const hasDraw = gameTurns.length === 9 && !winner;

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

  // function to handle rematch.
  const handleRematch = () => {
    setGameTurns([]);
  };

  // function to handle player name change.
  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {/*to conditionally show the winner of the same if there is */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} rematch={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        <Log clickInfo={gameTurns} />
      </div>
    </main>
  );
}

export default App;
