import React from 'react';
import { Component } from 'react';
import AdminRulesPage from './AdminRulesPage';
import AdminNavbar from './AdminNavbar';
import AdminSwitch from './AdminSwitch';
import '../../style/AdminPage.css';

class AdminPage extends Component {
  render() {
    return (
      <div id="mainDiv">
        <AdminNavbar/>
        <AdminSwitch/>
       </div>
    );
  }
}

export default AdminPage;
