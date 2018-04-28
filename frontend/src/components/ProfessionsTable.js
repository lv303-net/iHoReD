import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import DoctorTable from './DoctorTable';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"
localStorage.removeItem("currentProfession");
//console.log(localStorage.getItem("currentProfession"));

class ProfessionsTable extends React.Component{
constructor(props){
      super(props);
      this.state = {
        professionsArr: [],
        id: 1
      };
      this.eventHandler=this.eventHandler.bind(this);
      axios.get(server_url+'/ProfessionsStatic')
        .then(res => {
          res.data.forEach(profession => {
             const professionsArr = res.data;
             this.setState({
               professionsArr
             })
          });
        });
    };
    
    addUrl(val) {
      var url = window.location.href;
      window.history.pushState( {} , '', '?prof='+val )
  };

    eventHandler(idP) {
      localStorage.setItem("currentProfession", idP)
      this.setState({
        id: idP
      })
    }

    render(){
      return <Router>
      <div className = "container">
      <div className="row justify-content-center">
       <div className="list-group" role="tablist" id="professions">
       <div className="list-group-item bg-info">Professions:</div>
        {this.state.professionsArr.map(professionsArr => <button className='list-group-item list-group-item-action profDocTable' data-toggle="list" role="tab" key={professionsArr.toString()} onClick={() => {this.eventHandler(professionsArr[0]),this.addUrl(professionsArr[1]);}}>{professionsArr[1]}</button>)}
       </div> 
        <DoctorTable idProf={this.state.id}/> 
        </div>  
        </div>
        </Router>

    
  }
  }

  export default ProfessionsTable;
