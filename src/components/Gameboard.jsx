import { useReducer, useEffect, useRef } from "react";
import Row from "./Row";
import {
  initialState,
  actionTypes,
  gameReducer,
  STATUS,
} from "../utils/gameReducer";

function GameBoard() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (stateRef.current.gameStatus === 0) {
        dispatch({
          type: actionTypes.HANDLE_KEY_DOWN,
          payload: { key: event.key },
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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

export default GameBoard;
