import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

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
  
      //axios.post(localStorage.getItem("server_url") + '/api/Login',userAuth)
      axios({
        method: 'post',
        url: localStorage.getItem("server_url") + '/api/Login',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        },
        data: JSON.stringify(userAuth)
      })
        .then(function (response) {
            //handle success
            window.location.assign("/startPage");
            localStorage.setItem("currentUserFirstName", (response.data.FirstName));
            localStorage.setItem("currentUserLastName", (response.data.LastName));
        })
        .catch();
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