function Row() {
  const squares = Array(5).fill(null);

  return (
    <div className="flex items-center justify-center space-x-2">
      {squares.map((_, index) => (
        <div
          key={index}
          className="w-14 h-14 bg-white border-2 border-slate-400"
        />
      ))}
    </div>
  );
}

export default Row;
