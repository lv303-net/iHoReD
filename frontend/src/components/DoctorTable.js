import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import Calendar from './Calendar';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored-backend.azurewebsites.net"

console.log(localStorage.getItem("currentProfession"));
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
        console.log(nextProps.idProf);
        console.log(this.props.idProf);
        return (this.state.doc !== nextState.doc); 
      }

      getDoctors(){
      console.log(this.state.idProf);
      axios.get(server_url+'/GetDoctors/' + this.state.idProf)
      .then(res => {
             this.setState({
               doc: res.data
             })
        });
    }
      
    render(){
      this.getDoctors();
      return  <div className="container col sm-1 md-1 lg-1 xl-1">
                  <div className="list-group" id = "doctors">
                  {this.state.doc.map(doc => <div key={doc.toString()} onClick={() => this.eventHandler(doc)}>{doc[1]}</div>)}
                  <a href="#" className="list-group-item active bg-info ">Choose the doctor:</a>
                  </div>
                  <Calendar idDoctor={this.state.idDoc}/>
            </div>
  }
  }

  export default DoctorTable;