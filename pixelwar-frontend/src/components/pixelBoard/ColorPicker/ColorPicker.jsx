import ColorShape from "@components/pixelBoard/ColorPicker/ColorShape";
import { Placeholder } from "reactstrap"

function ColorPicker({ picked, setPicked, colors, delay }) {
  return (
    <div
      className='d-flex bg-light p-2 mt-3 mx-auto rounded'
      style={{ position: "relative" }}
    >
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
          className='bg-primary rounded d-flex flex-column justify-content-center align-items-center'
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
          }}
        >
          <p className='text-center text-wrap m-auto fs-3'>{delay}</p>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
