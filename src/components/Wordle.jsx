import { useReducer, useEffect } from "react";
import {
  initialState,
  gameReducer,
  GAME_STATUS,
  actionTypes,
} from "../utils/gameReducer";
import { fetchAnswerWord } from "../utils/firebase";
import GameBoard from "./Gameboard";
import Modal from "./Modal";

function Wordle() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const initializeGame = async (dispatch) => {
    const words = await fetchAnswerWord();
    const answerWord = words[Math.floor(Math.random() * words.length)];
    dispatch({ type: actionTypes.RESET_GAME, payload: answerWord });
  };

  useEffect(() => {
    initializeGame(dispatch);
  }, []);

  const handleRestart = () => {
    initializeGame(dispatch);
  };

  const messages = {
    [GAME_STATUS.WIN]: "You Win!💯",
    [GAME_STATUS.LOSE]: "You Lose!🏚️",
  };
  let message = messages[state.gameStatus] || "";

  return (
    <div className="bg-gray-200 py-20 h-screen">
      <div className="">
        <h1 className="font-mono font-bold text-3xl text-center mb-5">
          Wordle
        </h1>
        <GameBoard state={state} dispatch={dispatch} />
      </div>
      {state.gameStatus !== GAME_STATUS.PLAYING && (
        <Modal
          onClickCloseButton={handleRestart}
          onClickMainButton={handleRestart}
          message={message}
        />
      )}
    </div>
  );
}

export default Wordle;
