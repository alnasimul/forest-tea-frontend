import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthContext";
import Accounts from "./pages/Accounts/Accounts";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Home from "./pages/Home/Home";
import Returns from "./pages/Returns/Returns";
import Stocks from "./pages/Stocks/Stocks";
//import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/Home">
              <Home />
            </Route>
            <Route path="/accounts">
              <Accounts />
            </Route>
            <Route path="/returns">
              <Returns />
            </Route>
            <Route path="/stocks">
              <Stocks />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
