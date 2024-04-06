import "./ColorShape.css";

function ColorShape({ picked, color, setColor }) {
  return (
    <div
      className={picked === color ? "shape selected" : "shape"}
      onClick={() => setColor(color)}
      style={{ backgroundColor: color }}
    ></div>
  );
}

export default ColorShape;
