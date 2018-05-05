import React from 'react';
import { Component } from 'react';
import { Route, Router,Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import LogbarUnauth from '../components/LogbarUnauth';
import LogbarAuth from '../components/LogbarAuth';
import Footerbar from '../components/Footerbar';
import PatientDiagnosesTable from '../components/PatientDiagnosesTable';
import PatientInfo from '../components/PatientInfo';
import LogbarWrapper from '../components/LogbarWrapper';
import '../style/AdminPage.css';
const base_api_url = process.env.REACT_APP_BASE_API_URL;
var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"


class AdminPage extends Component {
  render() {
    return(
      <div id="mainDiv">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav main-nav">
    <li class="nav-item">
        <a class="nav-link" href="#">Rules</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Salary</a>
      </li>
    </ul>
  </div>
</nav>
      </div>
    );
  }
}

export default AdminPage;
