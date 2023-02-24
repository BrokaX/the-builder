// Styles
import "./App.css";
import { Routes, Route } from "react-router-dom";
// Components
import Canvas from "./Components/Canvas";
import Landing from "./Components/Landing";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Profile from "./Components/Profile";

function App() {
  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/builder" element={<Canvas />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </div>
  );
}

export default App;
