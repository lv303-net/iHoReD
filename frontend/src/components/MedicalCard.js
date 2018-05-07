import React from 'react';
import { Component } from 'react';
import PatientDiagnosesTable from '../components/PatientDiagnosesTable';
import PatientInfo from '../components/PatientInfo';

class MedicalCard extends Component {
  render() {
    return(
      <div id="mainDiv">
        <div class="container">
        <div className="row">
        <div class="col">
        <PatientInfo/>  
         </div>       
          </div> 
          <div className="row mt-5">
            <PatientDiagnosesTable PatientId='67'/>            
          </div> 
        </div>
      </div>
    );
  }
}

export default MedicalCard;
