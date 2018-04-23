import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import DoctorTable from './DoctorTable';

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
        idArr: [],
        id: 1
        
      };
      this.eventHandler=this.eventHandler.bind(this);
      axios.get(server_url+'/ProfessionsStatic')
        .then(res => {
          res.data.forEach(profession => {
             const idArr = res.data;
             this.setState({
               idArr
             })
          });
        });
    };
    
    eventHandler(idP) {
      localStorage.setItem("currentProfession", idP)
      this.setState({
        id: idP
      })
    }

    render(){
      return <div className = "container">
       <div className="row justify-content-center">
       <div className="col-md-5 list-group mt-4" id="professions">
        <div className="list-group-item active bg-info">Professions:</div>
        {this.state.idArr.map(idArr => <div className='list-group-item list-group-item-active profDocTable' key={idArr.toString()} onClick={() => this.eventHandler(idArr[0])}>{idArr[1]}</div>)}
       </div> 
        <DoctorTable idProf={this.state.id}/> 
        </div>     
    </div>
    
  }
  }

  export default ProfessionsTable;