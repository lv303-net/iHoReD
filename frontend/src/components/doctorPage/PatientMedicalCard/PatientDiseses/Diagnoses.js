import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Categories from './Categories';
import AddDisease from './../../modaldialogs/AddDisease';

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
        if(param===0){
            let myColor = { background: '#FF0000', text: "#FFFFFF" };
            //notify.show("You can not add multiple rates/salaries for one day", "custom", 5000, myColor);
        }
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

    render(){
        return(
            <div className="row ml-4"> 
                <div className="col-sm-5 col-md-2 text-center mt-4">
                    <button type="button" className="btn btn-info btn-lg mb-3" id="AddRate" data-toggle="modal" data-target="#AddRateToProfession">Add disease
                    </button>
                </div>
                <AddDisease callback={this.reloadRows.bind(this)} Visit={this.props.Visit} PatientId={this.props.PatientId}/>
            </div>
        )
    }
}

export default Diagnoses