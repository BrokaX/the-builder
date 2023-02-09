import "./App.css";

import { Routes, Route } from "react-router-dom";
import Builder from "./components/Builder";
import Canvas from "./components/Canvas";
import Images from "./components/Images";
function App() {
  return (
    <div className="App">
      <Builder />
      <Canvas/>
      <Routes>
        <Route path="/images" element={<Images/>} />
        <Route path="/" element={<Canvas/>} />
      </Routes>
    </div>
  );
}

export default App;
