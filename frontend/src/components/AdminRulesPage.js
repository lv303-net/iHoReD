import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LogbarAuth from './LogbarAuth';
import DoctorsListWithSomeRule from './DoctorsListWithSomeRule';

class AdminRulesPage extends Component {
    render () {
        return (
            <div>
                <div>
                    <LogbarAuth/>
                </div>
                <div>
                    <RulesList/>
                </div>
            </div>
        );
    }
}

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class RulesList extends Component {
    constructor() {
        super();
        this.state = {
            idArr: [],
            id: 0,
            idForInfo: 0
        };

        this.IdRule = -1;
        this.RuleName = '';
        this.HourStart = '';
        this.HourFinish = '';
        this.PeriodStart = '';
        this.PeriodFinish = '';
        this.IfInclusive = false;
        this.Week={
                Sunday: false,
                Monday: false,
                Tuesday: false,
                Wednesday: false,
                Thursday: false,
                Friday: false,
                Saturday: false
        }
        this.eventHandler=this.eventHandler.bind(this);
        
        axios.get(server_url+'/rule')
        .then(res => {
            this.setState({
                idArr: res.data
            });
        });
    }

    handlerAddRule = event =>
    {
        event.preventDefault();

        var ruleInfo = {
            IdRule: -1,
            RuleName: this.RuleName,
            HourStart: this.HourStart,
            HourFinish: this.HourFinish,
            PeriodStart: this.PeriodStart,
            PeriodFinish: this.PeriodFinish,
            IfInclusive: this.IfInclusive,
            Week: this.Week
        }

        axios.post(server_url + '/rule/' + this.IdRule, ruleInfo)
          .then(function (response) {
              //handle success
              window.location.reload();
              console.log(response);
          })
          .catch(function (response) {
              //handle error
              console.log(response);
          });
    }

    eventHandler(idP) {
        localStorage.setItem("currentProfession", idP)
        this.setState({
        id: idP
        })
    }

    ChangeIdForInfo(idP) {
        localStorage.setItem("currentProfession", idP)
        this.setState({
            idForInfo: idP
        })
    }

    ShowShorterValueName(text) {
        var newText = '';
        var i;
        for(i=0;i<3;i++){
            newText += text[i];
        }
        return newText;
    }

    DeleteRuleByID(id)
    {
        axios.post(server_url + "/rule/" + id + "/delete")
        .then(function (response) {
            //handle success
            window.location.reload();
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    render() {
        return (
            <div className = "container">
                <div className="list-group col-sm-6 float-left" id="listRules">
                    <div className="list-group-item active bg-info">
                        <div className="col-sm-11 float-left">Rules:</div>
                        <div className="col-sm-1 float-right">
                            <i class="fas fa-plus"  data-toggle="modal" data-target="#exampleModal"></i>
                        </div>
                    </div>
                        {this.state.idArr.map(idr => <div className='list-group-item list-group-item-active' key={idr.IdRule.toString()}>
                        <div className='col-sm-9 float-left' onClick={() => this.eventHandler(idr.IdRule)}>{idr.RuleName}</div>
                        <div className='col-sm-3 float-right justify-content-end'>
                            <i class="fas fa-pencil-alt"  onClick={() => this.ChangeIdForInfo(idr.IdRule)} data-toggle="modal" href="#myModal"></i>
                            <i class="fas fa-times" onClick={() => this.DeleteRuleByID(idr.IdRule)}></i>
                        </div>
                    </div>)}
                </div>
                <div id="listDoctors">
                    <DoctorsListWithSomeRule idRule={this.state.id}/>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Rule info</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={this.handlerAddRule}>
                                <div class="modal-body">
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputFName">
                                            <input type="text" className="form-control" onBlur={(x => {this.RuleName=x.target.value;})} name="RuleName" placeholder="Rule Name" required/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputLName">
                                            <input type="text" className="form-control" onBlur={(x => {this.HourStart=x.target.value;})} placeholder="HourStart" name="Hour start" required/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputPhone">
                                            <input type="text"  className="form-control" onBlur={x=> {this.HourFinish=x.target.value;}} placeholder="HourFinish" name="Hour finish" required/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputEmail">
                                            <input type="text"  className="form-control" onBlur={x=> {this.PeriodStart=x.target.value;}} id="inputEmailtext" placeholder="PeriodStart" name="PeriodStart" required/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputPassword">
                                            <input type="text"  className="form-control" placeholder="Period Finish" onBlur={(x => {this.PeriodFinish=x.target.value;})} name="PeriodFinish" required/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputPassword">
                                            <input class="form-check-input" type="checkbox" value="" onChange={x=> {this.IfInclusive = x.target.checked;}}/>
                                            <label class="form-check-label" for="defaultCheck1" >Inclusive</label>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12">
                                        {Object.keys(this.Week).map((key) => <div class="form-check form-check-inline">
                                                <label class="form-check-label" for="defaultCheck1" >{this.ShowShorterValueName(key)}
                                                    <input class="form-check-input" type="checkbox" value="" onChange={x=> {this.Week[key] = x.target.checked;}}/>
                                                </label>
                                            </div>)}
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" id="myModal">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Info about rule:</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                {this.state.idArr.map(rule => {if(rule.IdRule == this.state.idForInfo){
                                    return (
                                    <div>
                                        <p>Id: <b>{rule.IdRule}</b></p>                                        
                                        <label><p>Name:</p><input type="text" className="form-control" value="" name="firstName" onChange={this.handleChange} /></label>
                                        <p>Hour start:<b> {rule.HourStart}</b></p>
                                        <p>Hour end:<b> {rule.HourFinish}</b></p>
                                        <p>Period start: <b>{rule.PeriodStart}</b></p>
                                        <p>Period end: <b>{rule.PeriodFinish}</b></p>
                                        <p>Inclusive: <b>{rule.IfInclusive + ''}</b></p>
                                        <p>Working day: <p>{Object.keys(rule.Week).map((key) => <p>{key}: <b>{rule.Week[key]+''}</b></p>)}</p></p>
                                    </div>
                                )}})}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminRulesPage;
