import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./css/materialize.css";
import "./css/global.css";
import "./css/variables.less";
import LandingPage from "./application/landing-page/LandingPage";
import ApplicationContextManager from "./context/application-context/ApplicationContextManager";
import LoginPage from "./application/login-page/LoginPage";

const routing = [{ path: "/", component: LandingPage },{ path: "/login", component: LoginPage },];

const App = () => {
  return (
    <Router forceRefresh>
      {routing.map(({ path, component }, index) => (
        <Route
          exact
          path={path}
          component={component}
          key={`routing-${index}`}
        />
      ))}
    </Router>
  );
};

const AppWithContext = () => <ApplicationContextManager><App /></ApplicationContextManager>;

export default AppWithContext;
