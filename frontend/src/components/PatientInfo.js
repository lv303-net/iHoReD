import React from 'react';
import { Component } from 'react';
import '../style/PatientInfo.css';
import axios from 'axios';
import '../style/img_avatar1.png';
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
    }
    render() {
        console.log(this.props.PatientId);
        return (
            <div className="container mt-5">
            <div className="container mt-5 col-lg-6 col-md-7 col-10" id="patientInfoMain">
                {this.state.userdata.map(item => <AboutPatient firstname={item.FirstName}
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
           
         <div className="card" mt-5 >
<img className="card-img-top" src="img_avatar1.png" alt="Card image"/>
<div class="card-body">
    <h4 className="card-title"> {localStorage.getItem("currentUserFirstName")}{localStorage.getItem("currentUserLastName")}</h4>
    </div>
    </div>
</div>    
        );
    }
}

export default PatientInfo;