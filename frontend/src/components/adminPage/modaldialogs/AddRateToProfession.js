import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class AddRateToProfession extends Component{
    constructor(props){
        super(props);
        this.state = {
            startDate: moment()  
        }
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleSubmitEdit=this.handleSubmitEdit.bind(this);
        this.rate = "";
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
        var newRate = {
          professionId: Profession,
          rate: this.rate,
          startDate: this.state.startDate.format('YYYY-MM-DD')
          
        }   
        axios.post(localStorage.getItem("server_url") + '/api/Salary/Rate/add', newRate)
        .then(response=>{
          console.log(response.data);
        })
        
      }

    render(){
        return(
            <div class="modal fade" id="AddRateToProfession" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="exampleModalLabel">Confirm adding new rate</h3>
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
                        <div className="form-row ml-3 justify-content-center">
                            <div className="form-group justify-content-center col-sm-2 col-xs-12 mb-0">
                                <p className="labelForm">Date</p>
                            </div>
                            <div className="form-group col-sm-5 col-xs-12 mt-1">
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
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddRateToProfession;