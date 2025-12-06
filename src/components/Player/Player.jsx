import { useState } from "react";
import "./Player.css";

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
  // Controls whether we are currently editing the player's name.
  const [isEditing, setIsEditing] = useState(false);
  // Stores the current name of the player
  const [playerName, setPlayerName] = useState(initialName);

  // Runs when the "Edit" or "Save" button is clicked.
  const handleEditClick = () => {
    // Toggle between editing mode and display (save) mode
    setIsEditing((prev) => !prev);

    /* this will run when we click save button this send the symbol and playeName to
     App component using callBack function received using prop onChangeName. */
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
    // Just for debugging to see which button was clicked
    if (!isEditing) {
      console.log("Edit mode enabled. You can now change the player name.");
    } else {
      console.log("Edit mode disabled. Player name saved.");
    }
  };

  // Runs whenever the input value changes (only in editing mode)
  const handleChange = (event) => {
    console.log("Input changed.");
    // Update the player's name in state
    setPlayerName(event.target.value);
  };

  return (
    // Add CSS class "active" only when this player is the current turn
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {/* If NOT editing → show plain text name
            If editing → show an input field */}
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input type="text" value={playerName} onChange={handleChange} />
        )}

        {/* Show X or O beside the player's name */}
        <span className="player-symbol">{symbol}</span>

        {/* Button changes label depending on state */}
        <button type="button" onClick={handleEditClick}>
          {!isEditing ? "Edit" : "Save"}
        </button>
      </span>
    </li>
  );
};

export default Player;
