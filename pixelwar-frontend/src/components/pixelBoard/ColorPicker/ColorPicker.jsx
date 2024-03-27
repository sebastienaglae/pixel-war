import "./ColorPicker.css";
import ColorShape from "./ColorShape";

function ColorPicker(props) {
  const { picked, setPicked } = props;
  const values = [
    "#131313",
    "#1B1B1B",
    "#272727",
    "#3D3D3D",
    "#5D5D5D",
    "#858585",
    "#B4B4B4",
    "#C7CFDD",
    "#92A1B9",
    "#657392",
    "#424C6E",
    "#2A2F4E",
    "#1A1932",
    "#0E071B",
    "#1C121C",
    "#391F21",
    "#5D2C28",
    "#8A4836",
    "#BF6F4A",
    "#E69C69",
    "#F6CA9F",
    "#F9E6CF",
    "#EDAB50",
    "#E07438",
    "#C64524",
    "#8E251D",
    "#FF5000",
    "#ED7614",
    "#FFA214",
    "#FFC825",
    "#FFEB57",
    "#D3FC7E",
    "#99E65F",
    "#5AC54F",
    "#33984B",
    "#1E6F50",
    "#134C4C",
    "#0C2E44",
    "#0069AA",
    "#0098DC",
    "#00CDF9",
    "#0CF1FF",
    "#94FDFF",
    "#FDD2ED",
    "#F389F5",
    "#DB3FFD",
    "#7A09FA",
    "#3003D9",
    "#0C0293",
    "#03193F",
    "#3B1443",
    "#622461",
    "#93388F",
    "#CA52C9",
    "#C85086",
    "#F68187",
    "#F5555D",
    "#EA323C",
    "#C42430",
    "#891E2B",
    "#571C27",
    "#FF0040",
    "#FFFFFF",
  ];

  return (
    <div className="palette">
      {values.map((v, index) => (
        <div key={index}>
          <ColorShape picked={picked} color={v} setColor={setPicked} />
        </div>
      ))}
    </div>
  );
}

export default ColorPicker;
