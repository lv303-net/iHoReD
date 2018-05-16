import React from 'react';
import { Component } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSwitch from './AdminSwitch';
import '../../style/AdminPage.css';

class AdminPage extends Component {
  render() {
    return (
      <div>
        <AdminNavbar/>
        <AdminSwitch/>
       </div>
    );
  }
}

export default AdminPage;
