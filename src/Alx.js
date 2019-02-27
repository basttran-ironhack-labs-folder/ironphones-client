import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";

import "./App.css";
import RecentPhones from "./components/RecentPhones";
import PhoneDetails from "./components/PhoneDetails";
import AddPhone from "./components/AddPhone";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import { getLogout } from "./api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  updateUser(newUser) {
    if (newUser) {
      // save the user info in localStorage if we are logging IN
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    } else {
      // delete the user info from localStorage if we are logging OUT
      localStorage.removeItem("currentUser");
    }
    this.setState({ currentUser: newUser });
  }

  logoutClick() {
    getLogout().then(response => {
      console.log("Log Out", response.data);
      this.updateUser(null);
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>IronPhones</h1>

          <nav>
            {/* NavLink to the home page should ALWAYS have exact on it */}
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink exact to="/recent-phones">
              New Releases
            </NavLink>

            {this.state.currentUser ? (
              <div>
                <span>
                  {" "}
                  <b>{this.state.currentUser.email}</b>
                  <button onClick={() => this.logoutClick()}>Log Out</button>
                </span>
              </div>
            ) : (
              <span>
                {" "}
                <NavLink exact to="/signup-page">
                  Sign Up
                </NavLink>
                <NavLink exact to="/login-page">
                  Log In
                </NavLink>
              </span>
            )}
          </nav>
        </header>

        <Switch>
          {/* Home page route should ALWAYS have exact on it */}
          <Route exact path="/" component={HomePage} />

          <Route path="/recent-phones" component={RecentPhones} />
          <Route path="/phone-details/:phoneId" component={PhoneDetails} />
          <Route path="/add-phone" component={AddPhone} />

          {/* Use render instead of component to send props */}
          <Route
            path="/signup-page"
            render={() => {
              return (
                <SignupPage
                  currentUser={this.state.currentUser}
                  signupSucces={user => this.updateUser(user)}
                />
              );
            }}
          />
          <Route
            path="/login-page"
            render={() => {
              return (
                <LoginPage
                  currentUser={this.state.currentUser}
                  loginSuccess={user => this.updateUser(user)}
                />
              );
            }}
          />

          {/* 404 route should go last */}
          <Route component={NotFound} />
        </Switch>

        <footer>
          <p>Made with a phone @ Ironhack</p>
        </footer>
      </div>
    );
  }
}

export default App;