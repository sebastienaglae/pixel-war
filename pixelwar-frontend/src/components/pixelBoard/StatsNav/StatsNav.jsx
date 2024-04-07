import { useState } from "react";
import "./StatsNav.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const LogItem = ({ log }) => (
  <li>
    {`${log.author} | x = ${log.x} | y = ${log.y} | color = ${log.color} | last update = ${log.lastUpdate}`}
  </li>
);

function StatsNav({ logs }) {
  const [statToggle, setStatToggle] = useState(false);
  const MAX_LOGS_DISPLAY = 5;

  const generateLogItems = () => {
    return logs
      .slice(-MAX_LOGS_DISPLAY)
      .reverse()
      .map((log, index) => <LogItem key={index} log={log} />);
  };

  return (
    <div className='stats d-flex align-items-center justify-content-evenly'>
      {!statToggle ? (
        <div
          className='statsNav bg-primary rounded px-1 py-1'
          onClick={() => setStatToggle(true)}
        >
          <FaArrowAltCircleLeft />
        </div>
      ) : (
        <div className='bg-dark p-2 rounded border border-primary'>
          <div className='toggleClose' onClick={() => setStatToggle(false)}>
            <FaArrowAltCircleRight />
          </div>
          Last pixels:
          <ul>{generateLogItems()}</ul>
        </div>
      )}
    </div>
  );
}

export default StatsNav;
