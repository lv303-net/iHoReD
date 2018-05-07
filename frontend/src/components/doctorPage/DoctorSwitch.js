import React from 'react';
import { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import App from './../../App'
import DoctorCalendar from './../DoctorCalendar'
import NotFound from './../NotFound'
import '../../style/DoctorPage.css'

class DoctorSwitch extends Component {
  render() {
    return (
        <main id='mainDivHeight'>
          <Switch>
            <Route exact path='/doctor' render={() => <Redirect to="/doctor/schedule" />}/>
            <Route exact path="/doctor/schedule" component={App}/>
            <Route exact path="/doctor/mySchedule" component={DoctorCalendar}/>
            <Route exact path="/doctor/salary" />
          </Switch>
        </main>
    );
  }
}

export default DoctorSwitch;