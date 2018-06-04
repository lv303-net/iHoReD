import React from 'react';
import { Component } from 'react';
import PatientInfo from '../../PatientInfo';
import AllergiesCard from './AllergiesCard';
import AddMedRecord from './../../AddMedRecord';
import Diagnoses from './PatientDiseses/Diagnoses';
import ClosedDiseasesInfo from './../modaldialogs/ClosedDiseasesInfo';
import ClosedAllergiesInfo from './../modaldialogs/ClosedAllergiesInfo';
import './../../../style/Disease.css';
class PatientMedicalCard extends Component {
  constructor(){
    super();
    this.state = {
      shouldUpdate: 1,
      updateDiseases:1,
      updateAllergies:1
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

  updateAllergies(param){
    this.setState({
      updateAllergies: this.state.updateAllergies + param
    })
  }

  updateAllergiesOrDiseasesState(param){
    this.setState({
      updateDiseases: this.state.updateDiseases + param,
      updateAllergies: this.state.updateAllergies + param
    })

  }

  render() {
    return(
      <div id="mainDiv">
        <div className="container">
            <PatientInfo PatientId={this.props.match.params.id} shouldUpdate={this.state.shouldUpdate} callback={this.updateAllergiesOrDiseasesState.bind(this)} />
            <div className="row mt-5 mx-0">
                <div className="col-md-6">
                  <button type="button" className="btn btn-info btn-lg mb-3 col-12" id="ClosedDiseases" data-toggle="modal" data-target="#ClosedDiseasesInfo">Closed diseases history
                  </button>
                  <ClosedDiseasesInfo PatientId={this.props.match.params.id} reload={this.state.updateDiseases}/>
                </div>
                <div className="col-md-6">
                  <button type="button" className="btn btn-info btn-lg mb-3 col-12" id="ClosedDiseases" data-toggle="modal" data-target="#ClosedAllergiesInfo">Closed allergies history
                  </button>
                  <ClosedAllergiesInfo PatientId={this.props.match.params.id} reload={this.state.updateAllergies}/>
                </div>
            </div>
            <div className="row mx-0 mb-5">
              <div className="col-sm-12 col-md-6">
                <Diagnoses PatientId={this.props.match.params.id} Visit={this.props.match.params.startDate} callback={this.reloadComponent.bind(this)} reload={this.state.updateDiseases}/>
              </div>
              <div className="col-sm-12 col-md-6">
                <AllergiesCard PatientId={this.props.match.params.id} Visit={this.props.match.params.startDate} callback={this.reloadComponent.bind(this)} reload={this.state.updateAllergies}/>
              </div>
            </div>
            <AddMedRecord PatientId={this.props.match.params.id} Visit={this.props.match.params.startDate}/>
        </div>
      </div>
    );
  }
}

export default PatientMedicalCard;