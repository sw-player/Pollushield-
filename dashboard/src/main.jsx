import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';    // ← 여기

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
