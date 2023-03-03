// Styles
import "./App.css";
import { Routes, Route } from "react-router-dom";
//notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import Canvas from "./Components/Canvas";
import Landing from "./Components/LandingPage/Landing";
import Navbar from "./Components/NavBar/Navbar";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { Fragment } from "react";


function App() {
  return (
    <Fragment>
      <div className="App">
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/builder" element={<Canvas />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
