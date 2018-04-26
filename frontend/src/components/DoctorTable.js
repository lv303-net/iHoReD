import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import Calendar from './Calendar';
var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class DoctorTable extends React.Component{
    constructor(props){      
      super(props);
      this.state = { doc: [], idProf: 0, idDoc: 0};     
      this.eventHandler=this.eventHandler.bind(this);
    };

      eventHandler(idDoctor) {
        this.setState({
          idDoc: idDoctor
        })
      }

      shouldComponentUpdate(nextProps, nextState) {
        return (this.state.idProf !== nextProps.idProf); 
      }

      componentWillUpdate(nextProps, nextState)
      {
        axios.get(server_url+'/GetDoctors/' + nextProps.idProf)
        .then(res => {
        this.setState({
          idProf: nextProps.idProf,
          doc: res.data
        })
      });
      }
      
    render(){
      return  <div className = "container">
                  <div className="row justify-content-center">
                  <div className="list-group" role="tablist" id="professions">
                  <div className="list-group-item bg-info profDocHeader">Doctors:</div>
                  {this.state.doc.map(doc => <a className='list-group-item list-group-item-action profDocTable' data-toggle="list" role="tab" key={doc.toString()} onClick={() => this.eventHandler(doc[2])}><div>{doc[1] + ' ' + doc[0]}</div></a>)}                  
                  </div>
              
              </div>
              </div>
  }
  }

  export default DoctorTable;
