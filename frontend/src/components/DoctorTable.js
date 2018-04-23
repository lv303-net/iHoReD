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

//console.log(localStorage.getItem("currentProfession"));
class DoctorTable extends React.Component{
    constructor(props){      
      super(props);
      this.state = { doc: [], idProf: 1, idDoc: 1};     
      this.eventHandler=this.eventHandler.bind(this);
    };
      
      static getDerivedStateFromProps(nextProps, prevState) {
        return {
          idProf: nextProps.idProf,
        }
      }

      eventHandler(idDoctor) {
        alert("Im here Doc")
        console.log(this.state.idDoc)
        this.setState({
          idDoc: idDoctor
        })
      }

      shouldComponentUpdate(nextProps, nextState) {
        return (this.state.doc !== nextState.doc); 
      }

      getDoctors(){
      axios.get(server_url+'/GetDoctors/' + this.state.idProf)
      .then(res => {
        this.setState({
          doc: res.data
        })
      });
    }
      
    render(){
      this.getDoctors();
      return  (
                  <div className="col-md-5 list-group mt-4" id = "doctors">
                  <div className="list-group-item active bg-info profDocHeader">Doctors:</div>
                  {this.state.doc.map(doc => <div className='list-group-item list-group-active profDocTable' key={doc.toString()} onClick={() => this.eventHandler(doc[2])}>{doc[1] + ' ' + doc[0]}</div>)}                  
                  </div>
                  );
  }
  }

  export default DoctorTable;