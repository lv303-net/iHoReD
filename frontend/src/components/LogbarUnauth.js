import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored-backend.azurewebsites.net"
class Authorization extends React.Component {
    constructor(props){
      super(props);
      this.loginAuth='';
      this.passwordAuth='';
    }
    
    handleSubmitAuth = event => 
    {
      event.preventDefault();
      //const
  
      var userAuth ={
        email: this.loginAuth,
        password: this.passwordAuth
      }
  
      axios.post(server_url + '/api/Login',userAuth)
        .then(function (response) {
            //handle success
            window.location.assign("/startPage")
            console.log(response.data);
            console.log(localStorage.getItem("currentUserLastName"));
            localStorage.setItem("currentUserFirstName", (response.data.FirstName));
            localStorage.setItem("currentUserLastName", (response.data.LastName));
            console.log(localStorage.getItem("currentUserFirstName"));
            console.log(localStorage.getItem("currentUserLastName"));
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }
  
      render() {
        return(
          <div className='divRender'>
            <form className="ml-3 mr-3 navbarForm" onSubmit={this.handleSubmitAuth} noValidate >
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-3 mb-2 navbarDiv">
                    <input className="form-control col-12"  type="text" placeholder="Email" onBlur={(x => {this.loginAuth=x.target.value; })}/> 
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-3 mb-2">
                    <input className="form-control col-12"  type="text" placeholder="Password" onBlur={(x => {this.passwordAuth=x.target.value; })}/>           
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-3 mb-2">
                    <button type="submit"  ref={this.btnSubmit} className="btn btn-info col-xs-6">Sign in</button>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-3 mb-2">
                    <button type="button" className="btn btn-info" data-toggle="modal" data-target="#myModal">Sign up</button> 
                  </div>
                </div>
              </div>          
            </form>
          </div>
        );
      }
      
    }

class LogbarUnauth extends Component { 
      constructor(props){
        super(props);
        // this.validate=this.validate.bind(this);
        this.firstNameRegistr='';
        this.lastNameRegistr='';
        this.emailRegistr='';
        this.passwordRegistr='';
        this.confirmPasswordRegistr='';
        this.phoneRegistr='';
    
        this.divFNameRegistr = React.createRef();
        this.divLNameRegistr = React.createRef();
        this.divPhoneRegistr = React.createRef();
        this.divEmailRegistr = React.createRef();
        this.divPassRegistr = React.createRef();
        this.divConfirmPassRegistr = React.createRef();
        this.btnSubmitRegistr= React.createRef();
      }
      
      handleSubmitRegistr = event => 
      {
        event.preventDefault();
        //const
        var userRegister = {
          firstName: this.firstNameRegistr,
          lastName: this.lastNameRegistr,
          email: this.emailRegistr,
          password: this.passwordRegistr,
          phone: this.phoneRegistr
        };
        
        
        localStorage.setItem("currentUserFirstName", (this.firstNameRegistr));
        localStorage.setItem("currentUserLastName", (this.lastNameRegistr));

        axios.post(server_url + '/api/Registration',userRegister)
          .then(function (response) {
              //handle success
              window.location.assign("/startPage")
              console.log(response);
          })
          .catch(function (response) {
              //handle error
              console.log(response);
          });
      }
    
      checkPassword() {
        var password = this.passwordRegistr;
        var confirmPassword = this.confirmPasswordRegistr;
        this.divConfirmPassRegistr.current.textContent="";
        if (password != confirmPassword) {
          this.divConfirmPassRegistr.current.textContent="Your passwords don't match!";
          return false;
        }
        return true;
      }
    
      validateFirstName() {
        var tempFName=false;
        if ( validator.isAlpha(this.firstNameRegistr,'en-GB')) {
          tempFName=true;
          this.divFNameRegistr.current.textContent="";
          return true;
        } else {
          tempFName=false;
          this.divFNameRegistr.current.textContent="Your first name is not valid!";
          return false;
        }
      }
    
      validateLastName() {
        var tempLName=false;
        if ( validator.isAlpha(this.lastNameRegistr,'en-GB')) {
          tempLName=true;
          this.divLNameRegistr.current.textContent="";
          return true;
        } else {
          tempLName=false;
          this.divLNameRegistr.current.textContent="Your last name is not valid!";
          return false;
        }
      }
    
      validatePhone() {
        var tempPhone=false;
        if ( validator.isMobilePhone(this.phoneRegistr, 'uk-UA')) {
          var tempPhone=true;
          this.divPhoneRegistr.current.textContent="";
          console.log(this.phoneRegistr);
          return true;
        } else {
          var tempPhone=false;
          this.divPhoneRegistr.current.textContent="Your phone is not valid!";
          return false;
        }
        
      }
    
      validateEmail() {
        var tempEmail=false;
        if ( validator.isEmail(this.emailRegistr)) {
          var tempEmail=true;
          this.divEmailRegistr.current.textContent="";
          return true;
        } else {
          var tempEmail=false;
          this.divEmailRegistr.current.textContent="Your email is not valid!";
          return false;
        }
      }
      
      validatePassword() {   
        var tempPass=false;
        if ( validator.isEmpty(this.passwordRegistr)==false) {
          var tempPass=true;
          this.divPassRegistr.current.textContent="";
          return true;
        } else {
          var tempPass=false;
          this.divPassRegistr.current.textContent="You have not enter the password!";
          return false;
        }
      }
    
      validateAll() {    
        if(this.validateFirstName() && this.validateLastName() && this.validatePhone() && 
            this.validateEmail() && this.validatePassword() && this.checkPassword())
        {
          this.btnSubmitRegistr.current.disabled=false;
          return false
        }
        else
        {
          this.btnSubmitRegistr.current.disabled=true; 
          return true;
        }
      }
       
      render() {
      return (<div>
              <nav className="navbar navbar-expand-sm navbar-custom  navbar-default sticky-top navbar-toggleable-md">
                 <p className='text-white mr-1'> </p><p className = 'text-white font-weight-bold mr-3' id = 'usernamebar'></p>
                   <div className = "container-fluid justify-content-center align-items-center navbar-collapse collapse navbarContainer">
                <Authorization/>
            </div>
          </nav>            
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Registration Form</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
             <form className="ml-3 mr-3" onSubmit={this.handleSubmitRegistr} noValidate /*method="post" action="api/Registration" 
        encType="application/x-www-form-urlencoded"*/>
      
      <div className="form-row mb-3 justify-content-center">
        <div className="form-group col-sm-6 col-xs-12" id="inputFName">
          <input type="text" className="form-control" onBlur={(x => {this.firstNameRegistr=x.target.value; this.validateFirstName()})} name="FIRSTNAME" placeholder="First Name" required/>
          <div id="invalidFname" ref={this.divFNameRegistr}>
          </div>
        </div>
      </div>
      <div className="form-row mb-3 justify-content-center">
        <div className="form-group col-sm-6 col-xs-12" id="inputLName">
          <input type="text" className="form-control" onBlur={(x => {this.lastNameRegistr=x.target.value; this.validateLastName()})} placeholder="Last Name" name="LASTNAME" required/>
          <div id="invalidLname" ref={this.divLNameRegistr}>
          </div>
        </div>
      </div>
      <div className="form-row mb-3 justify-content-center">
        <div className="form-group col-sm-6 col-xs-12" id="inputPhone">
          <input type="tel"  className="form-control" onBlur={x=> {this.phoneRegistr=x.target.value; this.validatePhone()}} placeholder="Phone" name="phone" required/>
          <div id="invalidPhone" ref={this.divPhoneRegistr}>
          </div>
        </div>
      </div>
      <div className="form-row mb-3 justify-content-center">
        <div className="form-group col-sm-6 col-xs-12" id="inputEmail">
          <input type="email"  className="form-control" onBlur={x=> {this.emailRegistr=x.target.value; this.validateEmail()}} id="inputEmailtext" placeholder="Email" name="email" required/>
          <div id="invalidEmail" ref={this.divEmailRegistr}>
          </div>
        </div>
      </div>
      <div className="form-row mb-3 justify-content-center">
        <div className="form-group col-sm-6 col-xs-12" id="inputPassword">
          <input type="password"  className="form-control" placeholder="Password" onBlur={(x => {this.passwordRegistr=x.target.value; this.validatePassword() })} name="password" required/>
          <div id="invalidPassword" ref={this.divPassRegistr}>
          </div>
        </div>
      </div>
      <div className="form-row mb-3 justify-content-center">
        <div className="form-group col-sm-6 col-xs-12" id="inputConfirmPassword">
          <input type="password"  className="form-control" placeholder="Confirm Password" onChange={(x => {this.confirmPasswordRegistr=x.target.value; this.checkPassword(); this.validateAll()})} onPaste={x => {x.preventDefault()}} name="confirmPassword" required/>
          <div id="invalidConfirmPassword" ref={this.divConfirmPassRegistr}>
          </div>
        </div>
      </div>
      <div className="form-row mb-3">
      <div className="form-group col-sm-6 col-xs-12  ">
      </div>
      <div className="form-group col-sm-6 col-xs-12  ">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="gridCheck"/>
          <label className="form-check-label" htmlFor="gridCheck">
            Remember Me
          </label>
        </div>
      </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <div className="col-xs-3 col-sm-3 col-md-3">
          <button type="submit"  ref={this.btnSubmitRegistr} disabled className="btn btn-info btn-lg mb-3">Sign up
          </button>
        </div>
        <div className="col-xs-3 col-sm-3 col-md-3" >   
          <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Close
          </button>
        </div>
      </div>
    </form>
          </div>
        </div> 
      </div>
    </div>);
      }
    }
    
export default LogbarUnauth;