import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import validator from 'validator';
import PropTypes from 'prop-types';
import $ from 'jquery';
import DeleteRateToProfession from './DeleteRateToProfession';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class AddRateToProfession extends Component{
    constructor(props){
        super(props);
        this.state = {
            startDate: moment(),
            statusCode: "",
            show: false
        }
        this.divRate = React.createRef();
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleSubmitEdit=this.handleSubmitEdit.bind(this);
        this.rate = "";
        this.validRate = false;
    }
    hideError(divName, inputName) {
        divName.current.textContent = '';
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

    showError() {        
        if (this.validRate){
            document.getElementById("RateAdd").style.borderColor = 'green';
            this.divRate.current.textContent = '';
        }
        else {
            document.getElementById("RateAdd").style.borderColor = '#f74131';
            this.divRate.current.textContent = 'Only numbers are allowed';
        }
    }
    handleChangeStart(date) {
        this.setState({
          startDate: date, 
        });

    }
    handleSubmitEdit() {
        
        var url_string = window.location.href;
        var url = new URL(url_string);
        var Profession = url.searchParams.get("prof");
        var Doctor = url.searchParams.get("doc");
        if(Doctor===null){
            var newRate = {
            ProfessionId: Profession,
            Rate: this.rate,
            StartDate: this.state.startDate.format('YYYY-MM-DD')
            
            }   
            axios({
                method: 'post',
                url: localStorage.getItem("server_url") + '/api/Salary/Rate/add',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                },
                data: JSON.stringify(newRate)
            })
            .then(response=>{
                this.props.callback(response.data);
            })
        }
        else{
            var newCoeff = {
                DoctorId: Doctor,
                Coeff: this.rate,
                StartDate: this.state.startDate.format('YYYY-MM-DD')
                }   
                axios({
                    method: 'post',
                    url: localStorage.getItem("server_url") + '/api/Salary/Coefficient/add',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                    },
                    data: JSON.stringify(newCoeff)
                })
                .then(response=>{
                    this.props.callback(response.data);
                })
        }
        $('#RateAdd').val("");
        document.getElementById("RateAdd").style.borderColor = '#ced4da';
        $('#invalidRate').text("");
      }
    render(){
            let url_string = window.location.href;
            let url = new URL(url_string);
            let idDoc = url.searchParams.get("doc");
        return(
            <div className="modal fade" id="AddRateToProfession" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
             
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">
                            {idDoc === null ? "Confirm adding new rate" : "Confirm adding new coefficient"}
                            </h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <div className="form-row ml-5 justify-content">
                            <div className="form-group justify-content-center col-sm-2 col-xs-12 mr-2 mb-0">
                                <p className="labelForm labelAdd">
                                {idDoc === null ? "Rate" : "Coeff"}
                                </p>
                            </div>
                            <div className="form-group justify-content-center col-sm-6 col-xs-12 ml-2" id="inputRate">   
                                <div className="text-center justify-content-center">                             
                                <input 
                                className="form-control"
                                placeholder={idDoc === null ? "Rate" : "Coeff"}
                                onChange={x => { this.rate = x.target.value; this.validateRate(); this.hideError(this.divRate, 'Rate')}}
                                onBlur={()=>this.showError()}
                                id="RateAdd"
                                />
                                </div>
                                <div id="invalidRate" className="text-muted ml-2" ref={this.divRate}>
                            </div>
                            </div>
                        </div>
                        <div className="form-row ml-5 justify-content">
                            <div className="form-group justify-content-center col-sm-2 col-xs-12  mb-0">
                                <p className="labelForm labelAdd">Date</p>
                            </div>
                            <div className="form-group col-sm-6 col-xs-12 ml-3 mt-1" id="datePickerForm">
                            <DatePicker
                            selected={this.state.startDate}
                            startDate={this.state.startDate}
                            onChange={this.handleChangeStart}
                            id="adminDatePicker"
                            />
                            </div>
                        </div>
                        <div className="row mb-3 mt-5 justify-content-center">
                        <div className="col-sm-3 col-6 text-center" >
                            <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Cancel
                            </button>
                        </div>
                        <div className="col-sm-3 col-6 text-center">
                            <button type="button" className="btn btn-info btn-lg mb-3"data-dismiss="modal" onClick={() =>{this.handleSubmitEdit()}}>Submit
                            </button>
                        </div>
                        </div>
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddRateToProfession.propTypes = {
    callback: PropTypes.func
  };

export default AddRateToProfession;