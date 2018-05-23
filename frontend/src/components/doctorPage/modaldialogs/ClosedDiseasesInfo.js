import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import validator from 'validator';
import PropTypes from 'prop-types';
import './../../../style/Disease.css';

class ClosedDiseasesInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            diseases: []
        }
    }

    getClosedDiseases(PatientId){
        axios({
            method: 'get',
            url: localStorage.getItem("server_url") + '/api/PatientData/GetClosedDiseaseInfo/' + PatientId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
            .then(res => {
                this.setState({
                    diseases: res.data
                });
            });
    }

    componentDidMount(){
        this.getClosedDiseases(this.props.PatientId);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.reload!==nextProps.reload || this.state.diseases!==nextState.diseases)
    }

    componentWillUpdate(nextProps, nextState) {
        if(this.props.reload!==nextProps.reload)
            this.getClosedDiseases(nextProps.PatientId);
    }

    render() {
        return (
            <div className="modal fade" id="ClosedDiseasesInfo">
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="mModalLabel">Diseases history</h4>
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                        </div>
                        <div className="modal-body" id="CloseDiseaseModal">
                            <div className="ml-3">
                            {
                                this.state.diseases.map(item =>
                                <div  id="patientcard">
                                    <div className="ml-3 mb-2 mt-2">
                                        <b>Disease : </b>{item.DiseaseName}<br/>

                                        <br/><b>Open disease : </b>{item.DoctorOpenFirstName  + " " + item.DoctorOpenLastName}<br/>
                                    
                                        <br/><b>Start time of treatment : </b>{item.StartDateTime }<br/>
                                    
                                        <br/><b>Description : </b>{item.Description }<br/>
                                    
                                        <br/><b>Treatment : </b>{item.Treatment }<br/>
                                    
                                        <br/><b>Close disease : </b>{item.DoctorCloseFirstName + " " + item.DoctorCloseLastName}<br/>
                                    
                                        <br/><b>End time of treatment : </b>{item.EndDateTime }<br/>
                                    </div>
                                </div>
                                )}
                            </div>
                            
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

ClosedDiseasesInfo.propTypes = {
    callback: PropTypes.func
  };

export default ClosedDiseasesInfo;