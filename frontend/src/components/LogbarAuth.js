import React from 'react';
import { Component } from 'react';
import logo from '../images/logo.png';
import '../style/Navbar.css';

class LogbarAuth extends Component {
  constructor(){
    super();
    this.state={
      firstName: localStorage.getItem("currentUserFirstName"),
      lastName: localStorage.getItem("currentUserLastName"),
    }
  }
  SignOut(){
      localStorage.removeItem("currentUserFirstName");
      localStorage.removeItem("currentUserLastName");
      localStorage.removeItem("accessToken");
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return (
        this.state.firstName!==nextState.firstName
        || this.props.lastName!==nextProps.lastName);
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

          <form className="form-inline text-center" action="/action_page.php">
            <ul className="nav">
              <li className="nav-item btn-custom">
                <a className="nav-link" id ="link-custom">{this.state.firstName + " " + this.state.lastName + " "}</a>
              </li>
              <li className="nav-item btn-custom">
                <a className="nav-link" id ="link-custom"  href="/" onClick={this.SignOut}>Sign out</a> 
              </li>
              <li className="nav-item btn-custom">
                <a className="navbar-toggler nav-link" id ="link-custom" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="shorter-line"></span>
                  <span></span>
                  <span></span>
                </a>
              </li>
            </ul>
          </form>            
        </nav>

        <div className="collapse pos-f-t container-fluid navbar-custom border border-top-2 p-0" id="navbarToggleExternalContent">
          <ul className="nav nav-justified">
            <li className="nav-item btn-custom">
              <a className="nav-link" id ="link-custom" href="/">Home</a>
            </li>
            <li className="nav-item btn-custom">
              <a className="nav-link" id ="link-custom" >Contacts</a>
            </li>
            <li className="nav-item btn-custom">
              <a className="nav-link" id ="link-custom" >Illnes prevention</a>
            </li>
            <li className="nav-item btn-custom">
              <a className="nav-link" id ="link-custom" >National medicine program</a>
            </li>
          </ul>
        </div>

      </div>
    );
  }
}
export default LogbarAuth;