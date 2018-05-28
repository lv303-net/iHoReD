import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DoctorsListWithSomeRule from './DoctorsListWithSomeRule';
import AddOrUpdateRule from './modaldialogs/AddOrUpdateRuleModal';
import SubmitDeleting from './modaldialogs/SubmitDeletingModal';
import AddDoctorToCurrentRule from './modaldialogs/AddDoctorToCurrentRule';

class RulesPage extends Component {
    constructor(){
        super();
        this.state = {
            massiveRules: [],
            idRuleForDoctorTable: 0,
            currentRule: {
                IdRule: 0,    
                RuleName: '',
                HourStart: '',
                HourFinish: '',
                PeriodStart: '',
                PeriodFinish: '',
                IfInclusive: false,
                Week: {
                    Sunday: false,
                    Monday: false,
                    Tuesday: false,
                    Wednesday: false,
                    Thursday: false,
                    Friday: false,
                    Saturday: false
                }
            }
        }

        axios({
            method: 'get',
            url: localStorage.getItem("server_url") + '/rule',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        .then(res => {
            this.setState({
                massiveRules: res.data
            })
            this.state.massiveRules.map(data => console.log(data))
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    ChangeIdRuleForDoctorTable(id, event){
        console.log(event);
        this.setState({
            idRuleForDoctorTable: id
        })
    }

    ChangeCurrentRuleInfo(currentRuleId){
        if(currentRuleId < 0){
            this.setState({
                currentRule: {
                    IdRule: currentRuleId,
                    RuleName: '',
                    HourStart: '',
                    HourFinish: '',
                    PeriodStart: '',
                    PeriodFinish: '',
                    IfInclusive: false,
                    Week: {
                        Sunday: false,
                        Monday: false,
                        Tuesday: false,
                        Wednesday: false,
                        Thursday: false,
                        Friday: false,
                        Saturday: false
                    }
                }
            })
        } else {
            this.state.massiveRules.map(rule => {if(rule.IdRule === currentRuleId){
                this.setState({
                    currentRule: rule
                })
            }})
        }
    }

    render(){
        return (
            <div className="container min-height d-flex flex-row">
                <div className="list-group col-sm-6 mt-4 padding-l-r-10px">
                    <div className="list-group-item active d-flex flex-row d-flex justify-content-between">
                        <div>Rules:</div>
                        <div>
                            <i className="fa fa-plus align-middle" data-toggle="modal" data-target="#addRuleModal" onClick={() => this.ChangeCurrentRuleInfo(-1)}></i>
                        </div>
                    </div>
                    {this.state.massiveRules.map(rule => <div className="list-group-item list-group-active d-flex flex-row justify-content-between" key={rule.IdRule.toString() + "adminRulesPage"}>
                        <div onClick={(e) => this.ChangeIdRuleForDoctorTable(rule.IdRule, e)}>
                            {rule.RuleName}
                        </div>
                        <div>
                            <i className="fa fa-plus align-middle" data-toggle="modal" data-target="#addDoctorToPageModal" onClick={() => this.ChangeCurrentRuleInfo(rule.IdRule)}></i>
                            <i className="fa fa-pencil-alt align-middle" data-toggle="modal" data-target="#addRuleModal" onClick={() => this.ChangeCurrentRuleInfo(rule.IdRule)}></i>
                            <i className="fa fa-times align-middle" data-toggle="modal" data-target="#submitDeletingData" onClick={() => this.ChangeCurrentRuleInfo(rule.IdRule)}></i>
                        </div>
                    </div>)}
                </div>
                <DoctorsListWithSomeRule idRule={this.state.idRuleForDoctorTable}/>
                <AddDoctorToCurrentRule IdRule={this.state.currentRule.IdRule}/>
                <AddOrUpdateRule currentRule={this.state.currentRule}/>
                <SubmitDeleting currentRule={this.state.currentRule}/>
            </div>
        )
        
    }
}

export default RulesPage;