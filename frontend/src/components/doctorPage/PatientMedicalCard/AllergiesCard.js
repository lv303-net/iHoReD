import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import AddAllergy from './../modaldialogs/AddAllergy';
import PropTypes from 'prop-types';

class AllergiesCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
          idAllergy: 0
        }
    }

    SaveAll(){
        var data = {
            Visit:this.props.Visit,
            PatientId:this.props.PatientId
        }
    }
    reloadRows(param) {
        this.props.callback(param);
    }
    render(){
        return(
            <div>
            <div className="row justify-content-center"> 
                <div className="col-md-6 col-8 text-center mt-4">
                    <button type="button" className="btn btn-info btn-lg mb-3" id="AddRate" data-toggle="modal" data-target="#AddAllergyModal">Add allergy</button>
                </div>
            </div>

            <AddAllergy Visit={this.props.Visit} PatientId={this.props.PatientId} callback={this.reloadRows.bind(this)}/>
        </div>
        )
    }
}
AllergiesCard.propTypes = {
    callback: PropTypes.func
  };
export default AllergiesCard