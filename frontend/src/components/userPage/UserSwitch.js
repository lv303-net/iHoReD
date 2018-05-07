import React from 'react';
import { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import App from './../../App'
import Edit from '../Edit'
import MedicalCard from '../MedicalCard';
import NotFound from './../NotFound'
import '../../style/UserPage.css'

class UserSwitch extends Component {
  render() {
    return (
        <main id='mainDivHeight'>
          <Switch>
            <Route exact path='/user' render={() => <Redirect to="/user/schedule" />}/>
            <Route exact path="/user/schedule" component={App}/>
            <Route exact path="/user/edit" component={Edit}/>
            <Route exact path="/user/medicalCard" component={MedicalCard}/>
            <Route exact path="/doctor/salary" />
          </Switch>
        </main>
    );
  }
}

export default UserSwitch;