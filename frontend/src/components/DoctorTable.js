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
      this.state = { doc: [], idProf: 1 };
      //outhis.getDoctors = this.getDoctors.bind(this);
      
      }
      // componentWillMount()
      // {
      //   this.setState(function(prevState, props){
      //         return{
      //           idProfession: props.idProf
      //         }
      // });
       
      // };
      
      // componentWillReceiveProps(nextProps)
      // {
      //     if(this.props.idProf!=nextProps.idProf)
      //       this.setState((prevState, nextProps) =>
      //           {idProf: nextProps.idProf});
         
      // };

      static getDerivedStateFromProps(nextProps, prevState) {
        // if (nextProps.currentRow === prevState.lastRow){
        //   return null;
        // }
        // console.log(nextProps.idProf)
        return {
          idProf: nextProps.idProf,
        }
      }

      // componentDidUpdate(prevProps, prevState){
      //   if (this.state.idProf !== prevState.id) {
      //     this.setState({
      //       idProf: prevProps.idProf
      //     })
      //   }
      // }

      shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.idProf);
        console.log(this.props.idProf);
        return (this.props.idProf !== nextProps.idProf || this.state.doc !== nextState.doc); 
      }

      getDoctors(){
      console.log(this.state.idProf);
      axios.get(server_url+'/GetDoctors/' + this.state.idProf)
      .then(res => {
        // res.data.forEach(doctor => {
        //   let doctors = res.data;
             this.setState({
               doc: res.data
             })
        });
      //});
    }
      
    render(){
      this.getDoctors();
      console.log(this.state.doc);
      return  <div className="container col sm-1 md-1 lg-1 xl-1">
                  <div className="list-group" id = "doctors">
                  {this.state.doc.map(doc => <div key={doc.toString()}>{doc[1]}</div>)}
                  <a href="#" className="list-group-item active bg-info ">Choose the doctor:</a>
                  </div>
            </div>
  }
  }

  export default DoctorTable;