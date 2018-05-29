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
            shouldUpdateRulesList: true,
            shouldUpdateDoctorList: false,
            shouldUpdateListDoctorsWithoutRules: false,
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

        var url = new URL(window.location.href);
        if(url.search === ''){
            let searchParameter = new URLSearchParams(window.location.search);
            searchParameter.set('RuleId', this.state.idRuleForDoctorTable);
            window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
        }
        else{
            this.state.idRuleForDoctorTable = url.searchParams.get('RuleId');
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
                massiveRules: res.data,
                shouldUpdateRulesList: false
            })
            this.state.massiveRules.map(data => console.log(data))
        })
        .catch(error => {
            console.log(error.message);
        })
        
    }

    ChangeIdRuleForDoctorTable(id, event){
        let searchParameter = new URLSearchParams(window.location.search);
        searchParameter.set('RuleId', id);
        window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
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

    UpdateRulesList(){
        this.setState({
            shouldUpdateRulesList: true
        })
    }

    UpdateDoctorsList(){
        if(this.state.idRuleForDoctorTable === this.state.currentRule.IdRule){
            this.setState({
                shouldUpdateDoctorList: true
            })
        }
    }

    DismissUpdateDoctorsList(){
        this.setState({
            shouldUpdateDoctorList: false
        })
    }

    UpdateListDoctorsWithoutRules(){
        this.setState({
            shouldUpdateListDoctorsWithoutRules: true
        })
    }

    DismissUpdateListDoctorsWithoutRules(){
        this.setState({
            shouldUpdateListDoctorsWithoutRules: false
        })
    }

    shouldComponentUpdate(nextProps, nextState){
        return (
            this.state.idRuleForDoctorTable !== nextState.idRuleForDoctorTable ||
            this.state.shouldUpdateRulesList !== nextState.shouldUpdateRulesList ||
            this.state.currentRule !== nextState.currentRule ||
            this.state.massiveRules !== nextState.massiveRules || 
            this.state.shouldUpdateDoctorList !== nextState.shouldUpdateDoctorList ||
            this.state.shouldUpdateListDoctorsWithoutRules !== nextState.shouldUpdateListDoctorsWithoutRules
        )
    }

    componentWillUpdate(nextProps, nextState){
        if(nextState.shouldUpdateRulesList === true){
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/rule',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
            .then(res => {
                console.log(res.data)
                this.setState({
                    massiveRules: res.data,
                    shouldUpdateRulesList: false
                })
            })
            .catch(error => {
                console.log(error.message);
            })
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
                <DoctorsListWithSomeRule idRule={this.state.idRuleForDoctorTable} shouldUpdate={this.state.shouldUpdateDoctorList} dismissUpdate={this.DismissUpdateDoctorsList.bind(this)} updateDoctorsWithoutRules={this.UpdateListDoctorsWithoutRules.bind(this)}/>
                <AddDoctorToCurrentRule IdRule={this.state.currentRule.IdRule} updateDoctorsList={this.UpdateDoctorsList.bind(this)} shouldUpdate={this.state.shouldUpdateListDoctorsWithoutRules} dismissUpdate={this.DismissUpdateListDoctorsWithoutRules.bind(this)}/>
                <AddOrUpdateRule currentRule={this.state.currentRule} updateRulesList={this.UpdateRulesList.bind(this)}/>
                <SubmitDeleting currentRule={this.state.currentRule} updateRulesList={this.UpdateRulesList.bind(this)}/>
            </div>
        )
        
    }
}

export default RulesPage;