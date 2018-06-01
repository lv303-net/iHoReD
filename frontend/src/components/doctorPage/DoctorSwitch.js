import React from 'react';
import { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import App from './../../App'
import DoctorCalendar from './../doctorPage/DoctorCalendar'
import NotFound from './../NotFound'
import PatientMedicalCard from './PatientMedicalCard/PatientMedicalCard'
import Diagnoses from './PatientMedicalCard/PatientDiseses/Diagnoses'
import SalaryReport from './../SalaryReport'
import '../../style/DoctorPage.css'
import PrivateRoute from './../../PrivateRoute';

class DoctorSwitch extends Component {
  render() {
    return (
        <main id='mainDivHeight'>
          <Switch>
            <Route exact path='/doctor' render={() => <Redirect to="/doctor/schedule" />}/>
            <PrivateRoute exact path="/doctor/schedule" component={App} accessLevel="doctor"/>
            <PrivateRoute exact path="/doctor/mySchedule" component={DoctorCalendar} accessLevel="doctor"/>
            <PrivateRoute path="/doctor/patientMedicalCard/:id/:startDate" component={PatientMedicalCard} accessLevel="doctor"/>
            <PrivateRoute exact path="/doctor/salary/:id" component={SalaryReport} accessLevel="doctor"/>
            <PrivateRoute exact path="/doctor/patientDiseases" component={Diagnoses} accessLevel="doctor"/>
            <Route component={NotFound} />
          </Switch>
        </main>
    );
  }
}

export default DoctorSwitch;