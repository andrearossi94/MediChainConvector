import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginUser from "./Components/login";
import Profile from "./Components/profile";
import Personale from "./Components/personale";
import Logout from "./Components/logout";
import logo from "./logo.svg";
import Medical_doctor from "./Medical_doctor.png";
import patient from "./patient.jpg";
import CreateCartellaClinica from './Components/CreateCartellaClinica';
import PrivateRoute from './helpers/PrivateRoute';
import ShowCartellaClinica from './Components/ShowCartellaClinica';

function App() {
  return (<Router>
    <div className="App">
      <header>

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <p className="navbar-brand"></p>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <table>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <tr>
                    <td><Link className="nav-link" to={"/login-user"}>Login User</Link></td>
                    <td><Link className="nav-link" to={"/login-user"}>Logout</Link></td>
                  </tr>
                </li>
              </ul>
            </table>
          </div>
        </nav>
        <img src={logo} className="App-logo" alt="logo" />
        <img src={Medical_doctor} className="img-doctor" alt="Doctor" />
        <img src={patient} className="patient" alt="Patient" />
      </header>

      <div className="container">
        <div className="row">
          <div className="col-md-12">

            <Switch>
              <Route exact path='/' component={LoginUser} />
              <Route path="/login-user" component={LoginUser} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/personale" component={Personale} />
              <PrivateRoute exact path="/logout" component={Logout} />
              <PrivateRoute exact path="/create-cartellaclinica" component={CreateCartellaClinica} />
              <PrivateRoute exact path="/showCart" component={ShowCartellaClinica} />
              
            </Switch>
          </div>
        </div>
      </div>
    </div>
  </Router>
  );
}


export default App;
