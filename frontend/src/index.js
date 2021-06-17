import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppProvider from "./contexts/app.context";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <div className="container">
        <App/>
      </div>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
