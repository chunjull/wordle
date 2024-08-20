const initialState = {
  answerWord: "REACT", // 字串
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
        let status = 0;
        if (letter === state.answerWord[index]) {
          status = 3;
        } else if (state.answerWord.includes(letter)) {
          status = 2;
        } else if (!state.answerWord.includes(letter)) {
          status = 1;
        }
        return { letter, status };
      });
      newBoardState[state.currentRow] = newRow;
      let newGameStatus = state.gameStatus;
      if (state.currentWord === state.answerWord) {
        newGameStatus = 1; // win
      } else if (state.currentRow >= 5) {
        newGameStatus = 2; // lose
      }
      return {
        ...state,
        boardState: newBoardState,
        currentRow: state.currentRow + 1,
        currentWord: "",
        gameStatus: newGameStatus,
      };
    }
    default:
      throw new Error("Unknown action type");
  }
};

export { initialState, actionTypes, gameReducer };
