import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import AddRateToProfession from './modaldialogs/AddRateToProfession'
import EditRateToProfession from './modaldialogs/EditRateToProfession';
import DeleteRateToProfession from './modaldialogs/DeleteRateToProfession';
import 'react-datepicker/dist/react-datepicker.css';
import validator from 'validator';
import Notifications, {notify} from 'react-notify-toast';
import '../../style/ProfessionRows.css';
//import '../style/SalaryReport.css';

    class ProfessionRows extends React.Component {
        constructor(props)
        {
            super(props);
            this.state = {
                ratesArr: [],
                idProf: 0,
                idDoc: 0,
                currentDate: "",
                shouldUpdate: 1
            }
        }

        changeCurrentDate(date){
            this.setState({
                currentDate:date
            })
        }

        reloadRows(param) {
            if(param===0){
                let myColor = { background: '#FF0000', text: "#FFFFFF" };
                notify.show("you can not add multiple rates/salaries for one day", "custom", 5000, myColor);
            }
            

            this.setState({
                shouldUpdate: this.state.shouldUpdate + param
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
                || this.state.currentDate!==nextState.currentDate
                || this.state.idProf!==nextState.idProf
                || this.state.idDoc!==nextState.idDoc
                || this.state.ratesArr!==nextState.ratesArr
                || this.state.shouldUpdate!==nextState.shouldUpdate);
        }
        componentWillUpdate(nextProps, nextState){
            let url_string = window.location.href;
            let url = new URL(url_string);
            let idDoc = url.searchParams.get("doc");
            if((this.state.idProf===nextState.idProf===0) || this.props.idProf!==nextProps.idProf)
                this.setStates();
            if(((this.state.idProf!==nextState.idProf) || (this.state.shouldUpdate!==nextState.shouldUpdate)) && idDoc===null)
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
            if(((this.state.idDoc!==nextState.idDoc || this.state.shouldUpdate!==nextState.shouldUpdate)) && idDoc!==null)
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
            let images;
            return (
            <div >
            <Notifications />
            <div className=" col-10 mt-4 text-center" id="AddRate" data-toggle="modal" data-target="#AddRateToProfession">
                <h5 className="mt-2">{idDoc === null ? "Add new rate" : "Add new coefficient"}</h5>
            </div>
            <div className="col-10" id="RateCoeffTable">
            <div className="row professionrow">
            <div className="col-3 text-center" id="col-custom"></div>
            <div className="col-4 text-center" id="col-custom">
                
                    {idDoc === null ? "Rate" : "Coefficient"}
                
            </div>
            <div className="col-5 text-center" id="col-custom dateDiv">
                Date
                </div>
            </div>
            {
            this.state.ratesArr.map(
            rate =>
            <div className="row professionrow">
                <div className="col-3" id="col-custom">
                        {
                        rate.State==1?
                        images =
                        <div className="mt-2" >
                            <i className="fa fa-pencil-alt mr-2 " data-toggle="modal" data-target="#EditRateToProfession" onClick = {() => this.changeCurrentDate(rate.StartDate)}></i>
                            <i className="fa fa-times col-1" data-toggle="modal" data-target="#DeleteRateToProfession" onClick = {() => this.changeCurrentDate(rate.StartDate)}></i>  
                        </div>
                        : (rate.State==0?
                            images =
                            <div className="mt-2" >
                                <i className="fa fa-pencil-alt" data-toggle="modal" data-target="#EditRateToProfession" onClick = {() => this.changeCurrentDate(rate.StartDate)}></i>
                            </div>
                        : (images="")
                        )
                        }
                </div>
                <div className="col-4" id="col-custom">
                    <div className="row col-xs-12 col-sm-12 col-md-12">
                    
                        <div className="col-8">
                            {
                                idDoc === null ? rate.Rate : rate.Coeff
                            }
                        </div> 
                    </div>
                </div>
                <div className="col-5 text-center" id="col-custom dateDiv">{rate.StartDate.slice(0, 10)}</div>
                <DeleteRateToProfession date = {this.state.currentDate} callback={this.reloadRows.bind(this)}/>
                <EditRateToProfession  date = {this.state.currentDate} callback={this.reloadRows.bind(this)}/>
                <AddRateToProfession callback={this.reloadRows.bind(this)}/>
            </div>
          )
        }
        
        </div>
        </div>
        )
        }
    }
export default ProfessionRows;