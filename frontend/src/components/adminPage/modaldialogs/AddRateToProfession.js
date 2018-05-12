import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import validator from 'validator';
import PropTypes from 'prop-types';

class AddRateToProfession extends Component{
    constructor(props){
        super(props);
        this.state = {
            startDate: moment()  
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
        if (validator.isInt(this.rate)) {
          this.validRate = true;
          return true;
        } else {
          this.validRate = false;
          return false;
        }
      }

    showError() {
        if (this.validRate){
            document.getElementById("Rate").style.borderColor = 'green';
            this.divRate.current.textContent = '';
        }
        else {
            document.getElementById("Rate").style.borderColor = '#f74131';
            this.divRate.current.textContent = 'Please enter a valid rate';
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
            axios.post(localStorage.getItem("server_url") + '/api/Salary/Rate/add', newRate)
            .then(response=>{
            console.log(response.data);
            this.props.callback(1);
            })
        }
        else{
            var newCoeff = {
                DoctorId: Doctor,
                Coeff: this.rate,
                StartDate: this.state.startDate.format('YYYY-MM-DD')
                }   
                axios.post(localStorage.getItem("server_url") + '/api/Salary/Coefficient/add', newCoeff)
                .then(response=>{
                console.log(response.data);
                this.props.callback(1);
                })
        }
        
      }

    render(){
        return(
            <div className="modal fade" id="AddRateToProfession" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Confirm adding new rate</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                                className="form-control col-sm-11"
                                placeholder="Rate"
                                onChange={x => { this.rate = x.target.value; this.validateRate(); this.hideError(this.divRate, 'Rate')}}
                                id="Rate"
                                />
                                <div id="invalidRate" className="text-muted" ref={this.divRate}>
                            </div>
                            </div>
                        </div>
                        <div className="form-row ml-3 justify-content-center">
                            <div className="form-group justify-content-center col-sm-2 col-xs-12 mb-0">
                                <p className="labelForm">Date</p>
                            </div>
                            <div className="form-group col-sm-6 col-xs-12 mt-1">
                            <DatePicker
                            selected={this.state.startDate}
                            startDate={this.state.startDate}
                            onChange={this.handleChangeStart}
                            id="adminDatePicker"
                            />
                            </div>
                        </div>
                        <div className="row mb-3 mt-5 justify-content-center">
                        <div className="col-xs-3 col-sm-3 col-md-3 text-center" >
                            <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Cancel
                            </button>
                        </div>
                        <div className="col-xs-3 col-sm-3 col-md-3 text-center">
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