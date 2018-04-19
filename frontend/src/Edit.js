import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import validator from 'validator';
class Edit extends Component {
  render() {
    return (
        <div className="App container-fluid">
        <Logbar/>
        <div className="wrapper row mt-4">
        <ChangeInfo/>
        </div>
        <Footerbar/>
      </div>
    );
  }
}
var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored-backend.azurewebsites.net"
  


  function Logbar(props){
    return <div>
      <nav className="navbar navbar-expand-sm navbar-custom  navbar-default sticky-top navbar-toggleable-md">
         <p className='text-white mr-1'> </p><p className = 'text-white font-weight-bold mr-3' id = 'usernamebar'></p>
         <div className = "container-fluid justify-content-end align-items-center navbar-collapse collapse ">
          <form className="form-inline" action="/action_page.php">
            <div>
              Ihor Nytrebych     
              <Link to="/">   
                <button type="button" className="btn btn-info" data-toggle="modal" data-target="#myModal">Sign out</button> 
              </Link>
            </div>
          </form> 
        </div>
      </nav> 
    </div>
  }

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
    return <div className="container" id="professions">
    
    <div className="form-row mb-1 justify-content-center">
    <div className="col-sm-2">
      <label>First name</label>
      <input type="text" className="form-control" placeholder="First Name"/>
    </div>
    <div className="col-sm-2">
    <label>First name</label>
      <input type="text" className="form-control" placeholder="First Name"/>
    </div>
  </div>
  <div className="form-row mb-1 justify-content-center">
    <div className="col-sm-2">
    <label>Email</label>
      <input type="text" className="form-control" placeholder="First Name"/>
    </div>
    <div className="col-sm-2">
    <label>Password</label>
      <input type="text" className="form-control" placeholder="First Name"/>
    </div>
  </div>
  <div className="form-row mb-1 justify-content-center">
    <div className="col-sm-2">
    <label>First name</label>
      <input type="text" className="form-control" placeholder="First Name"/>
    </div>
    <div className="col-sm-2">
    <label>First name</label>
      <input type="text" className="form-control" placeholder="First Name"/>
    </div>
  </div>
  <div className="form-row mb-3 justify-content-center">
    <div className="col-sm-2">
    <label>Phone number</label>
      <input type="text" className="form-control" placeholder="First Name"/>
    </div>
    <div className="col-sm-2">
    <label>Home adress</label>
      <input type="text" className="form-control" placeholder="First Name"/>
    </div>
  </div>
  <div className="form-row mb-1 justify-content-center">
  <div className="radio col-sm-1">
    <label>
    <input type="radio" name="optradio"/>man
    </label>
    </div>
  <div className="radio col-sm-1">
    <label>
    <input type="radio" name="optradio"/>wooman
    </label>
    </div>
</div>
  <div className="form-row mb-2 justify-content-end col-sm-6 col-md-6 col-lg-10">
    <button type="button" className="btn btn-primary btn-md">Submit</button>
  </div>
  
</div>
}
}
export default Edit;