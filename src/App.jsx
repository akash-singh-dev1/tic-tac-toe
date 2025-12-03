import React from "react";
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import { useState } from "react";

function App() {
  console.log(`the react version use by this project is : ${React.version}`);

  const [activePlayer, setActivePlayer] = useState("X");

  //function to change the active player.
  function handleActivePlayer() {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
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
        <GameBoard
          onSelectSquare={handleActivePlayer}
          activePlayerSymbol={activePlayer}
        />
      </div>
      log
    </main>
  );
}

export default App;
