import React from 'react';
import { Component } from 'react';
import DoctorNavbar from './DoctorNavbar'
import DoctorSwitch from './DoctorSwitch'
import '../../style/DoctorPage.css';

class DoctorMainPage extends Component {
  render() {
    return (
      <div>
        <DoctorNavbar/>
        <DoctorSwitch/>
       </div>
    );
  }
}

export default DoctorMainPage;
