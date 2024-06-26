import Row from "./Row";

function Grid({ boardData, selectedColor, grid, onPixelPlace }) {
  return (
    <div className='w-100 h-100'>
      {grid.map((row, index) => (
        <Row
          key={index}
          row={row}
          y={index}
          boardData={boardData}
          selectedColor={selectedColor}
          onPixelPlace={onPixelPlace}
        />
      ))}
    </div>
  );
}

export default Grid;
