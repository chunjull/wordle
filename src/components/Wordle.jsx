import { useReducer } from "react";
import {
  initialState,
  actionTypes,
  gameReducer,
  GAME_STATUS,
} from "../utils/gameReducer";
import GameBoard from "./Gameboard";
import Modal from "./Modal";

function Wordle() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleRestart = () => {
    dispatch({ type: actionTypes.RESET_GAME });
  };

  const handleClose = () => {
    dispatch({ type: actionTypes.SET_GAME_STATUS, payload: 0 });
  };

  let message = "";
  if (state.gameStatus === GAME_STATUS.WIN) {
    message = "You win!";
  } else if (state.gameStatus === GAME_STATUS.LOSE) {
    message = "You lose!";
  }

  return (
    <div className="bg-gray-200 py-20 h-screen">
      <div className="">
        <h1 className="font-mono font-bold text-3xl text-center mb-5">
          Wordle
        </h1>
        <GameBoard state={state} dispatch={dispatch} />
      </div>
      {state.gameStatus !== 0 && (
        <Modal
          onClose={handleClose}
          onRestart={handleRestart}
          message={message}
        />
      )}
    </div>
  );
}

export default Wordle;
