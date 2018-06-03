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
            <Route exact path='/user' render={() => <Redirect to="/user/schedule" />}/>
            <PrivateRoute exact path="/user/schedule" component={App} accessLevel="user"/>
            <PrivateRoute exact path="/user/edit" component={Edit} accessLevel="user"/>
            <PrivateRoute exact path="/user/medicalCard/:id" component={MedicalCard} accessLevel="user"/>
            <Route component={NotFound} />
          </Switch>
        </main>
    );
  }
}

export default UserSwitch;