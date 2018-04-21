import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

class LogbarAuth extends Component {
    //SignOutSubmit = event => 
    //{
      //  localStorage.removeItem("currentUserFirstName");
     //   localStorage.removeItem("currentUserLastName");
    //}
    SignOut(){
        localStorage.removeItem("currentUserFirstName");
        localStorage.removeItem("currentUserLastName");
    }
    render(){
    return <div>
      <nav className="navbar navbar-expand-sm navbar-custom  navbar-default sticky-top navbar-toggleable-md">
         <p className='text-white mr-1'> </p><p className = 'text-white font-weight-bold mr-3' id = 'usernamebar'></p>
         <div className = "container-fluid justify-content-end align-items-center navbar-collapse collapse ">
          <form className="form-inline" action="/action_page.php">
            <div>
              {localStorage.getItem("currentUserFirstName") + " " + localStorage.getItem("currentUserLastName") + " "} 
              <Link to="/">   
                <button type="button" className="btn btn-info" onClick={this.SignOut}>Sign out</button> 
              </Link>
            </div>
          </form> 
        </div>
      </nav> 
    </div>
  }
}
export default LogbarAuth;