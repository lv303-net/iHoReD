import React from 'react';
import { Component } from 'react';
import '../style/PatientInfo.css';
import axios from 'axios';
import photo from '../style/img_avatar1.png';
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
                    <div className="col-5" id="col-custom">Date Of Birds</div>
                    <div className="col-7">{this.props.birthday.slice(0,10)}</div>
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
            diseases: [],
            id: 1
        };
        axios.get(localStorage.getItem("server_url") + '/api/PatientData/' + this.props.PatientId)
            .then(res => {
                this.setState({
                    userdata: res.data,
                });
            });
        axios.get(localStorage.getItem("server_url") + '/api/PatientData/Allergies/' + this.props.PatientId)
            .then(res => {
                this.setState({
                    allergies: res.data,
                });
            });
        // axios.get(localStorage.getItem("server_url") + '/api/PatientData/SubDiseases/' + this.props.PatientId)
        //     .then(res => {
        //         this.setState({
        //             diseases: res.data,
        //         });
        // });
    }
    render() {
        console.log(this.props.PatientId);
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-xs-12 col-2">
                        <img className="card-img-top" src={photo} alt="Card image"></img>
                    </div>
                    <div className="col-xs-12 col-5">
                        {this.state.userdata.map(item => <AboutPatient firstname={item.FirstName}
                            lastname={item.LastName} birthday={item.Birthday}
                            phone={item.Phone} bloodtype={item.BloodType} />)}
                    </div>
                    <div className="col-xs-12 col-5">
                        <div className="row" id="patientcard">
                            <div className="col-5" id="col-custom">Allergies:</div>
                            <div className="col-7">
                                <div className="list-group">
                                    {this.state.allergies.map(item =>
                                        <div id="#allergilistitem" className="list-group-item" id="allergilist">{item}</div>)}
                                </div>
                            </div>
                        </div>
                        <div className="row" id="patientcard">
                            <div className="col-5" id="col-custom">Diseases:</div>
                            <div className="col-7">
                                <div className="list-group">
                                    {this.state.diseases.map(item =>
                                        <div id="#allergilistitem" className="list-group-item" id="allergilist">{item}</div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>             
            </div>    
        );
    }
}


export default PatientInfo;