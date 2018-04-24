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

const base_api_url = process.env.REACT_APP_BASE_API_URL;
var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class App extends Component {
render() {
    return (
        <div className="App container-fluid">
        {(localStorage.getItem("currentUserFirstName")==null) ? (
        <LogbarUnauth/>
        ) : (
          <LogbarAuth/>
        )}
        <div className="wrapper row">
        <div className="col-sm-4">
        <ProfessionsTable/>
        </div>
        <div className="col-sm-8 mt-3">
        <Calendar />
        </div>
        </div>
      </div>
    ); 
  }
}

export default App;
