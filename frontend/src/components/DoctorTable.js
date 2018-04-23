import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import validator from 'validator';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

//console.log(localStorage.getItem("currentProfession"));
class DoctorTable extends React.Component{
    constructor(props){      
      super(props);
      this.state = { doc: [], idProf: 1 };      
      }

      static getDerivedStateFromProps(nextProps, prevState) {
        // if (nextProps.currentRow === prevState.lastRow) {
        //   return null;
        // }
        return {
          idProf: nextProps.idProf,
        }
      }

      shouldComponentUpdate(nextProps, nextState) {
        return (this.state.doc !== nextState.doc); 
      }

      getDoctors(){
      //console.log(this.state.idProf);
      axios.get(server_url+'/GetDoctors/' + this.state.idProf)
      .then(res => {
        this.setState({
          doc: res.data
        })
      });
    }
      
    render(){
      this.getDoctors();
      //console.log(this.state.doc);
      return  (
                  <div className="col-md-5 list-group mt-4" id = "doctors">
                  <div className="list-group-item active bg-info profDocHeader">Doctors:</div>
                  {this.state.doc.map(doc => <div className='list-group-item list-group-active profDocTable'key={doc.toString()}>{doc[1] + ' ' + doc[0]}</div>)}                  
                  </div>
                  );
  }
  }

  export default DoctorTable;