import { useReducer, useEffect } from "react";
import {
  initialState,
  gameReducer,
  GAME_STATUS,
  initializeGame,
} from "../utils/gameReducer";
import GameBoard from "./Gameboard";
import Modal from "./Modal";

function Wordle() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    initializeGame(dispatch);
  }, []);

  const handleRestart = () => {
    initializeGame(dispatch);
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
      {state.gameStatus !== GAME_STATUS.PLAYING && (
        <Modal onRestart={handleRestart} message={message} />
      )}
    </div>
  );
}

export default Wordle;
