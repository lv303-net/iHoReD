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
    
constructor(props){
    
      super(props);
      this.state = {
        id: 1
      };
    };

    componentWillMount()
      {
        this.setState(function(prevState, props){
              return{
                id: localStorage.getItem("currentProfession")
              }
      });
    }

    getProfessions(){
      axios.get(server_url+'/ProfessionsStatic')
      .then(res => {
        res.data.forEach(profession => {
          document.getElementById("professions").innerHTML 
           //+= '<div  class="list-group-item list-group-item-active" onClick="item('+ profession[0] +');">'// + this.setProfession(); + '
           += '<div  class="list-group-item list-group-item-active" onclick={localStorage.setItem("currentProfession",' + profession[0] + ')}>'
           + profession[1] + '</div>';
           
        });
      });
      }

    render(){
      this.getProfessions();
      return <div className = "container col sm-1 md-1 lg-1 xl-1" id="container">
       <div className="list-group" id="professions">
       <a href="#" className="list-group-item active bg-info">Availible doctors:</a>
       </div> 
       <DoctorTable idProf={this.state.id}/>
    </div>
    
  }
  }

  export default ProfessionsTable;