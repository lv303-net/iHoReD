import React from 'react';
import { Component } from 'react';
//import PatientDiagnosesTable from '.../PatientDiagnosesTable'
//import PatientInfo from '../PatientInfo';
import PatientInfo from '../../PatientInfo';
import AllergiesCard from './AllergiesCard';
import AddMedRecord from './../../AddMedRecord';
import Diagnoses from './PatientDiseses/Diagnoses';
import ClosedDiseasesInfo from './../modaldialogs/ClosedDiseasesInfo';
import './../../../style/Disease.css';
class PatientMedicalCard extends Component {
  constructor(){
    super();
    this.state = {
      shouldUpdate: 1,
      updateDiseases:1 
    }
  }
  reloadComponent(param){
    this.setState({
      shouldUpdate: this.state.shouldUpdate + param
    })
  }

  updateDiseases(param){
    this.setState({
      updateDiseases: this.state.updateDiseases + param
    })
  }

  render() {
    console.log(this.props.match.params.startDate)
    return(
      <div id="mainDiv">
        <div className="container">
            <PatientInfo PatientId={this.props.match.params.id} shouldUpdate={this.state.shouldUpdate} callback={this.updateDiseases.bind(this)}/>
              <div className="row">
              <div className="col-md-7"/>
              <div className="row col-md-5">
              {/* <div className="col-12"/> */}
              {/* <div className="col-md-5 "> */}
                <button type="button" className="btn btn-info btn-lg mb-3 col-12" id="ClosedDiseases" data-toggle="modal" data-target="#ClosedDiseasesInfo">All diseases history
                </button>
                <ClosedDiseasesInfo PatientId={this.props.match.params.id} reload={this.state.updateDiseases}/>
              {/* </div> */}
              </div>
              </div>
            <div className="row">
              <div className="col-6">
                <Diagnoses PatientId={this.props.match.params.id} Visit={this.props.match.params.startDate} callback={this.reloadComponent.bind(this)} reload={this.state.updateDiseases}/>
              </div>
              <div className="col-6">
                <AllergiesCard PatientId={this.props.match.params.id} Visit={this.props.match.params.startDate} callback={this.reloadComponent.bind(this)}/>
              </div>
            </div>
            <AddMedRecord PatientId={this.props.match.params.id} Visit={this.props.match.params.startDate}/>
        </div>
        {/* mt-3 mr-1 col-sm-12 col-md-3 */}
      </div>
    );
  }
}

export default PatientMedicalCard;