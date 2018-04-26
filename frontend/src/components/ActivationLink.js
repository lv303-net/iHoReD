import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Route, Switch, BrowserRouter, Router} from 'react-router-dom';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

  class ActivationLink extends React.Component{
    constructor(props){      
      super(props);
      userId: " "
     
    }
    userId=this.props.match.params.id;
    componentWillMount()
    { 
      
        axios.get(server_url+'/Registration/'+this.userId)
        .then(res => {
            console.log(this.userId);
         
        
        });
      }
        
      render(){
        console.log(this.props.match.params.Id);
            return  (
          <div className='m-5'>
            <div className='row justify-content-center'>
             <h1 className='text-success'>Congratulations,you have successfully registered in Hospital Registration Desk!</h1>                  
            </div>
          </div>
        );
    }
}

export default ActivationLink;