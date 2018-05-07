import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DoctorsListWithSomeRule from './DoctorsListWithSomeRule';
import AddOrUpdateRule from './modaldialogs/AddOrUpdateRuleModal';
import SubmitDeleting from './modaldialogs/SubmitDeletingModal';
import AddDoctorToCurrentRule from './modaldialogs/AddDoctorToCurrentRule';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

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

        axios.get(server_url + '/rule')
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

    ChandeCurrentRuleInfo(currentRuleId){
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
            <div className="container min-height">
                <div className="list-group col-sm-6 mt-4 padding-l-r-10px">
                    <div className="list-group-item active">
                        <div className="col-sm-10 float-left">Rules:</div>
                        <div className="col-sm-2 float-right">
                            <i className="fa fa-plus" data-toggle="modal" data-target="#addRuleModal" onClick={() => this.ChandeCurrentRuleInfo(-1)}></i>
                        </div>
                    </div>
                    {this.state.massiveRules.map(rule => <div className="list-group-item list-group-active" key={rule.IdRule.toString()}>
                        <div className="col-sm-10 float-left" onClick={(e) => this.ChangeIdRuleForDoctorTable(rule.IdRule, e)}>
                            {rule.RuleName}
                        </div>
                        <div className="col-sm-2 float-right">
                            <i className="fa fa-plus" data-toggle="modal" data-target="#addDoctorToPageModal" onClick={() => this.ChandeCurrentRuleInfo(rule.IdRule)}></i>
                            <i className="fa fa-pencil-alt" data-toggle="modal" data-target="#addRuleModal" onClick={() => this.ChandeCurrentRuleInfo(rule.IdRule)}></i>
                            <i className="fa fa-times" data-toggle="modal" data-target="#submitDeletingData" onClick={() => this.ChandeCurrentRuleInfo(rule.IdRule)}></i>
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