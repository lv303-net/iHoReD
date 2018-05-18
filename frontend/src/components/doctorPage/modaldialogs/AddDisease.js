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
import SubDiseases from './../PatientMedicalCard/PatientDiseses/SubDiseases';

class AddDisease extends Component{
    constructor(props){
        super(props);
        this.state = {
            idCategory: 0,
            idSubCategory: 0,
            idDisease: 0,
            idSubDisease: 0,
            shouldUpdate: 1, 
            updateChild: 1
        }
        this.handleAddDisease=this.handleAddDisease.bind(this);
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
    getSubDiseaseId(param) {
        this.setState({
          idSubDisease: param,
          shouldUpdate: this.state.shouldUpdate + 1
        })
    }

    handleAddDisease() {

            var newDisease = {
                IdPatient: this.props.PatientId,
                StartTime: this.props.Visit,
                Disease: this.state.idSubDisease
            }   
            axios.post(localStorage.getItem("server_url") + '/api/PatientData/AddDisease', newDisease)
            .then(response=>{
            console.log(response.data);
            this.props.callback(response.data);
            })
    }
    
    render(){
        return(
            <div className="modal fade" id="AddRateToProfession" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
             
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">
                            Add new disease
                            </h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <Categories callback={this.getCategoryId.bind(this)}/>
                        <SubCategories idCategory={this.state.idCategory} callback={this.getSubCategoryId.bind(this)}/>
                        <Diseases idSubCategory={this.state.idSubCategory} callback={this.getDiseaseId.bind(this)}/>
                        <SubDiseases idDisease={this.state.idDisease} callback={this.getSubDiseaseId.bind(this)} PatientId={this.props.PatientId} reload={this.props.reload}/>
                        <div className="row mb-3 mt-5 justify-content-center">
                        <div className="col-sm-3 col-6 text-center" >
                            <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Cancel
                            </button>
                        </div>
                        <div className="col-sm-3 col-6 text-center">
                            <button type="button" className="btn btn-info btn-lg mb-3" data-dismiss="modal" onClick={() =>{this.handleAddDisease()}}>Add
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