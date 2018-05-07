import React from 'react';
import { Component } from 'react';
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
