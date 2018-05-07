import React from 'react';
import { Component } from 'react';
import axios from 'axios';
var server_url;
if (process.env.NODE_ENV === "development")
    server_url = "http://localhost:58511"
else if (process.env.NODE_ENV === "production")
    server_url = "https://hored.azurewebsites.net"

class AboutPatient extends React.Component {
    render() {
        return (
            <div>
                <div className="row" id="patientcard">
                    <div className="col-12" id="col-head">Patient
                    <i className="fa fa-heart"></i>
                        <i className="fa fa-heart"></i>
                        <i className="fa fa-heart"></i>
                    </div>
                </div>
                <div className="row" id="patientcard">
                    <div className="col-5" id="col-custom">First Name</div>
                    <div className="col-7">{this.props.lastname}</div>
                </div>
                <div className="row" id="patientcard">
                    <div className="col-5" id="col-custom">Last Name</div>
                    <div className="col-7">{this.props.lastname}</div>
                </div>
                <div className="row" id="patientcard">
                    <div className="col-5" id="col-custom">Date Of Birds</div>
                    <div className="col-7">{this.props.birthday}</div>
                </div>
                <div className="row" id="patientcard">
                    <div className="col-5" id="col-custom">Phone Number</div>
                    <div className="col-7">{this.props.phone}</div>
                </div>
                <div className="row" id="patientcard">
                    <div className="col-5" id="col-custom">BllodType</div>
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
            id: 1
        };
        axios.get(server_url + '/api/PatientData/' + 1)
            .then(res => {
                this.setState({
                    userdata: res.data,
                });
            });
        axios.get(server_url + '/api/PatientData/Allergies/' + 1)
            .then(res => {
                this.setState({
                    allergies: res.data,
                });
            });
    }
    render() {
        return (
            <div className="container mt-5 col-lg-4 col-md-6 col-10" id="patientInfoMain">
                {this.state.userdata.map(item => <AboutPatient name={item.FirstName}
                    lastname={item.LastName} birthday={item.Birthday}
                    phone={item.Phone} bloodtype={item.BloodType} />)}
                <div className="row" id="patientcard">
                    <div className="col-5" id="col-custom">Allergies:</div>
                    <div className="col-7">
                        <div className="list-group">
                            {this.state.allergies.map(item =>
                                <div id="#allergilistitem" className="list-group-item" id="allergilist">{item}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default PatientInfo;