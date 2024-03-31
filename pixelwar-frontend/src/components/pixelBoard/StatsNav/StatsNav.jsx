import { useEffect, useState } from "react";
import "./StatsNav.css";

function StatsNav(props) {
  const { logs } = props;
  const [statToggle, setStatToggle] = useState(false);
  const MAX_LOGS_DISPLAY = 5;
  let items = [];

  for (let i = 0; i < Math.min(logs.length, MAX_LOGS_DISPLAY); i++) {
    let log = logs[logs.length - i - 1];
    items.push(
      <li key={i}>
        {`${log.author} | x = ${log.x} | y = ${log.y} | color = ${log.color} | last update = ${log.lastUpdate}`}
      </li>
    );
  }

  return !statToggle ? (
    <div className="statsNav" onClick={() => setStatToggle(true)}>
      {"<<"}
    </div>
  ) : (
    <div className="menu">
      Last pixels:
      <div onClick={() => setStatToggle(false)}>{">>"}</div>
      <ul>{items}</ul>
    </div>
  );
}

export default StatsNav;
