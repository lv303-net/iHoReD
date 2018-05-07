import React from 'react';
import { Component } from 'react';
import LogbarUnauth from './LogbarUnauth';
import LogbarAuth from './LogbarAuth';

  class LogbarWrapper extends Component {
    render(){
        return(
            <div>
              {(localStorage.getItem("currentUserFirstName")==null) ? (<LogbarUnauth/>) : (<LogbarAuth/>)}
            </div>
        );
    }
  }

  export default LogbarWrapper;