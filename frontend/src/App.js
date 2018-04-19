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


const base_api_url = process.env.REACT_APP_BASE_API_URL;
var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored-backend.azurewebsites.net"

  console.log(localStorage.getItem("currentUserFirstName"));
  console.log(localStorage.getItem("currentUserLastName"));

class App extends Component {
render() {
    return (
        <div className="App container-fluid">
        {(localStorage.getItem("currentUserFirstName")==null) ? (
        <LogbarUnauth/>
        ) : (
          <LogbarAuth/>
        )}
        <div className="wrapper row mt-4">
        <ProfessionsTable/>
        <ProfessionTable/>
        <Calendar/>
        </div>
        <Footerbar/>
      </div>
    ); 
  }
}

  class Footerbar extends React.Component{
    render() {
    return (<div>
      <p className='font-italic bg-secondary text-white text-center'></p>
    </div>)
    }
  }
  
  class ProfessionsTable extends React.Component{
    constructor(){
      super();
      //axios.get('http://localhost:58511/ProfessionsStatic')
      axios.get(server_url+'/ProfessionsStatic')
      .then(res => {
  
        res.data.forEach(doctor => {
          document.getElementById("professions").innerHTML 
           += '<a href="javascript:void(0)" class="list-group-item list-group-item-active">'
           + doctor[1] + '</a>';
        });
      });
    };
    render(){
      return <div className = "container col sm-1 md-1 lg-1 xl-1">
       <div className="list-group" id="professions">
       <a href="#" className="list-group-item active bg-info">Availible doctors:</a>
       </div>
    </div>
  }
  }
  class ProfessionsTableRow extends React.Component {
    render() {
      var classi = (this.props.professionsdata.isStatic) ? "list-group-item list-group-item-active" : "list-group-item list-group-item-secondary";
       return (
        <a href="javascript:void(0)" className={classi}>{this.props.professionsdata.name}</a>
       );
    }
  }
  class ProfessionTable extends React.Component{
    constructor(){
      super();
      //axios.get('http://localhost:58511/api/Doctor')
      axios.get(server_url+'/api/Doctor')
      .then(res => {
  
        res.data.forEach(doctor => {
          document.getElementById("doctors").innerHTML 
           += '<a href="javascript:void(0)" class="list-group-item list-group-item-active">'
           + doctor.FirstName + ' ' + doctor.LastName + '</a>';
        });
      });
    };
    render(){
    return  <div className="container col sm-1 md-1 lg-1 xl-1">
                  <div className="list-group" id = "doctors">
                  <a href="#" className="list-group-item active bg-info ">Choose the doctor:</a>
                  </div>
            </div>
  }
  }

class ProfessionTableRow extends React.Component {
  
  render() {
    return (
     <a href="javascript:void(0)" className="list-group-item list-group-item-active">{this.props.professiondata.name}</a>
    );     
  }
}

export default App;
