import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import SelectProfession from './SelectProfession';
import SelectDoctor from './SelectDoctor';
class Salary extends Component{
    constructor(props) {
        super(props);
        this.state = {
          idProf: 0
        }
    }
    formChild1(param) {
        this.setState({
          idProf: param
        })
      }

    render(){
        return(
            <div>
                <SelectProfession callback={this.formChild1.bind(this)}/>
                <SelectDoctor idProf={this.state.idProf}/>
            </div>
        )
    }
}

export default Salary