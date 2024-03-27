import Row from "./Row";
import "./Grid.css";

function Grid(props) {
  const { width, height, selectedColor } = props;
  let rows = [];
  for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width} selectedColor={selectedColor} />);
  }
  return <div className="grid">{rows}</div>;
}

export default Grid;
