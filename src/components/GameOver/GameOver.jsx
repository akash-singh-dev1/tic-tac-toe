import "./GameOver.css";

const GameOver = ({ winner, rematch }) => {
  return (
    <div id="game-over">
      <h2> Game over!</h2>
      {/*conditionally show if there is a winner or it is a draw*/}
      {winner ? <p>{winner} won!</p> : <p>it's a DRAW</p>}
      <p>
        <button onClick={rematch}>Rematch!</button>
      </p>
    </div>
  );
};

export default GameOver;
