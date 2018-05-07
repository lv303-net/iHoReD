import React from 'react';
import { Component } from 'react';
// import AdminRulesPage from './AdminRulesPage';
// import AdminNavbar from './AdminNavbar';
// import AdminSwitch from './AdminSwitch';
import UserNavbar from './UserNavbar'
import UserSwitch from './UserSwitch'
import '../../style/UserPage.css';

class UserMainPage extends Component {
  render() {
    return (
      <div>
        <UserNavbar/>
        <UserSwitch/>
       </div>
    );
  }
}

export default UserMainPage;
