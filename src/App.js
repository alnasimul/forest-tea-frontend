import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthContext";
import Accounts from "./pages/Accounts/Accounts";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Home from "./pages/Home/Home";
import Returns from "./pages/Returns/Returns";
import Stocks from "./pages/Stocks/Stocks";

function App() {
  return (
    <div>
      <AuthProvider>
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
            <Route path="/returns" element={<Returns />} />
          </Routes>
          <Routes>
            <Route path="/stocks" element={<Stocks />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
