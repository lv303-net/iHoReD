import React from 'react';
import { Component } from 'react';

import axios from 'axios';

import validator from 'validator';
class Diagnoses extends Component {
  render() {
    return (
        <div className="App container-fluid">
        <Logbar/>
        <div className="wrapper row mt-4">
        <AllDiagnoses/>
        </div>
      </div>
    );
  }
}
var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"
  


function Logbar(props){
  return <div>
  	<nav className="navbar navbar-expand-sm navbar-custom  navbar-default sticky-top navbar-toggleable-md">
 			<p className='text-white mr-1'> </p><p className = 'text-white font-weight-bold mr-3' id = 'usernamebar'></p>
   		<div className = "container-fluid justify-content-end align-items-center navbar-collapse collapse ">
        <form className="form-inline" action="/action_page.php">
          <div>
            <h7>Ihor Nytrebych </h7>
            <button type="button" className="btn btn-info" data-toggle="modal" data-target="#myModal">Sign out</button> 
          </div>
        </form> 
      </div>
    </nav> 
  </div>
}

function AllDiagnoses(props){
  return <div className="col sm-1 md-8 lg-9 xl-10">
  <div className="container table-responsive">
    <table className="table table-bordered table-hover table-light">
      <thead>
        <tr>
          <th colSpan="8" className="bg-info text-white">Diagnoses</th>
        </tr>
        <tr>
          <th>№</th>
          <th>Diagnos</th>
          <th>Srart</th>
          <th>Finish</th>
          <th>Doctor</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>2</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>3</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>4</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>5</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
}
export default Diagnoses;