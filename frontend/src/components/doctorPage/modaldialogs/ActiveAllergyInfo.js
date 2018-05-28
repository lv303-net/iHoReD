import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import validator from 'validator';
import PropTypes from 'prop-types';

class ActiveAllergyInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            alergyInfo: []
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.AllergyId !== nextProps.AllergyId || this.state!==nextState)
    }

    componentWillUpdate(nextProps, nextState) {
        if(this.props.AllergyId !== nextProps.AllergyId){
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/api/PatientData/GetActiveAllergyInfo/' + nextProps.PatientId + '/' + nextProps.AllergyId,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
                .then(res => {
                    this.setState({
                        alergyInfo: res.data
                    });
                });
            }
    }

    render() {
        return (
            <div className="modal fade" id="AllergyInfo">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="mModalLabel">{this.props.AllergyName}</h4>
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                        </div>
                        <div className="modal-body" id="patientModal">
                                <b>Doctor : </b>{this.state.alergyInfo.DoctorFirstName + " " + this.state.alergyInfo.DoctorLastName}<br/>
                                <br/><b>Start time of allergy : </b>{this.state.alergyInfo.StartDateTime}<br/>
                                <br/><b>Description : </b>{this.state.alergyInfo.Description}<br/>
                                <br/><b>Treatment : </b>{this.state.alergyInfo.Treatment}
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

ActiveAllergyInfo.propTypes = {
    callback: PropTypes.func
  };

export default ActiveAllergyInfo;