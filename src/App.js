import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Accounts from "./pages/Accounts/Accounts";
import Home from "./pages/Home/Home";
import Stocks from "./pages/Stocks/Stocks";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/accounts" element={<Accounts />} />
        </Routes>
        <Routes>
          <Route path="/stocks" element={<Stocks />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
