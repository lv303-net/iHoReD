import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import SelectProfession from './SelectProfession';
import SelectDoctor from './SelectDoctor';
import ProfessionRows from '../ProfessionRows';

class Salary extends Component{
    constructor(props) {
        super(props);
        this.state = {
          idProf: 0,
          idDoc: 0,
          shouldUpdate: 1
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
            <div className="row" id="salaryDiv"> 
                <div className="col-sm-6">
                <SelectProfession callback={this.getProfessionId.bind(this)}/>
                <SelectDoctor idProf={this.state.idProf} callback={this.getDoctorId.bind(this)}/>
                </div>
                <div className="col-sm-5 mt-3 ">
                <ProfessionRows idProf={this.state.idProf} idDoc={this.state.idDoc} shouldUpdate={this.state.shouldUpdate}/>
                </div>
            </div>
        )
    }
}

export default Salary