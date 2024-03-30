import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import CustomCard from './CustomCard.jsx'; // Import the CustomCard component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './index.css';

// Render the App component into the "nav" div
ReactDOM.createRoot(document.getElementById('nav')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Data for each card
const cardsData = [
  { title: 'Registered Users', content: '24K' },
  { title: 'Pixel Boards', content: '142' },
  { title: 'Last Pixel Board in creation', content: '<Pixel Board>' },
  { title: 'Last Pixel Board finished', content: '<Pixel Board>' }
];

// Render the CustomCard component with props for each card data
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      {cardsData.map((card, index) => (
        <CustomCard key={index} title={card.title} content={card.content} />
      ))}
    </div>
  </React.StrictMode>
);
