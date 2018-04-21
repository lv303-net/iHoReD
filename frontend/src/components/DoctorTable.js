import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import validator from 'validator';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored-backend.azurewebsites.net"

console.log(localStorage.getItem("currentProfession"));
class DoctorTable extends React.Component{
    constructor(props){
      
      super(props);
      
      /*this.state = {
        professionId:this.props.professionId
      };*/

      /*componentWillReceiveProps(nextProps)
      {
        this.setState(
          {
            professionId:nextProps.professionId
          }
        )
      }*/

      //axios.get('http://localhost:58511/api/Doctor')
      console.log(localStorage.getItem("currentProfession"));
      axios.get(server_url+'/GetDoctors/' + localStorage.getItem("currentProfession"))
      .then(res => {
  
        res.data.forEach(doctor => {
          document.getElementById("doctors").innerHTML 
           += '<div  class="list-group-item list-group-item-active">'
           + doctor[0] + ' ' + doctor[1] + '</div>';
        });
      });
    };
    render(){
    return  <div className="container col sm-1 md-1 lg-1 xl-1">
                  <div className="list-group" id = "doctors">
                  <a href="#" className="list-group-item active bg-info ">Choose the doctor:</a>
                  </div>
            </div>
  }
  }

  export default DoctorTable;