import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import validator from 'validator';
import PropTypes from 'prop-types';
import './../../../style/Disease.css';

class ClosedAllergiesInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            allergies: []
        }
    }

    getClosedAllergies(PatientId){
        axios({
            method: 'get',
            url: localStorage.getItem("server_url") + '/api/PatientData/GetClosedAllergiesInfo/' + PatientId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
            .then(res => {
                this.setState({
                    allergies: res.data
                });
            });
    }

    componentDidMount(){
        this.getClosedAllergies(this.props.PatientId);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.reload!==nextProps.reload || this.state.allergies!==nextState.allergies)
    }

    componentWillUpdate(nextProps, nextState) {
        if(this.props.reload!==nextProps.reload)
            this.getClosedAllergies(nextProps.PatientId);
    }

    render() {
        return (
            <div className="modal fade" id="ClosedAllergiesInfo">
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="mModalLabel">Allergies history</h4>
                            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                        </div>
                        <div className="modal-body" id="ClosedAllergiesModal">
                            <div className="ml-3">
                            <div id="accordion">
                            {
                                this.state.allergies.map(item =>
                                <div>
                                <div className="card mb-2">
                                  <div className="card-header" id={"closedAllergyHeading" + item.Id}>
                                    <h5 className="mb-0">
                                      <div data-toggle="collapse" data-target={"#closedAllergy" + item.Id} aria-expanded="true" aria-controls={"closedAllergy" + item.Id}>
                                      <b>Allergy : </b>{item.AllergyName}<br/>
                                      </div>
                                    </h5>
                                  </div>
                              
                                  <div id={"closedAllergy" + item.Id} className="collapse" aria-labelledby={"closedAllergyHeading" + + item.Id} data-parent="#accordion">
                                    <div className="ClosedDiseaseInfo ml-3">

                                        <b>Opening : </b>{item.OpeningClosingVisitsInfo.m_Item1.DoctorFirstName  + " " + item.OpeningClosingVisitsInfo.m_Item1.DoctorLastName}<br/>

                                        <b>Start time of treatment : </b>{item.OpeningClosingVisitsInfo.m_Item1.StartDateTime}<br/>

                                        <b>Description : </b>{item.OpeningClosingVisitsInfo.m_Item1.Description}<br/>

                                        <b>Treatment : </b>{item.OpeningClosingVisitsInfo.m_Item1.Treatment}<br/>
                                        
                                        <b>Closing : </b>{item.OpeningClosingVisitsInfo.m_Item1.DoctorFirstName  + " " + item.OpeningClosingVisitsInfo.m_Item1.DoctorLastName}<br/>

                                        <b>End time of treatment : </b>{item.OpeningClosingVisitsInfo.m_Item1.StartDateTime}<br/>

                                        <b>Description : </b>{item.OpeningClosingVisitsInfo.m_Item1.Description}<br/>

                                        <b>Treatment : </b>{item.OpeningClosingVisitsInfo.m_Item1.Treatment}<br/>
                                    </div>
                                  </div>
                                </div>
                              </div>
                                )}
                            </div>  
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

ClosedAllergiesInfo.propTypes = {
    callback: PropTypes.func
  };

export default ClosedAllergiesInfo;