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
import DoctorCalendar from './components/doctorPage/DoctorCalendar';
import MedicalCard from './components/MedicalCard';
import SalaryReport from './components/SalaryReport';
import AdminPage from './components/adminPage/AdminMainPage';
import UserPage from './components/userPage/UserMainPage';
import DoctorPage from './components/doctorPage/DoctorMainPage';
import NotFound from './components/NotFound';
import AddMedRecord from './components/AddMedRecord';
import PrivateRoute from './PrivateRoute.js';
import ResetPassword from './components/ResetPassword';
import AdminSwitch from './components/adminPage/AdminSwitch';
import DoctorSwitch from './components/doctorPage/DoctorSwitch';
import UserSwitch from './components/userPage/UserSwitch';


var server_url;
if(process.env.NODE_ENV==="development")
  localStorage.setItem("server_url", "http://localhost:58511")
else if(process.env.NODE_ENV==="production")
  localStorage.setItem("server_url","https://hored.azurewebsites.net")

class Home extends Component {
    render() {
      return (
        <div>
            <LogbarWrapper/>
              <Switch>

                <PrivateRoute path="/editUserInfo" component={Edit} accessLevel="admin,user,doctor"/>
                <PrivateRoute path="/allDiagnoses" component={Diagnoses} accessLevel="doctor"/>
                <PrivateRoute path="/activation/:id" component={ActivationLink}/>
                <PrivateRoute path="/resetPassword/:link" component={ResetPassword}/>
                <PrivateRoute path="/doctorCalendar" component={DoctorCalendar} accessLevel="doctor"/>
                <PrivateRoute path="/patientDiagnoses" component={PatientDiagnosesTable} accessLevel="doctor"/>
                <PrivateRoute path="/medicalCard/:id" component={MedicalCard} accessLevel="doctor,user"/>
                <PrivateRoute path="/admin" component={AdminPage} accessLevel="admin"/>
                <PrivateRoute path="/user" component={UserPage} accessLevel="admin,user,doctor"/>
                <PrivateRoute path="/doctor" component={DoctorPage} accessLevel="doctor"/>
                <PrivateRoute exact path="/reporting/:id" component={SalaryReport} accessLevel="doctor"/>
                <PrivateRoute exact path="/AddMedRecord" component={AddMedRecord} accessLevel="doctor"/>
                <Route exact path="/" component={App}/>
                <PrivateRoute component={NotFound}/>
                <AdminSwitch/>
                <DoctorSwitch/>
                <UserSwitch/>
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
