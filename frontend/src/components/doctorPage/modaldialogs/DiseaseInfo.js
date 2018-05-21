import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../../../style/InfoSchedule.css'

class DiseaseInfo extends Component {
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
            <div className="modal fade" id="BlockClickModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="mModalLabel">{this.props.DiseaseName}</h4>
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                        </div>
                        <div className="modal-body" id="patientModal">
                                Doctor : {this.state.diseaseInfo.FirstName + " " + this.state.diseaseInfo.LastName}<br/>
                                Start time of disease : {this.state.diseaseInfo.StartDateTime}<br/>
                                <br/>Description : {this.state.diseaseInfo.Description}<br/>
                                <br/>Treatment : {this.state.diseaseInfo.Treatment}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Cancel
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
