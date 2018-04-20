import React from 'react';
import { Component } from 'react';

import './App.css';
import axios from 'axios';
import validator from 'validator';

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
        <Logbar/>
        <div className="wrapper row mt-4">
        <ProfessionsTable/>
        <ProfessionTable/>
        <Datepicker/>
        </div>
        <Footerbar/>
      </div>
    );
  }
}


class Logbar extends React.Component
{
  
  constructor(props){
    super(props);
    this.validate=this.validate.bind(this);
    this.firstName='';
    this.lastName='';
    this.email='';
    this.password='';
    this.divFName = React.createRef();
    this.divLName = React.createRef();
    this.divEmail = React.createRef();
    this.divPass = React.createRef();
    this.btnSubmit= React.createRef();
  }
  
  handleSubmit = event => 
  {
    event.preventDefault();
    //const
    var user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    axios.post(server_url + '/api/Registration',user)
      .then(function (response) {
          //handle success
          console.log(response);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
              }

   validate() {
    var tempFName=false;
    var tempLName=false;
    var tempEmail=false;
    var tempPass=false;
    if ( validator.isAlpha(this.firstName,'en-GB')) {
      tempFName=true;
      this.divFName.current.textContent="";
    } else {
      tempFName=false;
      this.divFName.current.textContent="Your first name is not valid!";
    }
    if ( validator.isAlpha(this.lastName,'en-GB')) {
      var tempLName=true;
      this.divLName.current.textContent="";
    } else {
      var tempLName=false;
      this.divLName.current.textContent="Your last name is not valid!";
    }
    if ( validator.isEmail(this.email)) {
      var tempEmail=true;
      this.divEmail.current.textContent="";
    } else {
      var tempEmail=false;
      this.divEmail.current.textContent="Your email is not valid!";
    }
    if ( validator.isEmpty(this.password)==false) {
      var tempPass=true;
      this.divPass.current.textContent="";
    } else {
      var tempPass=false;
      this.divPass.current.textContent="Your have not enter the password!";
    }

    if(tempLName && tempLName && tempEmail && tempPass)
    {
      this.btnSubmit.current.disabled=false;
    }
    else
    {
      this.btnSubmit.current.disabled=true; 
    }
    return false;
  }
  render() {
  return (<div>
  			<nav className="navbar navbar-expand-sm navbar-custom  navbar-default sticky-top navbar-toggleable-md">
 			<p className='text-white mr-1'> </p><p className = 'text-white font-weight-bold mr-3' id = 'usernamebar'></p>
   			<div className = "container-fluid justify-content-center align-items-center navbar-collapse collapse ">
                <form className="form-inline" action="/action_page.php">
                    <input className="form-control mr-3"  type="text" placeholder="Login"/> 
                    <input className="form-control mr-3"  type="text" placeholder="Password"/> 
                    <div>
                    <button className="btn btn-info mr-2" type="submit">Sign in</button>
                    <button type="button" className="btn btn-info" data-toggle="modal" data-target="#myModal">Sign up</button> 
                    </div>
                    </form> 
                    </div>
        </nav>            
  <div className="modal fade" id="myModal">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Please, fill in the fields to register:</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
         <form className="ml-3 mr-3" onSubmit={this.handleSubmit} noValidate /*method="post" action="api/Registration" 
    encType="application/x-www-form-urlencoded"*/>
  <div className="form-row mb-3">
  <div className="form-group col-sm-6 col-xs-12" id="inputFName">
      <input type="text" className="form-control" onChange={(x => {this.firstName=x.target.value; this.validate()})} name="FIRSTNAME" placeholder="First Name" required/>
      <div id="invalidFname" ref={this.divFName}>
      </div>
    </div>
    <div className="form-group col-sm-6 col-xs-12" id="inputLName">
      <input type="text" className="form-control" onChange={(x => {this.lastName=x.target.value; this.validate()})} placeholder="Last Name" name="LASTNAME" required/>
      <div id="invalidLname" ref={this.divLName}>
      </div>
    </div>
    </div>
    <div className="form-row mb-3">
    <div className="form-group col-sm-6 col-xs-12" id="inputEmail">
      <input type="email"  className="form-control" onChange={(e)=> {this.email=e.target.value; this.validate()}} id="inputEmailtext" placeholder="Email" name="email" required/>
      <div id="invalidEmail" ref={this.divEmail}>
      </div>
    </div>
    <div className="form-group col-sm-6 col-xs-12" id="inputPassword">
      <input type="password"  className="form-control" placeholder="Password" onChange={(x => {this.password=x.target.value; ; this.validate()})} name="password" required/>
      <div id="invalidPassword" ref={this.divPass}>
      </div>
    </div>
    </div>
    <div className="form-group col-sm-6 col-xs-12">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck"/>
      <label className="form-check-label" htmlFor="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <div className="modal-footer form-group">
  <div className="row">
  <div className="col-12 col-sm-6 col-md-6">
        <button type="submit" ref={this.btnSubmit} disabled className="btn btn-info btn-lg">Sign up
          </button>
    </div>
    <div className="col-12 col-sm-6 col-md-6">   
        <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Close
          </button>
        </div>
    </div>
  </div>
</form>

      
      </div>
    </div> 
  </div>
</div>);
  }
}

class Datepicker extends React.Component {
  render() {
  return (<div className="col sm-2 md-9 lg-9 xl-9">
  <div className="container table-responsive">
      <table className="table table-bordered table-hover table-light">
        <thead>
        <tr>
            <th colSpan="8" className="bg-info text-white">Schedule:</th>

          </tr>
          <tr>
            <th>-/-</th>
            <th>Monday</th>
            <th className = "table-primary">Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>09:00-09:30</th>
            <td>-</td>
            <td className = "table-primary">-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
                  <th>09:30-10:00</th>
                  <td>-</td>
                  <td className = "table-primary">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
          </tr>
          <tr>
                  <th>10:00-10:30</th>
                  <td>-</td>
                  <td className = "table-primary">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
          </tr>
          <tr>
                  <th>10:30-11:00</th>
                  <td>-</td>
                  <td className = "table-primary">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
          </tr>
          <tr>
                  <th>11:00-11:30</th>
                  <td>-</td>
                  <td className = "table-primary">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
          </tr>
          <tr>
                  <th>11:30-12:00</th>
                  <td>-</td>
                  <td className = "table-primary">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
          </tr>
          <tr>
                  <th>12:00-12:30</th>
                  <td>-</td>
                  <td className = "table-primary">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
          </tr>
          <tr>
                  <th>12:30-13:00</th>
                  <td>-</td>
                  <td className = "table-primary">-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>)
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
         + doctor + '</a>';
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
