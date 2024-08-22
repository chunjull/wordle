import PropTypes from "prop-types";

function Row({ row, currentWord, currentRow, rowIndex, STATUS }) {
  return (
    <div className="flex items-center justify-center space-x-2">
      {row.map((square, index) => {
        const currentLetter = currentWord[index] || "";
        return (
          <div
            key={index}
            className={`w-14 h-14 border-2 border-slate-400 font-mono text-center text-3xl leading-relaxed ${
              square.status === STATUS.WRONG
                ? "bg-slate-200"
                : square.status === STATUS.CORRECT
                ? "bg-yellow-200"
                : square.status === STATUS.EXACT
                ? "bg-green-200"
                : "bg-white"
            }`}
          >
            {rowIndex === currentRow ? currentLetter : square.letter}
          </div>
        );
      })}
    </div>
  );
}

Row.propTypes = {
  row: PropTypes.arrayOf(
    PropTypes.shape({
      letter: PropTypes.string,
      status: PropTypes.number,
    })
  ).isRequired,
  currentWord: PropTypes.string.isRequired,
  currentRow: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
  STATUS: PropTypes.object.isRequired,
};

export default Row;
