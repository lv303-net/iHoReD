import React from 'react';
import { Component } from 'react';
import axios from 'axios';

class InfoSchedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            idPatient: 0,
            patientInfo: []
        }
    }

    shouldComponentUpdate(nextProps, nextState)
    {
      return(this.props.idPatient!==nextProps.idPatient)
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps.idPatient);
        console.log(this.state.idPatient);
        axios.get(localStorage.getItem("server_url") + '/api/PatientData/' + nextProps.idPatient)
        .then(res => {
            this.setState({
                patientInfo: res.data
            });
        });
    }

    handleClicking(){        
        window.location.href = window.location.origin+'/user/medicalCard/'+this.state.idPatient;
    }

    render(){
        return(
            <div className="modal fade" id="BlockClickModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h4 className="modal-title" id="mModalLabel">Basic info about visit</h4>
                        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button> 
                        </div>
                        <div className="modal-body" id="patientModal">
                        <p><b>Patient Name</b> {this.props.namePatient} </p>
                        {this.state.patientInfo.map(item => 
                        <div className="row">
                            <div className="col-4">Phone Number</div>
                            <div className="col-6">{item.Phone}</div>
                            <div className="col-4">Date of Birth</div>
                            <div className="col-6">{item.Birthday}</div>
                        </div>)}
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-info btn-lg" onClick={()=>this.handleClicking()} data-dismiss="modal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoSchedule;