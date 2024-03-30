import React, { useState, useEffect } from "react";
import "./Pixel.css";
import { socket } from "../../../socket";
import axios from "axios";
import { addSeconds, isAfter, differenceInSeconds } from "date-fns";

function Pixel(props) {
  const {
    x,
    y,
    boardData,
    selectedColor,
    lastUpdate,
    setLastUpdate,
    currAuthor,
    setLogs,
  } = props;
  const [pixelColor, setPixelColor] = useState(
    boardData.board_history[y][x].color ?? "#fff"
  );
  const [isHover, setIsHover] = useState(false);

  const checkExceedDuration = (baseDate, durationInSeconds) => {
    const currentDate = new Date();
    const targetDate = addSeconds(new Date(baseDate), durationInSeconds);
    return isAfter(currentDate, targetDate);
  };

  const getTimeRemaining = (baseDate, durationInSeconds) => {
    const currentDate = new Date();
    const targetDate = new Date(baseDate);
    targetDate.setSeconds(targetDate.getSeconds() + durationInSeconds);

    const remainingSeconds = differenceInSeconds(targetDate, currentDate);

    return remainingSeconds;
  };

  // Effect to handle socket events and axios request
  useEffect(() => {
    // Function to handle pixel color update from socket event
    const handlePixelUpdate = (data) => {
      if (x === data.x && y === data.y) {
        boardData.board_history[y][x].lastSetter = data.author;
        setPixelColor(data.selectedColor);
      }
    };
    // Listen for pixel-updated event from socket
    socket.on("pixel-updated", handlePixelUpdate);

    // Cleanup function to remove socket event listener
    return () => {
      socket.off("pixel-updated", handlePixelUpdate);
    };
  }, [boardData.board_history, x, y]); // Empty dependency array to run effect only once on mount

  // Function to update pixel color locally and emit event to server
  const updatePixelColor = async (e) => {
    const baseDate = lastUpdate;
    const durationInSeconds = boardData.reinsert_delay;

    if (baseDate == null || checkExceedDuration(baseDate, durationInSeconds)) {
      if (
        boardData.overwrite ||
        boardData.board_history[y][x].lastSetter === currAuthor || // TODO: problem with that
        boardData.board_history[y][x].lastSetter == null
      ) {
        // Update pixel color on server
        axios
          .put(`http://localhost:3001/update-pixel`, {
            boardId: boardData.id,
            x: x,
            y: y,
            color: selectedColor,
            author: currAuthor,
          })
          .then((response) => {
            const lastUpdateVal = new Date().toISOString();
            boardData.board_history[y][x].lastSetter = currAuthor;
            setLastUpdate(lastUpdateVal); // last update on the board for the user
            socket.emit("setPixelColor", boardData.id, {
              x: x,
              y: y,
              selectedColor: selectedColor,
              author: currAuthor,
            });
            console.log("Pixel color updated on server", response);
            const payload = {
              boardId: boardData.id,
              author: currAuthor,
              x: x,
              y: y,
              color: selectedColor,
              lastUpdate: lastUpdateVal,
            };
            setLogs(payload);
            socket.emit("add-log", payload);
          })
          .catch((error) => {
            console.error("Error editing board data:", error);
          });
      } else {
        alert("You can't edit a pixel that is not your !");
        e.preventDefault();
      }
    } else {
      alert(
        `You have to wait ${getTimeRemaining(
          baseDate,
          boardData.reinsert_delay
        )}s before editing that pixel !`
      );
      e.preventDefault();
    }
  };

  return (
    <div
      className="pixel"
      style={{
        backgroundColor: isHover ? selectedColor : pixelColor,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={updatePixelColor}
    ></div>
  );
}

export default Pixel;
