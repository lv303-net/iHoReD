import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
//import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, BrowserRouter, Router} from 'react-router-dom';
import './index.css';
import App from './App';
import Diagnoses from './components/Diagnoses';
import Edit from './components/Edit';
import StartPatientPage from './components/StartPatientPage';
import registerServiceWorker from './registerServiceWorker';
import AdminRulesPage from './components/AdminRulesPage';
import ActivationLink from './components/ActivationLink';

class Home extends Component {
    render() {
      return (
     <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/editUserInfo" component={Edit}/>
        <Route path="/allDiagnoses" component={Diagnoses}/>
        <Route path="/startPage" component={StartPatientPage}/>
        <Route path="/admin" component={AdminRulesPage}/>
        <Route path="/activate/:id" component={ActivationLink}/>
      </Switch>
           );
    }
  }

  
  ReactDOM.render((
    <BrowserRouter>
    <Home />
    </BrowserRouter>   )
    , document.getElementById('root'));
  registerServiceWorker();