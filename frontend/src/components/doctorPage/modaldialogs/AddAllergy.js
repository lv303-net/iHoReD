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
import SelectAllergy from './../PatientMedicalCard/SelectAllergy';

class AddAllergy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idAllergy: 0,
            shouldUpdate: 1
        }
        this.handleAddAllergy = this.handleAddAllergy.bind(this);
    }

    getAllergyId(param) {
        this.setState({
            idAllergy: param,
            shouldUpdate: this.state.shouldUpdate + 1
        })
    }

    handleAddAllergy() {
        var newAllergy = {
            IdPatient: this.props.PatientId,
            StartTime: this.props.Visit,
            Allergy: this.state.idAllergy
        }
        axios({
            method: 'post',
            url: localStorage.getItem("server_url") + '/api/PatientData/AddAllergy',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            },
            data: JSON.stringify(newAllergy)
        })
            .then(response => {
                this.props.callback(response.data);
            })
    }

    handleCancel(){
        this.props.callback(1);
    }

    render() {
        return (
            <div className="modal fade" id="AddAllergyModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Choose allergy to add</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => { this.handleCancel() }}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <SelectAllergy callback={this.getAllergyId.bind(this)} Visit={this.props.Visit} PatientId={this.props.PatientId} reload={this.props.reload} />
                            <div className="row mb-3 mt-5 justify-content-center">
                                <div className="col-xs-3 col-sm-3 col-md-3 text-center">
                                    <button type="submit" className="btn btn-info btn-lg mb-3" data-dismiss="modal" onClick={() => { this.handleAddAllergy() }}>Submit
                                    </button>
                                </div>
                                <div className="col-xs-3 col-sm-3 col-md-3 text-center" >
                                    <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal" onClick={() => { this.handleCancel() }}>Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddAllergy.propTypes = {
    callback: PropTypes.func
};

export default AddAllergy;