import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";


const cardsData = [
  { title: 'Registered Users', content: '24K' },
  { title: 'Pixel Boards', content: '142' },
  { title: 'Last Pixel Board in creation', content: '<Pixel Board>' },
  { title: 'Last Pixel Board finished', content: '<Pixel Board>' }
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
