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
import PatientDiagnosesTable from './components/PatientDiagnosesTable';
import LogbarAuth from './components/LogbarAuth';
import LogbarUnauth from './components/LogbarUnauth';
import LogbarWrapper from './components/LogbarWrapper';
import Footerbar from './components/Footerbar';
import DoctorCalendar from './components/DoctorCalendar';
import PatientInfo from './components/PatientInfo';
import MedicalCard from './components/MedicalCard';
import AdminPage from './components/AdminPage';
import Reporting from './components/Reporting'


var url = window.location.href;

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
                  <Route exact path="/admin" component={AdminRulesPage}>
                    <Route path="/patient" component={Edit}/>
                  </Route>
                  <Route path="/activation/:id" component={ActivationLink}/>
                  <Route path="/doctorCalendar" component={DoctorCalendar}/>
                  <Route path="/patientDiagnoses" component={PatientDiagnosesTable}/>
                  <Route path="/medicalCard" component={MedicalCard}/>
                  <Route path="/adminPage" component={AdminPage}/>
                  <Route path="/Reporting" component={Reporting}/>
                  DatePicker
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