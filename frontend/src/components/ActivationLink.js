import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Route, Switch, BrowserRouter, Router} from 'react-router-dom';
import Loader from 'react-loader';
var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

  class ActivationLink extends React.Component{
    constructor(props){      
      super(props);
      userId: " ",
      this.state = {
                loading: true
              };
     
    }
    userId=this.props.match.params.id;
    componentWillMount()
    { 
     
        axios.get(server_url+'/Registration/'+this.userId)
        .then(res => { 
        
        });
        setTimeout(() => this.setState({ loading: false }), 100);  
      }
        
      render(){
        const { loading } = this.state;
        
        
            return  (
          
            <Loader />
         
        );
    }
}

export default ActivationLink;