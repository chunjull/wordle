import { useReducer } from "react";
import { initialState, actionTypes, gameReducer } from "../utils/gameReducer";

function Row() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <div className="flex items-center justify-center space-x-2">
      {state.boardState[state.currentRow].map((square, index) => (
        <div
          key={index}
          className={`w-14 h-14 border-2 font-mono text-center text-3xl leading-relaxed ${
            square.status === 1
              ? "bg-gray-400"
              : square.status === 2
              ? "bg-yellow-200"
              : square.status === 3
              ? "bg-green-200"
              : "bg-white border-slate-400"
          }`}
        >
          {square.letter}
        </div>
      ))}
    </div>
  );
}

export default Row;
