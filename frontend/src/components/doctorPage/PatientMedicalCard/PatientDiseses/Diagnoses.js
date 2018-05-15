import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Categories from './Categories';
import AddDisease from './../../modaldialogs/AddDisease';

class Salary extends Component{
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
            <div className="row"> 
                <div className="col-sm-6">
                
                </div>
                <div type="button" className=" col-12 col-md-5 mt-4 text-center " id="AddRate" data-toggle="modal" data-target="#AddRateToProfession">
                    <h6 className="mt-2">hhhhhhhhhhhhhhhhhhhhhh</h6>
                </div>
                <div className="col-sm-5 mt-3 ">
                <AddDisease callback={this.reloadRows.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default Salary