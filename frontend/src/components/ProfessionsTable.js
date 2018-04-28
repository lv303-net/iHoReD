import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import DoctorTable from './DoctorTable';
import '../style/Professions.css'

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
    
    eventHandler(idP) {
      localStorage.setItem("currentProfession", idP)
      this.setState({
        id: idP
      })
    }

    render(){
      return <div className="col-sm-12 col-md-3 mr-5 divTwo">
              <div className="row">
              <div className="list-group mb-2 col-sm-6 col-md-12" id="professions">
                <div className="list-group-item bg-info">
                  <p>Professions</p>
                  <i className="fas fa-angle-down"></i>                
                </div>                  
                <div className='listA'>
                  {this.state.professionsArr.map(professionsArr => <a className='list-group-item list-group-item-action profDocTable' data-toggle="list" role="tab" key={professionsArr.toString()} onClick={() => this.eventHandler(professionsArr[0])}><div>{professionsArr[1]}</div></a>)}
                </div>
                </div> 
                <DoctorTable idProf={this.state.id}/> 
                </div>
        </div>

    
  }
  }

  export default ProfessionsTable;
