import React from 'react';
import { Component } from 'react';
import '../style/PatientInfo.css';
import axios from 'axios';
import photo from '../style/img_avatar1.png';
import PropTypes from 'prop-types';
import DiseaseInfo from './doctorPage/modaldialogs/DiseaseInfo';
import ClosedDiseasesInfo from './doctorPage/modaldialogs/ClosedDiseasesInfo';

class AboutPatient extends React.Component {
    render() {
        return (
            <div>
                <div className="row" id="patientcard">
                    <div className="col-5" id="col-custom">First Name</div>
                    <div className="col-7">{this.props.firstname}</div>
                </div>
                <div className="row" id="patientcard">
                    <div className="col-5" id="col-custom">Last Name</div>
                    <div className="col-7">{this.props.lastname}</div>
                </div>
                <div className="row" id="patientcard">
                    <div className="col-5" id="col-custom">Date Of Birth</div>
                    <div className="col-7">{this.props.birthday.slice(0, 10)}</div>
                </div>
                <div className="row" id="patientcard">
                    <div className="col-5" id="col-custom">Phone Number</div>
                    <div className="col-7">{this.props.phone}</div>
                </div>
                <div className="row" id="patientcard">
                    <div className="col-5" id="col-custom">Blood Type</div>
                    <div className="col-7">{this.props.bloodtype}</div>
                </div>
            </div>
        );
    }
}
class PatientInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: [],
            allergies: [],
            diseases: [],
            currentDiseaseId: 0,
            currentDiseaseName: "",
            id: 1,
            reload: 1
        };
        this.getPatientData(this.props.PatientId);
    }
    componentDidMount() {
        this.getPatientData(this.props.PatientId);
    }
    getPatientData(PatientId) {
        axios({
            method: 'get',
            url: localStorage.getItem("server_url") + '/api/PatientData/' + PatientId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
            .then(res => {
                this.setState({
                    userdata: res.data,
                });

            });
        axios({
            method: 'get',
            url: localStorage.getItem("server_url") + '/api/PatientData/ActiveAllergies/' + PatientId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
            .then(res => {
                this.setState({
                    allergies: res.data,
                });
            });
        axios({
            method: 'get',
            url: localStorage.getItem("server_url") + '/api/PatientData/ActiveDiseases/' + PatientId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
            .then(res => {
                this.setState({
                    diseases: res.data,
                });
            });

    }

    getDiseaseData(id, name) {
        this.setState({
            currentDiseaseId: id,
            currentDiseaseName: name
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.shouldUpdate !== nextProps.shouldUpdate || this.state !== nextState)
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.shouldUpdate !== nextProps.shouldUpdate) {
            this.getPatientData(this.props.PatientId);
            this.props.callback(1);
        }
    }
    render() {
        console.log(this.props.PatientId);
        let variable = "qwertyuiop12";
        console.log(variable);
        console.log(variable.slice(10));
        variable = "qwertyuiop12456";
        console.log(variable);
        console.log(variable.slice(10));
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-md-2 mb-3">
                        <img className="card-img-top" src={photo} alt="Card image"></img>
                    </div>
                    <div className="col-sm-12 col-md-5 mb-3">
                        {this.state.userdata.map(item => <AboutPatient firstname={item.FirstName}
                            lastname={item.LastName} birthday={item.Birthday}
                            phone={item.Phone} bloodtype={item.BloodType} />)}
                    </div>
                    <div className="col-sm-12 col-md-5">
                        <div className="row" id="patientcard">
                            <div className="col-5" id="col-custom">Allergies:</div>
                            <div className="col-7" id="diseaselist">
                                <div className="list-group">
                                    {this.state.allergies.map(item =>
                                        <div id="#allergilistitem" className="list-group-item">{item.Name}</div>)}
                                </div>
                            </div>
                        </div>
                        <div className="row" id="patientcard">
                            <div className="col-5" id="col-custom">Diseases:</div>
                            <div className="col-7" id="diseaselist">
                                <div className="list-group">
                                    {this.state.diseases.map(item =>
                                        <div id={"diseaselistitem" + item.Id} className="list-group-item diseaseelement" data-toggle="modal" data-target="#DiseaseInfo" onClick={() => this.getDiseaseData(item.Id, item.Name)}>{item.Name}</div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row justify-content-end"> */}
                    
                <DiseaseInfo PatientId={this.props.PatientId} DiseaseId={this.state.currentDiseaseId} DiseaseName={this.state.currentDiseaseName}/>
            </div>
        );
    }
}

PatientInfo.propTypes = {
    callback: PropTypes.func
};

export default PatientInfo;
