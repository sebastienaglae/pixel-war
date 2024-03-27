import Pixel from "./Pixel";
import "./Row.css";

function Row(props) {
  const { y, width, selectedColor } = props;
  let pixels = [];
  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel key={i} x={i} y={y} selectedColor={selectedColor} />);
  }
  return <div className="rowPixel">{pixels}</div>;
}

export default Row;
