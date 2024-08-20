import { useReducer, useEffect } from "react";
import Row from "./Row";
import { initialState, actionTypes, gameReducer } from "../utils/gameReducer";

function GameBoard() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        if (state.currentWord.length === 0) {
          alert("Not enough letters");
          return;
        } else if (state.currentWord.length < 5) {
          alert("Not enough letters");
          return;
        }
        dispatch({ type: actionTypes.SUBMIT_WORD });
      } else if (event.key === "Backspace") {
        dispatch({
          type: actionTypes.SET_CURRENT_WORD,
          payload: state.currentWord.slice(0, -1),
        });
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        if (state.currentWord.length < 5) {
          dispatch({
            type: actionTypes.SET_CURRENT_WORD,
            payload: state.currentWord + event.key.toUpperCase(),
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.currentWord, dispatch]);

  return (
    <div className="flex flex-col space-y-2">
      {state.boardState.map((row, index) => (
        <Row
          key={index}
          row={row}
          currentWord={state.currentWord}
          currentRow={state.currentRow}
          rowIndex={index}
        />
      ))}
    </div>
  );
}

export default GameBoard;
