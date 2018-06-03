import React from 'react';
import { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import App from './../../App'
import Edit from '../Edit'
import MedicalCard from '../MedicalCard';
import NotFound from './../NotFound'
import '../../style/UserPage.css'
import PrivateRoute from './../../PrivateRoute';

class UserSwitch extends Component {
  render() {    
    return (
        <main id='mainDivHeight'>
          <Switch>
            <Route exact path='/patient' render={() => <Redirect to="/patient/schedule" />}/>
            <PrivateRoute exact path="/patient/schedule" component={App} accessLevel="patient"/>
            <PrivateRoute exact path="/patient/edit" component={Edit} accessLevel="patient"/>
            <PrivateRoute exact path="/patient/medicalCard/:id" component={MedicalCard} accessLevel="patient"/>
            <Route component={NotFound} />
          </Switch>
        </main>
    );
  }
}

export default UserSwitch;