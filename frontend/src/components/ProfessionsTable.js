import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import DoctorTable from './DoctorTable';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored-backend.azurewebsites.net"
//localStorage.removeItem("currentProfession");
class ProfessionsTable extends React.Component{
    
constructor(){
    
      super();
      this.handleClick = this.handleClick.bind(this);
      this.state = {
        justClicked: null
      };

      //axios.get('http://localhost:58511/ProfessionsStatic')
      axios.get(server_url+'/ProfessionsStatic')
      .then(res => {
        res.data.forEach(profession => {
          document.getElementById("professions").innerHTML 
           //+= '<div  class="list-group-item list-group-item-active" id="'+profession[0]+'">'// + this.setProfession(); + '
           += '<div  class="list-group-item list-group-item-active" onclick={localStorage.setItem("currentProfession",' + profession[0] + ')}>'
           + profession[1] + '</div>';
        });
      });
      console.log(this.state.justClicked);
    };
    handleClick(letter) {
      this.setState({ justClicked: letter });
    }

    render(){
      return <div className = "container col sm-1 md-1 lg-1 xl-1">
       <div className="list-group" id="professions">
       <a href="#" className="list-group-item active bg-info">Availible doctors:</a>
       </div>
       
    </div>
    
  }
  }

  export default ProfessionsTable;