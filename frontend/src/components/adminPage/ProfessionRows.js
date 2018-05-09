import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
//import '../style/SalaryReport.css';

    class ProfessionRows extends React.Component {
        constructor(props)
        {
            super(props);
            this.state = {
                ratesArr: []
            }
        }
        shouldComponentUpdate(nextProps, nextState) {
            return (this.props.idProf!==nextProps.idProf)
        }
        componentWillUpdate(nextProps, nextState)
        {
            axios.get(localStorage.getItem("server_url")+'/GetRatesForProfession/' + nextProps.idProf)
            .then(response => {
                this.setState({
                    ratesArr:response.data
                })
            })
        }
        render() 
        {
            return (
            this.state.ratesArr.map(
            rate =>
            <div class="row" id="patientcard">
                <div class="col-6" id="col-custom">{rate[0]}</div>
                <div class="col-6"id="col-custom">{rate[1]}</div>
            </div>
          )
        )
        }
    }
export default ProfessionRows;