import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

class LogbarAuth extends Component {
  SignOut(){
      localStorage.removeItem("currentUserFirstName");
      localStorage.removeItem("currentUserLastName");
  }
  
  render(){
    return (
      <div>
        <form className="form-inline" action="/action_page.php">
          <div>
            {localStorage.getItem("currentUserFirstName") + " " + localStorage.getItem("currentUserLastName") + " "} 
            <Link to="/">   
              <button type="button" className="btn btn-info" onClick={this.SignOut}>Sign out</button> 
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default LogbarAuth;