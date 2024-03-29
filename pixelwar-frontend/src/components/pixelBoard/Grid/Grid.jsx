import Row from "./Row";
import "./Grid.css";

function Grid(props) {
  const { boardData, selectedColor } = props;
  let rows = [];
  for (let i = 0; i < boardData.height; i++) {
    rows.push(
      <Row key={i} y={i} boardData={boardData} selectedColor={selectedColor} />
    );
  }
  return <div className="grid">{rows}</div>;
}

export default Grid;
