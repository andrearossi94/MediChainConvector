import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginUser from "./Components/login";
import Profile from "./Components/profile";
import Personale from "./Components/personale";
import logo from "./logo.svg";
import Medical_doctor from "./Medical_doctor.png";

function App() {
  return (<Router>
    <div className="App">
      <header>
      
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <p className="navbar-brand">Welcome to the Login page</p>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={"/login-user"}>Login User</Link>
              </li>
            </ul>
          </div>
        </nav>
        <img src={logo} className="App-logo" alt="logo" />
        <img src={Medical_doctor} className="img-doctor" alt="Doctor" />
      </header>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            
            <Switch>
              <Route exact path='/' component={LoginUser} />
              <Route path="/login-user" component={LoginUser} />
              <Route path="/profile" component={Profile} />
              <Route path="/personale" component={Personale} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  </Router>
  );
}


export default App;
