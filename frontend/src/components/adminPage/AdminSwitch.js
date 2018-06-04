import React from 'react';
import { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import AdminRulesPage from '../adminPage/AdminRulesPage';
import ProfessionsRatesPage from './ProfessionsRatesPage';
import Edit from '../Edit'
import Salary from './salaryManagment/Salary';
import Roles from './AdminChangingRoles'
import NotFound from '../NotFound'
import '../../style/AdminPage.css'
import PrivateRoute from './../../PrivateRoute';

class AdminSwitch extends Component {
  render() {
    return (
        <main id='mainDivHeight'>
          <Switch>
            <Route exact path='/admin' render={() => <Redirect to="/admin/rules" />}/>
            <PrivateRoute exact path="/admin/rules" component={AdminRulesPage} accessLevel="admin"/>
            <PrivateRoute exact path="/admin/salary" component={Salary} accessLevel="admin"/>
            <PrivateRoute exact path="/admin/roles" component={Roles} accessLevel="admin"/>
            <Route component={NotFound} />
          </Switch>
        </main>
    );
  }
}

export default AdminSwitch;
