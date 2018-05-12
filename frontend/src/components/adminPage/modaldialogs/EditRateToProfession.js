import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import $ from'jquery';

class EditRateToProfession extends Component{
    constructor(props){
        super(props);
        this.state = {
            startDate: moment(),
            rate: 0
        }
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleSubmitEdit=this.handleSubmitEdit.bind(this);
        this.rate = "";
    }

    handleChangeStart(date) {
        this.setState({
          startDate: date,
          rate: 0 
        });
    }
    
    handleSubmitEdit() {
        //$("#EditRateToProfession").removeData('modal');
        this.setState({
            rate: this.rate
        }) 
        $('#Rate').val('');
        this.rate="";
      }
      shouldComponentUpdate(nextProps, nextState)
      {
        return((this.props.date!==nextProps.date ) || (this.state.rate!==nextState.rate))
      }

      componentWillUpdate(nextProps, nextState){
        if(nextState.rate!==0 && (this.state.rate!==nextState.rate))
        {
            var url_string = window.location.href;
            var url = new URL(url_string);
            var Profession = url.searchParams.get("prof");
            var Doctor = url.searchParams.get("doc");
            if(Doctor===null){ 
                var newRate = {
                    ProfessionId: Profession,
                    Rate: nextState.rate,
                    StartDate: nextProps.date
                } 
                axios.post(localStorage.getItem("server_url") + '/api/Salary/Rate/edit', newRate)
                .then(response=>{
                console.log(response.data);
                this.props.callback(1);
                })
            }
            else{
                var newCoefficient = {
                    DoctorId: Doctor,
                    Coeff: nextState.rate,
                    StartDate: nextProps.date
                } 
                axios.post(localStorage.getItem("server_url") + '/api/Salary/Coefficient/edit', newCoefficient)
                .then(response=>{
                console.log(response.data);
                this.props.callback(1);
                })
            }
        }
        // document.getElementById("Rate").textContent="";
        // this.rate="";
        
      }
    render(){
        return(
            <div class="modal fade" id="EditRateToProfession" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="exampleModalLabel">Confirm editing</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <div className="form-row ml-3 justify-content-center">
                            <div className="form-group justify-content-center col-sm-2 col-xs-12 mb-0">
                                <p className="labelForm">Rate</p>
                            </div>
                            <div className="form-group col-sm-5 col-xs-12" id="inputRate">
                                <input 
                                className="form-control"
                                placeholder="Rate"
                                onChange={x => { this.rate = x.target.value;}}
                                id="Rate"
                                />
                                <div id="invalidPassword" className="text-muted">
                                </div>
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