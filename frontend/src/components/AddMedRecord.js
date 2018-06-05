import React from 'react';
import { Component } from 'react';
import VisitDescription from '../components/VisitDescription';
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';

class AddMedRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treatment: "",
            description: ""
        };
        this.getText = this.getText.bind(this);
        this.SaveAll = this.SaveAll.bind(this);
        this.redirectToSchedule = this.redirectToSchedule.bind(this);
    }
    redirectToSchedule() {
        window.location.href = window.location.origin + '/doctor/mySchedule';
    }
    SaveAll() {
        var data = {
            IdPatient: this.props.PatientId,
            StartTime: this.props.Visit,
            Description: this.state.description,
            Treatment: this.state.treatment
        }
        axios({
            method: 'post',
            url: localStorage.getItem("server_url") + '/api/PatientData/AddMedicalRecord',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            },
            data: JSON.stringify(data)
            })
            .then(response => {
                notify.show("Successfully saved", "custom", 5000, { background: 'green', text: "#FFFFFF" });
            })
            .catch(function (response) {
                console.log(response);
            });
        this.redirectToSchedule();
    }

    getText(t, val) {
        if (val == 1) {
            this.setState({ description: t });
        }
        else {
            this.setState({ treatment: t });
        }
    }
    
    render() {
        return (
            <div>
                <div>
                    <Notifications/>
                    <VisitDescription getText={this.getText} newTreatment={this.state.treatment} newDescription={this.state.description} />
                </div>
                <div className="row">
                    <div className="container">
                        <div className="btn-group-lg">
                            <button type="button" className="btn btn-info btn-lg float-left" onClick={this.SaveAll}>Save</button>
                            <button type="button" className="btn btn-danger btn-lg float-right" onClick={this.redirectToSchedule}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddMedRecord;
