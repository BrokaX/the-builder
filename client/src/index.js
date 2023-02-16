import React from 'react';
import ReactDOM from 'react-dom/client';
import 'grapesjs/dist/css/grapes.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


