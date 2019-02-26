import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";

import "./App.css";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import RecentPhones from "./components/RecentPhones";
import PhoneDetails from "./components/PhoneDetails";
import AddPhone from "./components/AddPhone";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>Ironphones</h1>
          <nav>
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink to="/recent-phones">New releases</NavLink>
            <NavLink to="/signup-page">Sign Up</NavLink>
            <NavLink to="/login-page">Log In</NavLink>
          </nav>
        </header>

        <Switch>
          {/* Homepage route should always have exact */}
          <Route exact path="/" component={HomePage} />

          <Route path="/recent-phones" component={RecentPhones} />
          <Route path="/phone-details/:phoneId" component={PhoneDetails} />
          <Route path="/add-phone" component={AddPhone} />

          {/* Use render instead of component to send props */}
          <Route
            path="/signup-page"
            render={() => {
              return <SignupPage currentUser={this.state.currentUser} />;
            }}
          />
          <Route
            path="/login-page"
            rerender={() => {
              return <LoginPage currentUser={this.state.currentUser} />;
            }}
          />

          {/* 404 route should go last */}
          <Route component={NotFound} />
        </Switch>

        <footer>
          <p>Made with LUST @ Ironhack</p>
        </footer>
      </div>
    );
  }
}

export default App;
