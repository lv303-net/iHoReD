import React from 'react';
import { Component } from 'react';
//import PatientDiagnosesTable from '.../PatientDiagnosesTable'
//import PatientInfo from '../PatientInfo';
import PatientInfo from '../../PatientInfo';
import AllergiesCard from './AllergiesCard';
import AddMedRecord from './../../AddMedRecord';
import Diagnoses from './PatientDiseses/Diagnoses'
class PatientMedicalCard extends Component {
  
  render() {
    console.log(this.props.match.params.startDate)
    return(
      <div id="mainDiv">
        <div className="container">
            <PatientInfo PatientId={this.props.match.params.id}/>
            <div className="row">
              <div className="col-sm-12 col-6">
                <Diagnoses PatientId={this.props.match.params.id} Visit={this.props.match.params.startDate}/>
              </div>
              <div className="col-sm-12 col-6">
                <AllergiesCard className="col-3"  PatientId={this.props.match.params.id} Visit={this.props.match.params.startDate}/>
              </div>
            </div>
            <AddMedRecord/>
        </div>
      </div>
    );
  }
}

export default PatientMedicalCard;