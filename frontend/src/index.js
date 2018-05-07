import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
//import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import Diagnoses from './components/Diagnoses';
import Edit from './components/Edit';
import StartPatientPage from './components/StartPatientPage';
import registerServiceWorker from './registerServiceWorker';
import ActivationLink from './components/ActivationLink';
import PatientDiagnosesTable from './components/PatientDiagnosesTable';
import LogbarWrapper from './components/LogbarWrapper';
import Footerbar from './components/Footerbar';
import DoctorCalendar from './components/DoctorCalendar';
import MedicalCard from './components/MedicalCard';
import SalaryReport from './components/SalaryReport';
import AdminPage from './components/adminPage/AdminMainPage';
import UserPage from './components/userPage/UserMainPage'
import DoctorPage from './components/doctorPage/DoctorMainPage'
import NotFound from './components/NotFound'

class Home extends Component {
    render() {
      return (
        <div>
            <LogbarWrapper/>
              <Switch>
                <Route exact path="/" component={App}/>              
                <Route exact path="/editUserInfo" component={Edit}/>
                <Route exact path="/allDiagnoses" component={Diagnoses}/>
                <Route exact path="/startPage" component={StartPatientPage}/>
                <Route exact path="/patient" component={Edit}/>
                <Route exact path="/activation/:id" component={ActivationLink}/>
                <Route exact path="/doctorCalendar" component={DoctorCalendar}/>
                <Route exact path="/patientDiagnoses" component={PatientDiagnosesTable}/>
                <Route exact path="/medicalCard" component={MedicalCard}/>
                <Route path="/admin" component={AdminPage}/>
                <Route path="/user" component={UserPage}/>
                <Route path="/doctor" component={DoctorPage}/>
                <Route exact path="/reporting" component={SalaryReport}/>
                <Route component={NotFound} />
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