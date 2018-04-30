import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Route, Switch, BrowserRouter, Router} from 'react-router-dom';
import Loader from 'react-loader';
import StartPatientPage from './StartPatientPage';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

  class Direction extends React.Component{
    constructor(props){      
      super(props);
      this.state = {
        text: ""
      };
    }

    render() {
      return (
        this.props.redirect ? (
          <div className = "container m-5">
            <div className="row justify-content-center"><h1 className='text-success'>{this.props.text}</h1></div>            
          </div>
        )
      : 
        <div className = "container m-5">
        <div className="row justify-content-center"><h1 className='text-warning'>{this.props.text}</h1></div>            
      </div>
      
      );
    }
  }
  
  class ActivationLink extends React.Component{
    constructor(props){      
      super(props);
       console.log(this.props)
           this.state = {
            loading: true,
            text: "",
            isRegistrated:"",
            redirect:"",
           
      };
      this.eventHandler=this.eventHandler.bind(this);           
    }
  eventHandler(isReg) {
        switch(isReg){
        case 0: 
        this.setState({
          text:"You are already registered!",
          redirect: true
        }); 
        break;    
        case -1:
        this.setState({
          text:"Please go to the main page and sign up.",
          redirect: false
        })
        break;
        case 1:
         this.setState({
           text:"Congratulations, you have successfully registered in HoReD!",
           redirect: true
          }); 
         break;   
        }      
      } 
      userId=this.props.match.params.id;
     componentDidMount(){
      setTimeout(() => {axios.get(server_url+'/Registration/'+this.userId)
              .then(rez => {
                console.log(rez.data);
                this.setState({loading: false,
                isRegistrated:rez.data});
                this.eventHandler(this.state.isRegistrated);        
                  })                
              .catch(err => console.log(err.response.status));    
          }, 2000);            
        }      
   render(){    
      const { loading } = this.state;
      const { text } = this.state;
      const { isRegistrated } = this.state;
      const { redirect} = this.state;
       
          //        return  (
          //   this.state.loading  ? <Loader />: 
          //   <div className = "container m-5">
          //   <div className="row justify-content-center"><h1 className='text-success'>{text}</h1></div>            
          //   </div>   
          //  );

      return (
        this.state.loading ? <Loader/> : <Direction text={text} redirect={redirect}/>
      )
      }           
}
export default ActivationLink;