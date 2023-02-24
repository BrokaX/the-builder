import React from 'react';
import ReactDOM from 'react-dom/client';
import 'grapesjs/dist/css/grapes.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import axios from 'axios';
const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = "http://localhost:5050"
root.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
);


