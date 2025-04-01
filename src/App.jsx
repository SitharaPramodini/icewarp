import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import SuccessReg from "./components/SuccessReg";
import SuccessUnreg from "./components/SuccessUnreg";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reg" element={<SuccessReg />} />
        <Route path="/unreg" element={<SuccessUnreg />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;









