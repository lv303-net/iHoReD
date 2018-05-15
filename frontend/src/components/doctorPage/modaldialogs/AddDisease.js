import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import validator from 'validator';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Categories from './../PatientMedicalCard/PatientDiseses/Categories';
import SubCategories from './../PatientMedicalCard/PatientDiseses/SubCategories';
import Diseases from './../PatientMedicalCard/PatientDiseses/Diseases';
class AddDisease extends Component{
    constructor(props){
        super(props);
        this.state = {
            idCategory: 0,
            idSubCategory: 0,
            idDisease: 0,
            shouldUpdate: 1
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
    reloadRows(param) {
        if(param===0){
            let myColor = { background: '#FF0000', text: "#FFFFFF" };
            //notify.show("You can not add multiple rates/salaries for one day", "custom", 5000, myColor);
        }

        this.setState({
            shouldUpdate: this.state.shouldUpdate + param
        })
    }
    getCategoryId(param) {
        this.setState({
          idCategory: param,
          shouldUpdate: this.state.shouldUpdate + 1
        })
    }
    getSubCategoryId(param) {
        this.setState({
          idSubCategory: param,
          shouldUpdate: this.state.shouldUpdate + 1
        })
    }
    getDiseaseId(param) {
        this.setState({
          idDisease: param,
          shouldUpdate: this.state.shouldUpdate + 1
        })
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
            console.log('valid');
            document.getElementById("RateAdd").style.borderColor = 'green';
            this.divRate.current.textContent = '';
        }
        else {
            console.log('unvalid');
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
            axios.post(localStorage.getItem("server_url") + '/api/Salary/Rate/add', newRate)
            .then(response=>{
            console.log(response.data);
            this.props.callback(response.data);
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
                this.props.callback(response.data);
                })
        }
        
      }
    render(){
            let url_string = window.location.href;
            let url = new URL(url_string);
            let idDoc = url.searchParams.get("doc");
        return(
            <div className="modal fade" id="AddRateToProfession" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
             
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">
                            {idDoc === null ? "Confirm adding new rate" : "Confirm adding new coefficient"}
                            </h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <Categories callback={this.getCategoryId.bind(this)}/>
                        <SubCategories idCategory={this.state.idCategory} callback={this.getSubCategoryId.bind(this)}/>
                        <Diseases idSubCategory={this.state.idSubCategory} callback={this.getDiseaseId.bind(this)}/>
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

AddDisease.propTypes = {
    callback: PropTypes.func
  };

export default AddDisease;