import db from "./FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const initialState = {
  answerWord: "", // 字串
  currentWord: "", // 字串
  boardState: Array(6)
    .fill()
    .map(() =>
      Array(5)
        .fill()
        .map(() => ({ letter: "", status: 0 }))
    ), // 二維陣列包物件
  currentRow: 0, // 數字
  gameStatus: 0, // 數字 0:playing, 1:win, 2:lose
};

const actionTypes = {
  SET_ANSWER_WORD: "SET_ANSWER_WORD",
  SET_CURRENT_WORD: "SET_CURRENT_WORD",
  SUBMIT_WORD: "SUBMIT_WORD",
  SET_GAME_STATUS: "SET_GAME_STATUS",
  RESET_GAME: "RESET_GAME",
  HANDLE_KEY_DOWN: "HANDLE_KEY_DOWN",
};

const STATUS = {
  NONE: 0,
  WRONG: 1,
  CORRECT: 2,
  EXACT: 3,
};

const GAME_STATUS = {
  PLAYING: 0,
  WIN: 1,
  LOSE: 2,
};

const fetchAnswerWord = async () => {
  const querySnapshot = await getDocs(collection(db, "wordle"));
  const fireDoc = querySnapshot.docs[0];
  return fireDoc ? fireDoc.data().answerWords : [];
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ANSWER_WORD:
      return { ...state, answerWord: action.payload };
    case actionTypes.SET_CURRENT_WORD:
      return { ...state, currentWord: action.payload };
    case actionTypes.SUBMIT_WORD: {
      const newBoardState = [...state.boardState];
      const newRow = state.currentWord.split("").map((letter, index) => {
        let status = STATUS.NONE;
        if (letter === state.answerWord[index]) {
          status = STATUS.EXACT;
        } else if (state.answerWord.includes(letter)) {
          status = STATUS.CORRECT;
        } else if (!state.answerWord.includes(letter)) {
          status = STATUS.WRONG;
        }
        return { letter, status };
      });
      newBoardState[state.currentRow] = newRow;
      let newGameStatus = state.gameStatus;
      if (state.currentWord === state.answerWord) {
        newGameStatus = 1;
      } else if (state.currentRow >= 5) {
        newGameStatus = 2;
      }
      return {
        ...state,
        boardState: newBoardState,
        currentRow: state.currentRow + 1,
        currentWord: "",
        gameStatus: newGameStatus,
      };
    }
    case actionTypes.SET_GAME_STATUS:
      return { ...state, gameStatus: action.payload };
    case actionTypes.RESET_GAME:
      return {
        ...initialState,
        answerWord: action.payload,
      };
    case actionTypes.HANDLE_KEY_DOWN: {
      if (state.gameStatus !== GAME_STATUS.PLAYING) {
        return state;
      }
      const { key } = action.payload;
      if (key === "Enter") {
        if (state.currentWord.length === 0) {
          alert("Not enough letters");
          return state;
        } else if (state.currentWord.length < 5) {
          alert("Not enough letters");
          return state;
        }
        return gameReducer(state, { type: actionTypes.SUBMIT_WORD });
      } else if (key === "Backspace") {
        return gameReducer(state, {
          type: actionTypes.SET_CURRENT_WORD,
          payload: state.currentWord.slice(0, -1),
        });
      } else if (/^[a-zA-Z]$/.test(key)) {
        if (state.currentWord.length < 5) {
          return gameReducer(state, {
            type: actionTypes.SET_CURRENT_WORD,
            payload: state.currentWord + key.toUpperCase(),
          });
        }
      }
      return state;
    }
    default:
      throw new Error("Unknown action type");
  }
};

const initializeGame = async (dispatch) => {
  const words = await fetchAnswerWord();
  const answerWord = words[Math.floor(Math.random() * words.length)];
  dispatch({ type: actionTypes.RESET_GAME, payload: answerWord });
};

export {
  initialState,
  actionTypes,
  gameReducer,
  STATUS,
  GAME_STATUS,
  initializeGame,
};
