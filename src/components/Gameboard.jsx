import Row from "./Row";

function GameBoard() {
  const grid = Array(6).fill(null);

  return (
    <div className="flex flex-col space-y-2">
      {grid.map((_, index) => (
        <Row key={index} className="mb-2" />
      ))}
    </div>
  );
}

export default GameBoard;
