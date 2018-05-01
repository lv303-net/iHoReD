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
              {(localStorage.getItem("currentUserFirstName")==null) ? (<LogbarUnauth/>) : (<LogbarAuth/>)}
            </div>
        );
    }
  }

  export default LogbarWrapper;