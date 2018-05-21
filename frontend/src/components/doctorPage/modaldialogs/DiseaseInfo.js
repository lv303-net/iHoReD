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
import Categories from './../PatientMedicalCard/PatientDiseses/Categories';
import SubCategories from './../PatientMedicalCard/PatientDiseses/SubCategories';
import Diseases from './../PatientMedicalCard/PatientDiseses/Diseases';
import SubDiseases from './../PatientMedicalCard/PatientDiseses/SubDiseases';

class DiseaseInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            diseaseInfo: []
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.DiseaseId !== nextProps.DiseaseId || this.state!==nextState)
    }

    componentWillUpdate(nextProps, nextState) {
        if(this.props.DiseaseId !== nextProps.DiseaseId){
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/api/PatientData/GetDiagnoseInfo/' + nextProps.PatientId + '/' + nextProps.DiseaseId,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
                .then(res => {
                    this.setState({
                        diseaseInfo: res.data
                    });
                });
            }
    }

    render() {
        return (
            <div className="modal fade" id="AddDisease">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="mModalLabel">{this.props.DiseaseName}</h4>
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                        </div>
                        <div className="modal-body" id="patientModal">
                                <b>Doctor : </b>{this.state.diseaseInfo.FirstName + " " + this.state.diseaseInfo.LastName}<br/>
                                <br/><b>Start time of disease : </b>{this.state.diseaseInfo.StartDateTime}<br/>
                                <br/><b>Description : </b>{this.state.diseaseInfo.Description}<br/>
                                <br/><b>Treatment : </b>{this.state.diseaseInfo.Treatment}
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal" >Close
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

DiseaseInfo.propTypes = {
    callback: PropTypes.func
  };

export default DiseaseInfo;