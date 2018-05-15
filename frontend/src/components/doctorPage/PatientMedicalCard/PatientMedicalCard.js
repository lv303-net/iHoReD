import React from 'react';
import { Component } from 'react';
//import PatientDiagnosesTable from '.../PatientDiagnosesTable'
//import PatientInfo from '../PatientInfo';
import PatientInfo from '../../PatientInfo';
import AllergiesCard from './AllergiesCard';
import AddMedRecord from './../../AddMedRecord'
class PatientMedicalCard extends Component {
  render() {
    return(
      <div id="mainDiv">
        <div className="container">
            <PatientInfo PatientId={this.props.match.params.id}/>    
            <AllergiesCard/>
            <AddMedRecord/>
        </div>
      </div>
    );
  }
}

export default PatientMedicalCard;