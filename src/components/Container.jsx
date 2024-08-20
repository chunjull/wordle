import GameBoard from "./Gameboard";

function Container() {
  return (
    <div className="bg-gray-200 py-10 h-screen">
      <h1 className="font-mono font-bold text-3xl text-center mb-5">Wordle</h1>
      <GameBoard />
    </div>
  );
}

export default Container;
