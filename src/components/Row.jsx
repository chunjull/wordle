import PropTypes from "prop-types";

function Row({ row, currentWord, currentRow, rowIndex }) {
  return (
    <div className="flex items-center justify-center space-x-2">
      {row.map((square, index) => (
        <div
          key={index}
          className={`w-14 h-14 border-2 font-mono text-center text-3xl leading-relaxed ${
            square.status === 1
              ? "bg-slate-200 border-slate-400"
              : square.status === 2
              ? "bg-yellow-200 border-slate-400"
              : square.status === 3
              ? "bg-green-200 border-slate-400"
              : "bg-white border-slate-400"
          }`}
        >
          {rowIndex === currentRow ? currentWord[index] || "" : square.letter}
        </div>
      ))}
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
};

export default Row;
