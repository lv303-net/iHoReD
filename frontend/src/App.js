import React from 'react';
import { Component } from 'react';
import { Route, Router,Link, Redirect } from 'react-router-dom';
import logo from './images/logo.png';
import './App.css';
import axios from 'axios';
import validator from 'validator';
import StartPatientPage from './components/StartPatientPage';
import Calendar from './components/Calendar';
import LogbarUnauth from './components/LogbarUnauth';
import LogbarAuth from './components/LogbarAuth';
import ProfessionsTable from './components/ProfessionsTable';
import DoctorTable from './components/DoctorTable';
import Footerbar from './components/Footerbar';
const base_api_url = process.env.REACT_APP_BASE_API_URL;
var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"


class App extends Component {
  render() {
    return(
      <div>
        <nav className="navbar navbar-custom p-0 pl-5 pr-5">
          <div className="navbar-brand p-0">
            <a href="/">
              <img className="logo" src={logo}></img>
            </a>
            <span className="pl-5">Lviv Regional Hospital</span>
          </div>  

          <ul class="nav navbar-nav navbar-right">
            {(localStorage.getItem("currentUserFirstName")==null) ? (<LogbarUnauth/>) : (<LogbarAuth/>)}
          </ul>

          <button class="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon text-white"></span>
          </button>        
        </nav>

        <div class="pos-f-t container-fluid navbar-custom border border-top-2 p-0">
          <div class="collapse" id="navbarToggleExternalContent">
            <ul className="nav nav-justified">
              <li class="nav-item btn-custom">
                <a class="nav-link" href="#">Home</a>
              </li>
              <li class="nav-item btn-custom">
                <a class="nav-link" href="#">Contacts</a>
              </li>
              <li class="nav-item btn-custom">
                <a class="nav-link dropdown" href="#">Doctors</a>
              </li>
              <li class="nav-item btn-custom">
                <a class="nav-link" href="#">Illnes prevention</a>
              </li>
              <li class="nav-item btn-custom">
                <a class="nav-link" href="#">National medicine program</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="container-fluid mt-5">
          <div className="row">
            <ProfessionsTable/>            
            <div className="col-sm-12 col-md-8 mr-1" id="calendarDiv">
              <Calendar idDoctor={1}/>
            </div>
          </div> 
        </div>
        <Footerbar/>
      </div>
    );
  }
}

export default App;
