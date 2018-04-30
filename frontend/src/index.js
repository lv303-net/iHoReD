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
<<<<<<< HEAD
// import Menu from 'react-burger-menu';
import BM from './components/BurgerMenu';
=======
>>>>>>> fd1a3aac1ae37a860eb64c3267ac7c3eb9fe919c
import LogbarAuth from './components/LogbarAuth';
import LogbarUnauth from './components/LogbarUnauth';
import LogbarWrapper from './components/LogbarWrapper';
import Footerbar from './components/Footerbar';
import DoctorCalendar from './components/DoctorCalendar';

<<<<<<< HEAD
var url = window.location.href;
=======
>>>>>>> fd1a3aac1ae37a860eb64c3267ac7c3eb9fe919c
class Home extends Component {
    render() {
      return (
        <div>
            <LogbarWrapper/>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/editUserInfo" component={Edit}/>
                <Route path="/allDiagnoses" component={Diagnoses}/>
                <Route path="/startPage" component={StartPatientPage}/>
                <Route path="/admin" component={AdminRulesPage}/>
                <Route path="/activation/:id" component={ActivationLink}/>
                <Route path="/doctorCalendar" component={DoctorCalendar}/>
              </Switch>
              <Footerbar/>
      </div>
      );
    }
  }
  
  ReactDOM.render((
    <BrowserRouter>
    <Home />
    </BrowserRouter>   
    ), 
  document.getElementById('root'));
  registerServiceWorker();