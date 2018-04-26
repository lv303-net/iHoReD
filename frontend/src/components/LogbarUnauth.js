import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import logo from '../images/logo.png';


var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class Authorization extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
          <div className="col-xs-12 col-sm-12 col-md-4">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 mt-3 pr-0 float-right">
                <button type="button" className="btn btn-info" data-toggle="modal" data-target="#SignInModal">Sign in</button>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 mt-3 float-right">
                <button type="button" className="btn btn-info" data-toggle="modal" data-target="#myModal">Sign up</button> 
              </div>
            </div>
          </div>          
    );
  }
}
class LogbarUnauth extends Component { 
  constructor(props){
    super(props);
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

    this.loginAuth='';
    this.passwordAuth='';
    this.btnSubmitAuth= React.createRef();

    this.validAll = false;
    this.validFirstName = false;
    this.validLastName = false;
    this.validPhone = false;
    this.validEmail = false;
    this.validPasword = false;
    this.validConfirmPassword = false;
  }

  handleSubmitAuth = event => 
  {
    event.preventDefault();
  //const 
    var userAuth ={
      email: this.loginAuth,
      password: this.passwordAuth
    }

    axios.post(server_url + '/api/Login', userAuth)
      .then(function (response) {
          window.location.reload();
          localStorage.setItem("currentUserFirstName", (response.data.FirstName));
          localStorage.setItem("currentUserLastName", (response.data.LastName));
      })
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
    
    if (this.validAll)  {
    localStorage.setItem("currentUserFirstName", (this.firstNameRegistr));
    localStorage.setItem("currentUserLastName", (this.lastNameRegistr));

    axios.post(server_url + '/api/Registration',userRegister)
      .then(function (response) {
          //handle success
          window.location.reload();
          console.log(response);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
    }
  }

  checkPassword() {
    var password = this.passwordRegistr;
    var confirmPassword = this.confirmPasswordRegistr;
    if (password != confirmPassword) {
      console.log("Password isn't the same");
      this.validConfirmPassword = false;
      return false;
    }
    else {
      this.validConfirmPassword = true;  
      return true;
    }
  }

  showError() {
    if (this.validFirstName && this.validLastName && this.validPhone && this.validEmail && this.validPasword && this.validConfirmPassword) {
      this.validAll = true;
    }
    else {
      this.validAll = false;

      if (this.validFirstName) {
        this.divFNameRegistr.current.textContent='';
      }
      else {
        this.divFNameRegistr.current.textContent='Please enter a valid firstname';
      }
      if (this.validLastName) {
        this.divLNameRegistr.current.textContent='';
      }
      else {
        this.divLNameRegistr.current.textContent='Please enter a valid lastname';
      }
      if (this.validPhone) {
        this.divPhoneRegistr.current.textContent='';
      }
      else {
        this.divPhoneRegistr.current.textContent='Please enter a valid phone number';
      }
      if (this.validEmail) {
        this.divEmailRegistr.current.textContent='';
      }
      else {
        this.divEmailRegistr.current.textContent="Please enter a valid email";
      }
      if (this.validPasword) {
        this.divPassRegistr.current.textContent='';
      }
      else {
        this.divPassRegistr.current.textContent="Please enter a valid password";
      }
      console.log(this.validConfirmPassword);
      if (this.validConfirmPassword) {
        this.divConfirmPassRegistr.current.textContent='';
      }
      else {
        this.divConfirmPassRegistr.current.textContent="Your passwords don't match";
      }
      
    }
  }
  
  validateFirstName() {
    if ( validator.isAlpha(this.firstNameRegistr,'en-GB')) {
      this.validFirstName = true;
      return true;
    } else {
      this.validFirstName = false;
      return false;
    }
  }

  validateLastName() {
    if ( validator.isAlpha(this.lastNameRegistr,'en-GB')) {
      this.validLastName=true;
      return true;
    } else {
      this.validLastName=false;
      return false;
    }
  }

  validatePhone() {
    if ( validator.isMobilePhone(this.phoneRegistr, 'uk-UA')) {
      this.validPhone = true;
      return true;
    } else {
      this.validPhone = false;
      return false;
    }        
  }

  validateEmail() {
    if ( validator.isEmail(this.emailRegistr)) {
      this.validEmail=true;
      return true;
    } else {
      this.validEmail=false;
      return false;
    }
  }
  
  validatePassword() {   
    if ( validator.isEmpty(this.passwordRegistr)==false) {
      this.validPasword=true;
      return true;
    } else {
      this.validPasword=false;
      return false;
    }
  }

  // validateAll() {    
  //   if(this.validateFirstName() && this.validateLastName() && this.validatePhone() && 
  //       this.validateEmail() && this.validatePassword() && this.checkPassword())
  //   {
  //     this.btnSubmitRegistr.current.disabled=false;
  //     return false
  //   }
  //   else
  //   {
  //     this.btnSubmitRegistr.current.disabled=true; 
  //     return true;
  //   }    
  // }
   
  render() {
  return (
  <div className="mb-4 navbar-custom">
     <nav className="navbar navbar-expand-sm navbar-custom  navbar-default sticky-top navbar-toggleable-md">
        <div className = "container-fluid justify-content-center navbar-collapse collapse navbarContainer">
          <div className = "container-fluid">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-8 text-center">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-2">
                    <a className="navbar-brand" href="#">
                      <img className="logo" src={logo}></img>
                    </a> 
                  </div>    
                  <div className="col-xs-12 col-sm-12 col-md-5">
                    <h2>Lviv Regional Hospital</h2>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-4 vertical">
                    <h5>9, Mykolaychuk Str.</h5>
                    <h5>(032) 252 70 11</h5>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 text-center">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6"></div>
                  <Authorization/>
                  <div className="col-xs-12 col-sm-12 col-md-2 mt-3">
                  <button class="btn btn-info align-right" type="button" data-toggle="collapse" data-target="#collapsedMenu" aria-expanded="false" aria-controls="collapseExample">
                    ham</button> 
                  </div>
                </div >
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="collapse container-fluid pl-0 pr-0" id="collapsedMenu">
            <ul className="nav justify-content-center btn-group btn-group-lg">
                <li><a href="#" class="btn btn-custom btn-lg active" role="button" aria-pressed="true">Home</a></li>
                <li><a href="#" class="btn btn-custom btn-lg active" role="button" aria-pressed="true">Contacts</a></li>
                <li><a href="#" class="btn btn-custom btn-lg active" role="button" aria-pressed="true">Doctors</a></li>
                <li><a href="#" class="btn btn-custom btn-lg active" role="button" aria-pressed="true">News</a></li>
                <li><a href="#" class="btn btn-custom btn-lg active" role="button" aria-pressed="true">Illnes prevention</a></li>
                <li><a href="#" class="btn btn-custom btn-lg active" role="button" aria-pressed="true">National medicine program</a></li>
            </ul>  
      </div>

      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header mb-5">
              <h4 className="modal-title">Registration Form</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <form className="ml-3 mr-3" onSubmit={this.handleSubmitRegistr} noValidate>    
              <div className="form-row mb-3 justify-content-center">
                <div className="form-group col-sm-6 col-xs-12" id="inputFName">
                  <input type="text" 
                          className="form-control"
                          onChange={(x => {this.firstNameRegistr=x.target.value; this.validateFirstName()})}  
                          name="FIRSTNAME" 
                          placeholder="First Name" 
                          required/>
                  <div id="invalidFname" className="text-muted" ref={this.divFNameRegistr}>
                  </div>
                </div>
              </div>
              <div className="form-row mb-3 justify-content-center">
                <div className="form-group col-sm-6 col-xs-12" id="inputLName">
                  <input type="text" 
                          className="form-control" 
                          onChange={(x => {this.lastNameRegistr=x.target.value; this.validateLastName()})} 
                          placeholder="Last Name" 
                          name="LASTNAME" 
                          required/>
                  <div id="invalidLname" className="text-muted" ref={this.divLNameRegistr}>
                  </div>
                </div>
              </div>
              <div className="form-row mb-3 justify-content-center">
                <div className="form-group col-sm-6 col-xs-12" id="inputPhone">
                  <input type="tel"  
                          className="form-control" 
                          onChange={x=> {this.phoneRegistr=x.target.value; this.validatePhone()}} 
                          placeholder="Phone" 
                          name="phone" 
                          required/>
                  <div id="invalidPhone" className="text-muted" ref={this.divPhoneRegistr}>
                  </div>
                </div>
              </div>
              <div className="form-row mb-3 justify-content-center">
                <div className="form-group col-sm-6 col-xs-12" id="inputEmail">
                  <input type="email"  
                          className="form-control" 
                          onChange={x=> {this.emailRegistr=x.target.value; this.validateEmail()}} 
                          id="inputEmailtext" 
                          placeholder="Email" 
                          name="email" 
                          required/>
                  <div id="invalidEmail" className="text-muted" ref={this.divEmailRegistr}>
                  </div>
                </div>
              </div>
              <div className="form-row mb-3 justify-content-center">
                <div className="form-group col-sm-6 col-xs-12" id="inputPassword">
                  <input type="password"  
                          className="form-control" 
                          placeholder="Password" 
                          onChange={(x => {this.passwordRegistr=x.target.value; this.validatePassword()})}
                          name="password" 
                          required/>
                  <div id="invalidPassword" className="text-muted" ref={this.divPassRegistr}>
                  </div>
                </div>
              </div>
              <div className="form-row mb-3 justify-content-center">
                <div className="form-group col-sm-6 col-xs-12" id="inputConfirmPassword">
                  <input type="password"  
                          className="form-control" 
                          placeholder="Confirm Password" 
                          onChange={(x => {this.confirmPasswordRegistr=x.target.value; this.checkPassword()})} 
                          onPaste={x => {x.preventDefault()}} 
                          name="confirmPassword" 
                          required/>
                  <div id="invalidConfirmPassword" className="text-muted" ref={this.divConfirmPassRegistr}>
                  </div>
                </div>
              </div>
              <div className="row mb-3 mt-5 justify-content-center">
                <div className="col-xs-3 col-sm-3 col-md-3 text-center">
                  <button type="submit" ref={this.btnSubmitRegistr} onClick={(x=>this.showError())} className="btn btn-info btn-lg mb-3">Sign up
                  </button>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 text-center" >   
                  <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
          </div>
          </div>

        <div className="modal fade" id="SignInModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header mb-5">
              <h4 className="modal-title">Please, enter Your creds</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <form className="ml-3 mr-3" onSubmit={this.handleSubmitAuth}>
              <div className="form-row mb-3 justify-content-center">
                <div className="form-group col-sm-6 col-xs-12">
                  <input className="form-control"  type="text" placeholder="Email" onBlur={(x => {this.loginAuth=x.target.value; })} required/>
                </div>
              </div>
              <div className="form-row mb-3 justify-content-center">
                <div className="form-group col-sm-6 col-xs-12">
                  <input className="form-control"  type="password" placeholder="Password" onBlur={(x => {this.passwordAuth=x.target.value; })} required/> 
                </div>
              </div>
              <div className="row mb-3 mt-5 justify-content-center">
                <div className="col-xs-3 col-sm-3 col-md-3 text-center">
                  <button type="submit" className="btn btn-info btn-lg mb-3">Sign in
                  </button>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 text-center" >   
                  <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div> 
      </div>

          </div>
        );
      }
      
    }


    
export default LogbarUnauth;