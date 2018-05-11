import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
//import AddRateToProfession from './modaldialogs/AddRateToProfession'
import EditRateToProfession from './modaldialogs/EditRateToProfession';
import DeleteRateToProfession from './modaldialogs/DeleteRateToProfession';
import 'react-datepicker/dist/react-datepicker.css';
import validator from 'validator';

//import '../style/SalaryReport.css';

    class ProfessionRows extends React.Component {
        constructor(props)
        {
            super(props);
            this.state = {
                ratesArr: [],
                idProf: 0,
                idDoc: 0,
                currentDate: ""
            }
        }

        changeCurrentDate(date){
            this.setState({
                currentDate:date
            })
        }
        setStates(){
            let url_string = window.location.href;
            let url = new URL(url_string);
            let idDoc = url.searchParams.get("doc");
            let idProf= url.searchParams.get("prof");
            if(idProf!==null){
                this.setState({
                    idProf: idProf
                })
            }
            if(idDoc!==null){
                this.setState({
                    idDoc: idDoc
                })
            }
        }

        componentDidMount(){
            this.setStates();
        }

        shouldComponentUpdate(nextProps, nextState) {
            return (
                this.props.idDoc!==nextProps.idDoc 
                || this.state.idDoc!==nextProps.idDoc 
                || this.props.idProf!==nextProps.idProf 
                || this.state.idProf!==nextProps.idProf 
                || 
                this.state.currentDate!==nextState.currentDate
                || this.state.idProf!==nextState.idProf
                || this.state.idDoc!==nextState.idDoc
                || this.state.ratesArr!==nextState.ratesArr);
        }
        componentWillUpdate(nextProps, nextState){
            let url_string = window.location.href;
            let url = new URL(url_string);
            let idDoc = url.searchParams.get("doc");
            if((this.state.idProf===nextState.idProf===0) || this.props.idProf!==nextProps.idProf)
                this.setStates();
            if((this.state.idProf!==nextState.idProf) && idDoc===null)
            {
                axios.get(localStorage.getItem("server_url")+'/api/Salary/Rate/get/' + nextState.idProf)
                .then(response => {
                    this.setState({
                        ratesArr:response.data
                    })
                })
            }
            if((this.state.idDoc===nextState.idDoc===0) || this.props.idDoc!==nextProps.idDoc)
                this.setStates();
            if(this.state.idDoc!==nextState.idDoc)
            {
                axios.get(localStorage.getItem("server_url")+'/api/Salary/Coefficient/get/' + nextState.idDoc)
                .then(response => {
                    this.setState({
                        ratesArr:response.data
                    })
                })
            }
        }
        render() 
        {
            let url_string = window.location.href;
            let url = new URL(url_string);
            let idDoc = url.searchParams.get("doc");
            return (
            this.state.ratesArr.map(
            rate =>
            <div className="row" id="patientcard">
                <div className="col-6" id="col-custom">
                    <div className="row col-xs-12 col-sm-12 col-md-12">
                        <div className="col-8">
                            {
                                idDoc === null ? rate.Rate : rate.Coeff
                            }
                        </div> 
                        <div className="col-3" >
                            <i className="fa fa-pencil-alt col-1" data-toggle="modal" data-target="#EditRateToProfession" onClick = {() => this.changeCurrentDate(rate.StartDate)}></i>
                            <i className="fa fa-times col-1" data-toggle="modal" data-target="#DeleteRateToProfession" onClick = {() => this.changeCurrentDate(rate.StartDate)}></i>
                        </div>
                    </div>
                </div>
                <div className="col-6 text-center" id="col-custom dateDiv">{rate.StartDate.slice(0, 10)}</div>
                <DeleteRateToProfession date = {this.state.currentDate}/>
                <EditRateToProfession  date = {this.state.currentDate}/>
            </div>
          )
        )
        }
    }
export default ProfessionRows;