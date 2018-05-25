import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import validator from 'validator';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import ActiveAllergies from './../PatientMedicalCard/ActiveAllergies';

class CloseAllergy extends Component{
    constructor(props){
        super(props);
        this.state = {
            idActiveAllergy: 0,
            shouldUpdate: 1, 
            updateChild: 1
        }
        this.handleCloseAllergy=this.handleCloseAllergy.bind(this);
    }

    getActiveAllergyId(param) {
        this.setState({
            idActiveAllergy: param,
            shouldUpdate: this.state.shouldUpdate + 1
        })
    }

    handleCloseAllergy() {
        var Allergy = {
            IdPatient: this.props.PatientId,
            StartTime: this.props.Visit,
            Allergy: this.state.idActiveAllergy
        }   
        axios.post(localStorage.getItem("server_url") + '/api/PatientData/CloseAllergy', Allergy)
        .then(response=>{
        console.log(response.data);
        this.props.callback(response.data);
        })
    }
    
    render(){
        return(
            <div className="modal fade" id="CloseAllergy" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">         
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Close allergy</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ActiveAllergies callback={this.getActiveAllergyId.bind(this)} Visit={this.props.Visit} PatientId={this.props.PatientId} reload={this.props.reload}/>
                            <div className="row mb-3 mt-5 justify-content-center">
                                <div className="col-sm-3 col-6 text-center">
                                    <button type="button" className="btn btn-info btn-lg mb-3" data-dismiss="modal" onClick={() =>{this.handleCloseAllergy()}}>Close
                                    </button>
                                </div>
                                <div className="col-sm-3 col-6 text-center" >
                                    <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CloseAllergy.propTypes = {
    callback: PropTypes.func
  };

export default CloseAllergy;