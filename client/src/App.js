import './App.css';
import { Routes, Route } from 'react-router-dom'
import Canvas from './Components/Canvas';
import Landing from './Components/Landing';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Login from './Components/Login';

function App() {
 
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/builder" element={<Canvas />} />
        <Route exact path="/register" element={<Register />} />
        </Routes>
     
    </div>
  );
}

export default App;
