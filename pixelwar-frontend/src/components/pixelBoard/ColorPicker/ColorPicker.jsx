import ColorShape from "@components/pixelBoard/ColorPicker/ColorShape";
import { useEffect, useState } from "react";
import { Placeholder } from "reactstrap";

function ColorPicker({
  picked,
  setPicked,
  colors,
  canPlace,
  delay,
  onCooldownComplete,
  loading,
}) {
  const [timer, setTimer] = useState(delay);

  useEffect(() => {
    if (!canPlace) {
      setTimer(delay);
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [canPlace, delay]);

  useEffect(() => {
    if (timer === 0 && !canPlace) {
      onCooldownComplete();
    }
  }, [timer, onCooldownComplete, canPlace]);

  return (
    <div
      className='palette bg-light p-2 mt-3 mx-auto rounded'
      style={{ position: "relative" }}
    >
      <Placeholder className='d-flex' animation={loading ? null : "wave"}>
        {colors.map((color, index) => (
          <div key={index}>
            <ColorShape
              picked={picked}
              color={color}
              setColor={() => canPlace && setPicked(color)}
            />
          </div>
        ))}
        {!canPlace && (
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
            <p className='text-center text-wrap m-auto fs-3 '>{timer}</p>
          </div>
        )}
      </Placeholder>
    </div>
  );
}

export default ColorPicker;
