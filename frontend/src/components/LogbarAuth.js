import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import logo from '../images/logo.png';
import '../style/Navbar.css';

class LogbarAuth extends Component {
  SignOut(){
      localStorage.removeItem("currentUserFirstName");
      localStorage.removeItem("currentUserLastName");
  }
  
  render(){
    return (
      <div>
        <nav className="navbar navbar-dark navbar-custom py-0 px-5">
          <div className="navbar-brand p-0">
            <a href="/">
              <img className="logo" src={logo}></img>
            </a>
            <span className="logo-name">Lviv Regional Hospital</span>
          </div>

          <ul className="nav">
            <li className="nav-item btn-custom">
              <form className="form-inline" action="/action_page.php">
                <div>
                  {localStorage.getItem("currentUserFirstName") + " " + localStorage.getItem("currentUserLastName") + " "} 
                  <Link to="/">   
                    <button type="button" className="btn btn-info btn-custom" onClick={this.SignOut}>Sign out</button> 
                  </Link>
                </div>
              </form>
            </li>
            <li className="nav-item btn-custom">
              <a className="navbar-toggler nav-link" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </a>  
            </li>          
          </ul>
                
        </nav>

        <div className="collapse pos-f-t container-fluid navbar-custom border border-top-2 p-0" id="navbarToggleExternalContent">
          <ul className="nav nav-justified">
            <li className="nav-item btn-custom">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item btn-custom">
              <a className="nav-link" href="#">Contacts</a>
            </li>
            <li className="nav-item btn-custom">
              <a className="nav-link" href="#">Doctors</a>
            </li>
            <li className="nav-item btn-custom">
              <a className="nav-link" href="#">Illnes prevention</a>
            </li>
            <li className="nav-item btn-custom">
              <a className="nav-link" href="#">National medicine program</a>
            </li>
          </ul>
        </div>

      </div>
    );
  }
}
export default LogbarAuth;