import { useEffect } from "react";
import Row from "./Row";
import { actionTypes, STATUS } from "../utils/gameReducer";
import PropTypes from "prop-types";

function GameBoard({ state, dispatch }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      dispatch({
        type: actionTypes.HANDLE_KEY_DOWN,
        payload: { key: event.key },
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col space-y-2">
      {state.boardState.map((row, index) => (
        <Row
          key={index}
          row={row}
          currentWord={state.currentWord}
          currentRow={state.currentRow}
          rowIndex={index}
          STATUS={STATUS}
        />
      ))}
    </div>
  );
}

GameBoard.propTypes = {
  state: PropTypes.shape({
    boardState: PropTypes.arrayOf(PropTypes.array).isRequired,
    currentWord: PropTypes.string.isRequired,
    currentRow: PropTypes.number.isRequired,
    gameStatus: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default GameBoard;
