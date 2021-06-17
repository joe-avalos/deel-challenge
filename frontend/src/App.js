import React from "react";
import {Switch, BrowserRouter as Router, Route} from "react-router-dom";

import './App.css';

import Navbar from "./components/NavBar";
import Users from "./components/Users";
import Contracts from "./components/Contracts";
import Jobs from "./components/Jobs";
import Admin from "./components/Admin";
import UsersProvider from "./contexts/users.context";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <UsersProvider>
          <Switch>
            <Route exact path="/">
              <Users/>
            </Route>
            <PrivateRoute path="/contracts">
              <Contracts/>
            </PrivateRoute>
            <PrivateRoute path="/jobs">
              <Jobs/>
            </PrivateRoute>
            <Route path="/admin/:slug">
              <Admin/>
            </Route>
          </Switch>
        </UsersProvider>
      </div>
    </Router>
  );
}

export default App;
