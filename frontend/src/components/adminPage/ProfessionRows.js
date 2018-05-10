import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
//import AddRateToProfession from './modaldialogs/AddRateToProfession'
import EditRateToProfession from './modaldialogs/EditRateToProfession';
import DeleteRateToProfession from './modaldialogs/DeleteRateToProfession';
import 'react-datepicker/dist/react-datepicker.css';

//import '../style/SalaryReport.css';

    class ProfessionRows extends React.Component {
        constructor(props)
        {
            super(props);
            this.state = {
                ratesArr: [],
                idProf: 0,
                currentDate: ""
            }
        }

        changeCurrentDate(date){
            this.setState({
                currentDate:date
            })
        }

        shouldComponentUpdate(nextProps, nextState) {
            return (this.props.idProf!==nextProps.idProf || this.state.idProf!==nextProps.idProf || this.state.currentDate!==nextState.currentDate)
        }
        componentWillUpdate(nextProps, nextState)
        {
            if(this.props.idProf!==nextProps.idProf || this.state.idProf!==nextProps.idProf)
            {
                axios.get(localStorage.getItem("server_url")+'/api/Salary/Rate/get/' + nextProps.idProf)
                .then(response => {
                    this.setState({
                        idProf: nextProps.idProf,
                        ratesArr:response.data
                    })
                })
            }
        }
        render() 
        {
            return (
            this.state.ratesArr.map(
            rate =>
            <div className="row" id="patientcard">
                <div className="col-6" id="col-custom">
                    <div className="row col-xs-12 col-sm-12 col-md-12">
                        <div className="col-8">
                            {rate.rate}
                        </div> 
                        <div className="col-3" >
                            <i className="fa fa-pencil-alt col-1" data-toggle="modal" data-target="#EditRateToProfession" onClick = {() => this.changeCurrentDate(rate.startDate)}></i>
                            <i className="fa fa-times col-1" data-toggle="modal" data-target="#DeleteRateToProfession" onClick = {() => this.changeCurrentDate(rate.startDate)}></i>
                        </div>
                    </div>
                </div>
                <div className="col-6" id="col-custom">{rate.startDate.slice(0, 10)}</div>
                <DeleteRateToProfession date = {this.state.currentDate}/>
                <EditRateToProfession  date = {this.state.currentDate}/>
            </div>
          )
        )
        }
    }
export default ProfessionRows;