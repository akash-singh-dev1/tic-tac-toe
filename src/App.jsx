import React from "react";
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import { useState } from "react";

function App() {
  console.log(`the react version use by this project is : ${React.version}`);
  // state to know the active player
  const [activePlayer, setActivePlayer] = useState("X");

  /* state to know which square is clicked on the gameboard and by which player. 
  This state is is an array Which will have multiple object Which will consist of two properties square and player.
  Square is also an object which will contain row and col Properties. player property will have value( current player symbol). */
  const [gameTurns, setGameTurns] = useState([]);

  //function to handle the selected square.
  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));

    setGameTurns((prevTurns) => {
      //To exactly know the current player.
      let currentPlayer = "X";

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }

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
        <GameBoard onSelectSquare={handleSelectSquare} clickInfo={gameTurns} />
      </div>
    </main>
  );
}

export default App;
