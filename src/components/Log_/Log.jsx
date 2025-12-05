import "./Log.css";

// output the different turn(which player choose which square) taken by the different player.
const Log = ({ clickInfo }) => {
  const gameBoardInfo = [...clickInfo];

  return (
    <ol id="log">
      {gameBoardInfo.map((obj) => (
        <li
          key={`[${obj.square.row}][${obj.square.col}]`}
          className="highlighted"
        >{`player ${obj.player} have selected the square [${obj.square.row}],[${obj.square.col}]`}</li>
      ))}
    </ol>
  );
};

export default Log;
