import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import LogbarAuth from './LogbarAuth';

class Edit extends Component {
  render() {
    return (
        <div className="App container-fluid">
        <LogbarAuth/>
        <div className="wrapper row mt-4">
        <ChangeInfo/>
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
  
function Footerbar(props){
  return <div>
    <p className='font-italic bg-secondary text-white text-center'>Ніхто ще не скаржився на наш сервіс!</p>
  </div>
}

class ChangeInfo extends React.Component{
  constructor(){
    super();
    //axios.get('http://localhost:58511/ProfessionsStatic')
    
  };
  render(){
    return <div className="container col-sm-8" id="editInfoWindow">
      <div id="editUserInfoHeader">
        <p className="col-sm-5 offset-sm-1" id="basicInfoID"><b>Basic info</b></p>
        <div className="col-sm-5" id="sexButtonWindow">
          <div className="radio col-sm-12" id="radioMaleWindow">
            <label>
              <input type="radio" name="optradio"/>Male
            </label>
          </div>
          <div class="col-sm-1"></div>
          <div className="radio col-sm-12" id="radioFemaleWindow">
            <label>
              <input type="radio" name="optradio"/>Female
            </label>
          </div>
        </div>
      </div>
      <div>
        <div className="form-row mb-1 marginTop10px">
          <div className="col-sm-4 offset-sm-1">
            <label>First name</label>
            <input type="text" className="form-control" placeholder="First Name"/>
          </div>
          <div className="col-sm-4 offset-sm-1">
            <label>Last name</label>
            <input type="text" className="form-control" placeholder="Last Name"/>
          </div>
        </div>
        <div className="form-row mb-1">
          <div className="col-sm-4 offset-sm-1">
            <label>Email</label>
            <input type="text" className="form-control" placeholder="Email"/>
          </div>
          <div className="col-sm-4 offset-sm-1">
            <label>Phone number</label>
            <input type="text" className="form-control" placeholder="Phone number"/>
          </div>
        </div>
      </div>

      <p className="marginTop35px offset-sm-1"><b>Home adress</b></p>
      <div className="form-row mb-1">
        <div className="col-sm-4 offset-sm-1">
          <label>Country</label>
          <input type="text" className="form-control" placeholder="Country"/>
        </div>
        <div className="col-sm-4 offset-sm-1">
          <label>City</label>
          <input type="text" className="form-control" placeholder="City"/>
        </div>
      </div>
      <div className="form-row mb-1">
        <div className="col-sm-4 offset-sm-1">
          <label>Street</label>
          <input type="text" className="form-control" placeholder="Street"/>
        </div>
        <div className="col-sm-4 offset-sm-1">
          <label>Apartment</label>
          <input type="text" className="form-control" placeholder="Apartment"/>
        </div>
      </div>
      <div className="form-row mb-2 justify-content-end col-sm-10 padding">
        <button type="button" className="btn btn-primary btn-md btn-clr btn-info">Submit</button>
      </div>
    </div>
  }
}
export default Edit;