import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import AddAllergy from './../modaldialogs/AddAllergy';
import PropTypes from 'prop-types';

class AllergiesCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
          idAllergy: 0,
          shouldUpdate: 1
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

    shouldComponentUpdate(nextProps, nextState){
        return(this.props.reload!==nextProps.reload)
    }

    render(){
        return(
            <div>
            <div className="row justify-content-center"> 
                <div className="col-md-6 col-8 text-center mt-4">
                    <button type="button" className="btn btn-info btn-lg mb-3" id="AddRate" data-toggle="modal" data-target="#AddAllergyModal">Add allergy</button>
                </div>
            </div>
            <AddAllergy callback={this.reloadRows.bind(this)} Visit={this.props.Visit} PatientId={this.props.PatientId} reload={this.props.reload}/>
        </div>
        )
    }
}
AllergiesCard.propTypes = {
    callback: PropTypes.func
  };
export default AllergiesCard