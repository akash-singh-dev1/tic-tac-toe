import React from "react";
import Player from "./components/Player/Player";

function App() {
  console.log(`the react version use by this project is : ${React.version}`);

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName={"player 1"} symbol={"X"} />
          <Player initialName={"player 2"} symbol={"O"} />
        </ol>
        game board
      </div>
      log
    </main>
  );
}

export default App;
