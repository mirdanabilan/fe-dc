import React from "react";
import { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AuthService from "./services/auth.service";
import IUser from './types/user.type';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import EventBus from "./common/EventBus";
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';

const App: React.FC = () => {

  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    EventBus.on("logout", logOut);
    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);
  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  const ddTitle = <span className="nav-drop-title">Profile</span>

  return (
    <div>
      {currentUser ? (
        <Container>
          <Navbar style={{marginTop:10}} variant="light">
            <div className="flex-container nav-custom">
              <div className="nav-left" style={{marginTop:9}}>
                <Navbar.Brand href="#home">
                  <span className="nav-title">
                      Biro Perjalanan
                  </span>
                </Navbar.Brand>
              </div>
              <div className="nav-right">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <NavDropdown title={ddTitle} 
                                id="collasible-nav-dropdown">
                      <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                      <NavDropdown.Item href="/login" onClick={logOut}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </div>
            </div>
          </Navbar>
        </Container>
        // <nav className="navbar navbar-expand">
        //   <div>
        //     <span>Biro Perjalanan</span>
        //   </div>
        //   <div className="navbar-nav mr-auto" style={{float:'right'}}>
        //     <li className="nav-item dropdown">
        //       <span><a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //         Profile
        //       </a></span>
        //       <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        //         <a className="dropdown-item" href="/profile">Profile</a>
        //         <a className="dropdown-item" href="/login" onClick={logOut}>Log Out</a>
        //       </div>
        //     </li>
        //   </div>
        // </nav>
      ):(
        <div></div>
      )}
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/login"]} component={currentUser? Profile : Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={currentUser? Home : Login} />
          <Route exact path="/profile" component={currentUser? Profile : Login} />
        </Switch>
      </div>
    </div>
  );
};
export default App;
