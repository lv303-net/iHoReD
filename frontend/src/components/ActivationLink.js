import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Route, Switch, BrowserRouter, Router } from 'react-router-dom';
import Loader from 'react-loader';
import StartPatientPage from './StartPatientPage';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
var server_url;
if (process.env.NODE_ENV === "development")
  server_url = "http://localhost:58511"
else if (process.env.NODE_ENV === "production")
  server_url = "https://hored.azurewebsites.net"

class Direction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }
  // componentDidMount() {
  //   console.log(this.props.status);
  //   var url = window.location.origin;
  //   setTimeout(() => {
  //     if (this.props.status == 1 || this.props.status == 0) window.location.href = url + "/startPage";
  //   }, 4000);
  // }
  render() {
    return (
      this.props.redirect ? (
        <div className="container m-5">
          <h1 id="shaddow" className='font-italic text-center text-success'>{this.props.text}</h1>>
          </div>
      )
        :
        <div className="container-fluid mt-5">
          <h1 id="shaddow" className='font-italic text-center text-danger'>{this.props.text}</h1>
        </div>
    );
  }
}

class ActivationLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      text: "",
      isRegistrated: " ",
      redirect: "",
      hasError: false 
    };
    this.eventHandler = this.eventHandler.bind(this);
    this.errorHandler=this.errorHandler.bind(this);  
  }
   eventHandler(isReg) {
    switch (isReg) {
      case 0:
        this.setState({
          text: "You are already registered!",
          redirect: true
        });
        break;
      case -1:
        this.setState({
          text: "Please go to the main page and sign up",
          redirect: false
        })
        break;
      case 1:
        this.setState({
          text: "Congratulations, you have successfully registered in HoReD!",
          redirect: true
        });
        break;
    }
  }
  componentDidCatch(error, info) {
  
    this.setState({ hasError: true });
    console.log(this.state.hasError);
    console.log("Heloooo");
     }
  errorHandler() {
    if (this.props.hasError) {
      this.setState({
        text: "Something went wrong!!!"
      })
    }
  }
  userId = this.props.match.params.id;
  componentDidMount() {
    setTimeout(() => {
      axios.get(server_url + '/Registration/' + this.userId)
        .then(rez => {
          this.setState({ isRegistrated: rez.data });
          this.eventHandler(this.state.isRegistrated);
        })
        .catch(err => console.log(err.response.status));
      this.setState({ loading: false });
      this.errorHandler();
    }, 2000);
  }
  render() {
    const { loading } = this.state;
    const { text } = this.state;
    const { isRegistrated } = this.state;
    const { redirect } = this.state;
    const { hasError } = this.state;
    console.log(this.state.hasError);
    return (
      this.state.loading ? <Loader /> : <Direction text={text} redirect={redirect} status={isRegistrated}/>
    )
  }
}

export default ActivationLink;