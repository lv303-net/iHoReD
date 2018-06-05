import React from 'react';
import { Component } from 'react';
import PatientDiagnosesTable from '../components/PatientDiagnosesTable';
import PatientInfo from '../components/PatientInfo';

class MedicalCard extends Component {
  render() {
    return(
      <div id="mainDiv">
        <div className="container">
        <div className="row">
        <div className="col">
        <PatientInfo PatientId={this.props.match.params.id}/>  
         </div>       
          </div> 
          <div className="row mt-5">
          <div className="col-xl-12">
            <PatientDiagnosesTable PatientId={this.props.match.params.id}/>            
          </div> 
          </div> 
        </div>
      </div>
    );
  }
}

export default MedicalCard;
