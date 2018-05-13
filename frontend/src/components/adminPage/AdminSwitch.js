import React from 'react';
import { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import AdminRulesPage from '../adminPage/AdminRulesPage';
import ProfessionsRatesPage from './ProfessionsRatesPage';
import Edit from '../Edit'
import Salary from './salaryManagment/Salary';
import NotFound from '../NotFound'
import '../../style/AdminPage.css'


class AdminSwitch extends Component {
  render() {
    return (
        <main id='mainDivHeight'>
          <Switch>
            {/* <Route exact path='/admin' render={() => <Redirect to="/admin/rules" />}/>
            <Route exact path="/admin/rules" component={AdminRulesPage}/>
            <Route exact path="/admin/salary" component={Edit}/> */}
            <Route exact path='/admin' render={() => <Redirect to="/admin/rules" />}/>
            <Route exact path="/admin/rules" component={AdminRulesPage}/>
            <Route exact path="/admin/salary" component={ProfessionsRatesPage}/>
            <Route exact path="/admin/select" component={Salary}/>
            <Route component={NotFound} />
          </Switch>
        </main>
    );
  }
}

export default AdminSwitch;