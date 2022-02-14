import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthContext";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Home from "./pages/Home/Home";
import Returns from "./pages/Returns/Returns";
import Sales from "./pages/Sales/Sales";
import Stocks from "./pages/Stocks/Stocks";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/Home">
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/sales">
              <Sales/>
            </PrivateRoute>
            <PrivateRoute path="/returns">
              <Returns />
            </PrivateRoute>
            <PrivateRoute path="/stocks">
              <Stocks />
            </PrivateRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/register">
              <RegisterPage />
            </PrivateRoute>
            <Route path="/forgotpassword">
              <ForgotPassword/>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
