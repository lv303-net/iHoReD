import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import $ from 'jquery';
import validator from 'validator';

class EditRateToProfession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            rate: 0
        }
        this.divRate = React.createRef();
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.rate = "";
        this.validRate = "";
    }

    handleChangeStart(date) {
        this.setState({
            startDate: date,
            rate: 0
        });
    }

    handleSubmitEdit() {
        this.validateRate();
        if (this.validRate) {
            this.setState({
                rate: this.rate
            })

            this.rate = "";
            $('#RateEdit').val("");
            document.getElementById("RateEdit").style.borderColor = '#ced4da';
            $('#invalidRate').text("");
            $("#cancelEdit").trigger('click');
        }
        else {
        }
    }

    showError() {
        if (this.validRate) {
            document.getElementById("RateEdit").style.borderColor = 'green';
            this.divRate.current.textContent = '';
        }
        else {
            document.getElementById("RateEdit").style.borderColor = '#f74131';
            this.divRate.current.textContent = 'Only numbers are allowed';
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return ((this.props.date !== nextProps.date) || (this.state.rate !== nextState.rate))
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.rate !== 0 && (this.state.rate !== nextState.rate)) {
            var url_string = window.location.href;
            var url = new URL(url_string);
            var Profession = url.searchParams.get("prof");
            var Doctor = url.searchParams.get("doc");
            if (Doctor === null) {
                var newRate = {
                    UserId: localStorage.getItem("currentUserId"),
                    ProfessionId: Profession,
                    Rate: nextState.rate,
                    StartDate: nextProps.date
                }
                axios({
                    method: 'post',
                    url: localStorage.getItem("server_url") + '/api/Salary/Rate/edit',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                    },
                    data: JSON.stringify(newRate)
                })
                    .then(response => {
                        this.props.callback(response.data);
                    })
            }
            else {
                var newCoefficient = {
                    DoctorId: Doctor,
                    Coeff: nextState.rate,
                    StartDate: nextProps.date
                }
                axios({
                    method: 'post',
                    url: localStorage.getItem("server_url") + '/api/Salary/Coefficient/edit',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                    },
                    data: JSON.stringify(newCoefficient)
                })
                    .then(response => {
                        console.log(response.data);
                        this.props.callback(response.data);
                    })
            }

            $('#RateEdit').val("");
            document.getElementById("RateEdit").style.borderColor = '#ced4da';
            $('#invalidRate').text("");
        }

    }

    validateRate() {
        if (validator.isFloat(this.rate)) {
            this.validRate = true;
            return true;
        } else {
            this.validRate = false;
            return false;
        }
    }

    render() {
        return (
            <div className="modal fade" id="EditRateToProfession" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Confirm editing</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-row ml-3 justify-content-center">
                                <div className="form-group justify-content-center col-sm-2 col-xs-12 mb-0">
                                    <p className="labelForm">Rate</p>
                                </div>
                                <div className="form-group col-sm-6 col-xs-12" id="inputRate">
                                    <input
                                        className="form-control"
                                        placeholder="Rate"
                                        onChange={x => { this.rate = x.target.value; }}
                                        id="RateEdit"
                                    />
                                    <div id="invalidRate" className="text-muted" ref={this.divRate}>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3 mt-5 justify-content-center">
                                <div className="col-sm-3 col-6 text-center" >
                                    <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal" id="cancelEdit">Cancel
                            </button>
                                </div>
                                <div className="col-sm-3 col-6 text-center">
                                    <button type="button" className="btn btn-info btn-lg mb-3" onClick={() => { this.handleSubmitEdit(), this.showError() }}>Submit
                            </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EditRateToProfession.propTypes = {
    callback: PropTypes.func
};

export default EditRateToProfession;