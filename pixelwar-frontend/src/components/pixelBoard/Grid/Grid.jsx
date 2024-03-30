import Row from "./Row";
import "./Grid.css";

function Grid(props) {
  const {
    boardData,
    selectedColor,
    lastUpdate,
    setLastUpdate,
    currAuthor,
    setLogs,
  } = props;
  let rows = [];
  for (let i = 0; i < boardData.height; i++) {
    rows.push(
      <Row
        key={i}
        y={i}
        boardData={boardData}
        selectedColor={selectedColor}
        lastUpdate={lastUpdate}
        setLastUpdate={setLastUpdate}
        currAuthor={currAuthor}
        setLogs={setLogs}
      />
    );
  }
  return <div className="grid">{rows}</div>;
}

export default Grid;
