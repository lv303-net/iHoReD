import React from 'react';
import { Component } from 'react';
import axios from 'axios';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class DoctorsListWithSomeRule extends Component {
    constructor(props){      
        super(props);
        this.state = { doc: [], idRule: 0 };      
        }
  
        shouldComponentUpdate(nextProps, nextState) {
          return (this.state.idRule !== nextProps.idRule); 
        }
        

        componentWillUpdate(nextProps, nextState){
        axios.get(server_url+'/rule/' + nextProps.idRule + '/DoctorHasRule')
        .then(res => {
          this.setState({
            idRule: nextProps.idRule,
            doc: res.data
          })
        });
      }
        
      render(){
        return  (
            <div className="list-group col-sm-6 mt-4" id = "doctors">
              <div className="list-group-item active bg-info">Doctors:</div>
              {this.state.doc.map(doc => <div className='list-group-item list-group-active'key={doc.toString()}>{doc.FirstName + ' ' + doc.LastName}</div>)}                  
            </div>
        );
    }
}

export default DoctorsListWithSomeRule;

