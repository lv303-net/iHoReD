import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class DoctorsListWithSomeRule extends Component {
    constructor(props){      
        super(props);
        this.state = { doc: [], idRule: 1 };      
        }
  
        static getDerivedStateFromProps(nextProps, prevState) {
          return {
            idRule: nextProps.idRule,
          }
        }
  
        shouldComponentUpdate(nextProps, nextState) {
          return (this.state.doc !== nextState.doc); 
        }
  
        getDoctors(){
        axios.get(server_url+'/rule/' + this.state.idRule + '/DoctorHasRule')
        .then(res => {
          this.setState({
            doc: res.data
          })
        });
      }
        
      render(){
        this.getDoctors();
        return  (
                    <div className="col-sm-6 list-group mt-4" id = "doctors">
                    <div className="list-group-item active bg-info">Doctors:</div>
                    {this.state.doc.map(doc => <div className='list-group-item list-group-active'key={doc.toString()}>{doc.FirstName + ' ' + doc.LastName}</div>)}                  
                    </div>
                    </div>
                    );
    }
}

export default DoctorsListWithSomeRule;

