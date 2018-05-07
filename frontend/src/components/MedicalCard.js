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
const base_api_url = process.env.REACT_APP_BASE_API_URL;
var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"


class MedicalCard extends Component {
  render() {
    return(
      <div id="mainDiv">
        <div class="container">
        <div className="row">
        <div class="col">
        <PatientInfo/>  
         </div>       
          </div> 
          <div className="row mt-5">
            <PatientDiagnosesTable PatientId='67'/>            
          </div> 
        </div>
      </div>
    );
  }
}

export default MedicalCard;
