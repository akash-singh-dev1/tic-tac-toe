import { useState } from "react";
import "./Player.css";

const Player = ({ initialName, symbol }) => {
  const [isEditing, setIsEditing] = useState(false); //state for edit/save button.
  const [playerName, setPlayerName] = useState(initialName); //state for name of player.

  //function for onClick event on button.
  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
    if (!isEditing) {
      console.log(`edit button is clicked you can now edit player name `);
    } else console.log(`save button is clicked player name is saved`);
  };

  //function for onChange event on input.
  const handleChange = (event) => {
    console.log("onChange event is fired");
    setPlayerName(event.target.value);
    console.log(`player name is set to :${event.target.value}`);
  };

  return (
    <>
      <li>
        <span className="player">
          {!isEditing ? (
            <span className="player-name">{playerName}</span>
          ) : (
            <input
              id=""
              type="text"
              value={playerName}
              onChange={handleChange}
            ></input>
          )}
          <span className="player-symbol">{symbol}</span>
          <button type="button" onClick={handleEditClick}>
            {!isEditing ? "Edit" : "Save"}
          </button>
        </span>
      </li>
    </>
  );
};
export default Player;
