import "./ColorPicker.css";
import ColorShape from "@components/pixelBoard/ColorPicker/ColorShape";
import { useEffect, useState } from "react";

function ColorPicker({
  picked,
  setPicked,
  colors,
  canPlace,
  delay,
  onCooldownComplete,
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
    <div className='palette' style={{ position: "relative" }}>
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
          <p className='text-center text-wrap m-auto fs-3'>{timer}</p>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
