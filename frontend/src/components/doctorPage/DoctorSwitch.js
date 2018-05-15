import React from 'react';
import { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import App from './../../App'
import DoctorCalendar from './../doctorPage/DoctorCalendar'
import NotFound from './../NotFound'
import '../../style/DoctorPage.css'
import PatientMedicalCard from './PatientMedicalCard/PatientMedicalCard'
import Diagnoses from './PatientMedicalCard/PatientDiseses/Diagnoses'

class DoctorSwitch extends Component {
  render() {
    return (
        <main id='mainDivHeight'>
          <Switch>
            <Route exact path='/doctor' render={() => <Redirect to="/doctor/schedule" />}/>
            <Route exact path="/doctor/schedule" component={App}/>
            <Route exact path="/doctor/mySchedule" component={DoctorCalendar}/>
            <Route exact path="/doctor/patientMedicalCard/:id" component={PatientMedicalCard}/>
            <Route exact path="/doctor/salary" />
            <Route exact path="/doctor/patientDiseases" component={Diagnoses}/>
            <Route component={NotFound} />
          </Switch>
        </main>
    );
  }
}

export default DoctorSwitch;