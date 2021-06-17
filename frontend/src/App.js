import React from "react";
import {Switch, BrowserRouter as Router, Route} from "react-router-dom";

import './App.css';

import Navbar from "./components/NavBar";
import Users from "./components/Users";
import Contracts from "./components/Contracts";
import Jobs from "./components/Jobs";
import Admin from "./components/Admin";
import UsersProvider from "./contexts/users.context";

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
            <Route path="/contracts">
              <Contracts/>
            </Route>
            <Route path="/jobs">
              <Jobs/>
            </Route>
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
