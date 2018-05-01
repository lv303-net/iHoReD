import React from 'react';
import { Component } from 'react';
import { Route, Router,Link, Redirect } from 'react-router-dom';
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

import LogbarWrapper from './components/LogbarWrapper';
const base_api_url = process.env.REACT_APP_BASE_API_URL;
var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"


class App extends Component {
  render() {
    return(
      <div id="mainDiv">
        <div class="container-fluid mt-5">
          <div className="row">
            <ProfessionsTable/>            
            <div className="col-sm-12 col-md-8 mr-1" id="calendarDiv">
              <Calendar idDoctor={1}/>
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default App;
