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
import Menu from 'react-burger-menu';
import BM from './components/BurgerMenu';



class Home extends Component {
    render() {
      return (
     <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/editUserInfo" component={Edit}/>
        <Route path="/allDiagnoses" component={Diagnoses}/>
        <Route path="/startPage" component={StartPatientPage}/>
        <Route path="/admin" component={AdminRulesPage}/>
<<<<<<< HEAD
        <Route path="/activation/:id" component={ActivationLink} />
             </Switch>
           );
=======
        <Route path="/activation/:id" component={ActivationLink}/>
      </Switch>
      );
>>>>>>> 1e2d079b3ec9924a82911488060fd101333fa3d2
    }
  }
  
  ReactDOM.render((
    <BrowserRouter>
    <Home />
    </BrowserRouter>   
    ), 
  document.getElementById('root'));
  registerServiceWorker();