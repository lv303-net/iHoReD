import React from 'react';
import { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import AdminRulesPage from '../adminPage/AdminRulesPage';
import Edit from '../Edit'
import '../../style/AdminPage.css'

class AdminSwitch extends Component {
  render() {
    return (
        <main>
          <Switch>
            <Route exact path='/adminPage' component={AdminRulesPage}/>
            <Route path="/adminPage/rules" component={AdminRulesPage}/>
            <Route path="/adminPage/salary" component={Edit}/>
          </Switch>
        </main>
    );
  }
}

export default AdminSwitch;