import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../../../style/InfoSchedule.css'

class InfoSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idPatient: 0,
            patientInfo: [],
            startTime: "",
            statusCode: ""
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return ((this.props.idPatient !== nextProps.idPatient) || 
                (this.state.patientInfo !== nextState.patientInfo) ||
                (this.state.startTime !== nextProps.startTime))
    }

    componentWillUpdate(nextProps, nextState) {
        this.setState({
            idPatient: nextProps.idPatient,
            startTime: nextProps.startTime
        })
        if (this.state.patientInfo === nextState.patientInfo) {
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/api/PatientData/' + nextProps.idPatient,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
                .then(res => {
                    this.setState({
                        patientInfo: res.data
                    });
                });
        }
    }

    handleClicking() {
        var visit = {
            IdPatient: this.state.idPatient,
            StartTime: this.state.startTime
        }
        axios({
            method: 'post',
            url: localStorage.getItem("server_url") + '/MedicalCard/CheckIfExists',
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            },
            data: JSON.stringify(visit)
          })
            .then(res => {
                this.setState({
                    statusCode: res.data
                });
                if (this.state.statusCode === 0) {
                    window.location.href = window.location.origin + '/doctor/patientMedicalCard/' + this.state.idPatient + '/' + this.state.startTime._i;
                }
                else {
                    this.props.callback(this.state.statusCode);
                }
            });
    }

    render() {
        return (
            <div className="modal fade" id="BlockClickModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="mModalLabel">Basic info about visit</h4>
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                        </div>
                        <div className="modal-body" id="patientModal">
                            {this.state.patientInfo.map(item =>
                                <div className="row align-justify-center" key={item.LastName + "Row"}>
                                    <div className="col-9 col-centered" key={item.LastName}>
                                        <div className="row">
                                            <div className="col-6 mb-2" key={item.LastName + "Day"}><b>Day</b></div>
                                            <div className="col-6 mb-2" key={this.props.startTime}><p className="col-12">{this.props.startTime._i.slice(0, 10)}</p></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 mb-2" key={item.LastName + "Time"}><b>Time</b></div>
                                            <div className="col-6 mb-2" key={this.props.startTime}><p className="col-12">{this.props.startTime._i.slice(11, 20)}</p></div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-6 mb-2" key={item.LastName + "Name"}><b>Patient Name</b></div>
                                            <div className="col-6 mb-2" key={item.LastName}><p className="col-12">{item.FirstName} {item.LastName}</p></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 mb-2 " key={item.LastName + "Number"}><b>Phone Number</b></div>
                                            <div className="col-6 mb-2 " key={item.Phone}><p className="col-12">{item.Phone}</p></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 mb-2 " key={item.LastName + "Date"}><b>Date of Birth</b></div>
                                            <div className="col-6 mb-2 " key={item.Birthday.slice(0, 10)}><p className="col-12">{item.Birthday.slice(0, 10)}</p></div>
                                        </div>
                                    </div>
                                </div>)}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-info btn-lg" onClick={() => this.handleClicking()} data-dismiss="modal">Add description</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

InfoSchedule.propTypes = {
    callback: PropTypes.func
};

export default InfoSchedule;
