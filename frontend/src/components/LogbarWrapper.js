import React from 'react';
import { Component } from 'react';
import { Route, Router,Link, Redirect } from 'react-router-dom';
import logo from '../images/logo.png';
import LogbarUnauth from './LogbarUnauth';
import LogbarAuth from './LogbarAuth';
import Footerbar from './Footerbar';
const base_api_url = process.env.REACT_APP_BASE_API_URL;
var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

  class LogbarWrapper extends Component {
    render(){
        return(
            <div>
                <nav className="navbar navbar-custom p-0 pl-5 pr-5">
          {/* <div className="navbar-brand p-0">
            <a href="/">
              <img className="logo" src={logo}></img>
            </a>
            <span className="pl-5">Lviv Regional Hospital</span>
          </div>   */}

          <ul class="nav navbar-nav navbar-right">
            {(localStorage.getItem("currentUserFirstName")==null) ? (<LogbarUnauth/>) : (<LogbarAuth/>)}
          </ul>

          <button class="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon text-white"></span>
          </button>        
        </nav>
            </div>
        );
    }
  }

  export default LogbarWrapper;