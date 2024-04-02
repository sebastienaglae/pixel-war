import "./ColorShape.css";

function ColorShape(props) {
  const { picked, color, setColor } = props;
  return picked === color ? (
    <div
      className="shape selected"
      onClick={() => setColor(color)}
      style={{ backgroundColor: color }}
    ></div>
  ) : (
    <div
      className="shape"
      onClick={() => setColor(color)}
      style={{ backgroundColor: color }}
    ></div>
  );
}

export default ColorShape;
