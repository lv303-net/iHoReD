import React from 'react';
import { Component } from 'react';
//import PatientDiagnosesTable from '.../PatientDiagnosesTable'
//import PatientInfo from '../PatientInfo';
import PatientInfo from '../../PatientInfo';
import AllergiesCard from './AllergiesCard';
import AddMedRecord from './../../AddMedRecord'
class PatientMedicalCard extends Component {
  
  render() {
    console.log(this.props.match.params.startDate)
    return(
      <div id="mainDiv">
        <div className="container">
          <div className="row">
            <PatientInfo PatientId={this.props.match.params.id}/>
          </div>
          <div className="row mt-5">
            <AllergiesCard/>
          </div>
          <AddMedRecord/>
        </div>
      </div>
    );
  }
}

export default PatientMedicalCard;