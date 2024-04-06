import "./ColorPicker.css";
import ColorShape from "@components/pixelBoard/ColorPicker/ColorShape";

function ColorPicker({
  picked,
  setPicked,
  colors,
  delay,
}) {
  return (
    <div className='palette' style={{ position: "relative" }}>
      {colors.map((color, index) => (
        <div key={index}>
          <ColorShape
            picked={picked}
            color={color}
            setColor={() => delay < 1 && setPicked(color)}
          />
        </div>
      ))}
      {delay > 0 && (
        <div
          className='bg-primary'
          style={{
            display: "flex",
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p className='text-center text-wrap m-auto fs-3'>{delay}</p>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
