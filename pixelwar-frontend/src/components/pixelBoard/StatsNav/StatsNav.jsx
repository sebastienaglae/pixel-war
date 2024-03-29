import { useState } from "react";
import "./StatsNav.css";

function StatsNav() {
  const [statToggle, setStatToggle] = useState(false);
  return !statToggle ? (
    <div className="statsNav" onClick={() => setStatToggle(true)}>
      {"<<"}
    </div>
  ) : (
    <div className="menu">
      MY MENU
      <div onClick={() => setStatToggle(false)}>{">>"}</div>
      <ul>
        <li>ITEM 1</li>
        <li>ITEM 2</li>
        <li>ITEM 3</li>
      </ul>
    </div>
  );
}

export default StatsNav;
