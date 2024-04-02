import Pixel from "./Pixel";
import "./Row.css";

function Row(props) {
  const { width, selectedColor } = props;
  let pixels = [];
  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel key={i} selectedColor={selectedColor} />);
  }
  return <div className="rowPixel">{pixels}</div>;
}

export default Row;
