import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Categories from './Categories';
import AddDisease from './../../modaldialogs/AddDisease';
import CloseDisease from './../../modaldialogs/CloseDisease';
import PropTypes from 'prop-types';

class Diagnoses extends Component{
    constructor(props) {
        super(props);
        this.state = {
          idProf: 0,
          idDoc: 0,
          shouldUpdate: 1
        }
    }
    reloadRows(param) {
        this.props.callback(param);
    }
    getProfessionId(param) {
        this.setState({
          idProf: param,
          shouldUpdate: this.state.shouldUpdate + 1
        })
    }

    getDoctorId(param) {
        this.setState({
          idDoc: param
        })
    }
    shouldComponentUpdate(nextProps, nextState){
        return(this.props.reload!==nextProps.reload)
    }
    render(){
        return(
            <div className="row justify-content-center"> 
                <div className="col-sm-12 col-md-6 text-center mt-4">
                    <button type="button" className="btn btn-info btn-lg mb-3" id="AddRate" data-toggle="modal" data-target="#AddDisease">Add disease
                    </button>
                </div>
                <div className="col-sm-12 col-md-6 text-center mt-4">
                    <button type="button" className="btn btn-info btn-lg mb-3" id="AddRate" data-toggle="modal" data-target="#CloseDisease">Close disease
                    </button>
                </div>
                <AddDisease callback={this.reloadRows.bind(this)} Visit={this.props.Visit} PatientId={this.props.PatientId} reload={this.props.reload}/>
                <CloseDisease callback={this.reloadRows.bind(this)} Visit={this.props.Visit} PatientId={this.props.PatientId} reload={this.props.reload}/>
            </div>
        )
    }
}
Diagnoses.propTypes = {
    callback: PropTypes.func
  };
export default Diagnoses