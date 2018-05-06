import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LogbarAuth from './../DoctorsListWithSomeRule';
import DoctorsListWithSomeRule from './../DoctorsListWithSomeRule';

class AdminRulesPage extends Component {
    render () {
        return (
            <div id='adminMainDiv'>
                <RulesList/>
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

        this.Soome = {
        IdRule: '',    
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
        this.eventHandler=this.eventHandler.bind(this);
        
        axios.get(server_url+'/rule')
        .then(res => {
            this.setState({
                idArr: res.data
            });
        });
    }

    handlerAddRule(id)
    {
        axios.post(server_url + '/rule/' + this.Soome.IdRule, this.Soome)
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
        this.setState({
        id: idP
        })
    }

    ChangeIdForInfo(idP) {
        this.setState({
            idForInfo: idP
        })

        this.state.idArr.map(data => {if(data.IdRule === idP) {     
            document.getElementsByName('ruleName')[0].value = data.RuleName;    
            document.getElementsByName('hourStart')[0].value = data.HourStart;
            document.getElementsByName('hourEnd')[0].value = data.HourFinish;
            document.getElementsByName('periodStart')[0].value = data.PeriodStart;
            document.getElementsByName('periodEnd')[0].value = data.PeriodFinish;
            document.getElementsByName('ifInclusive')[0].checked = data.IfInclusive;
            document.getElementsByName('Sun')[0].checked = data.Week.Sunday;
            document.getElementsByName('Mon')[0].checked = data.Week.Monday;
            document.getElementsByName('Tue')[0].checked = data.Week.Tuesday;
            document.getElementsByName('Wed')[0].checked = data.Week.Wednesday;
            document.getElementsByName('Thu')[0].checked = data.Week.Thursday;
            document.getElementsByName('Fri')[0].checked = data.Week.Friday;
            document.getElementsByName('Sat')[0].checked = data.Week.Saturday;
        }
    })}

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
                            <i class="fa fa-plus"  data-toggle="modal" data-target="#exampleModal"></i>
                        </div>
                    </div>
                        {this.state.idArr.map(idr => <div className='list-group-item list-group-item-active' key={idr.IdRule.toString()}>
                        <div className='col-sm-9 float-left' onClick={() => this.eventHandler(idr.IdRule)}>{idr.RuleName}</div>
                        <div className='col-sm-3 float-right justify-content-end'>
                            <i class="fa fa-pencil-alt"  onClick={() => this.ChangeIdForInfo(idr.IdRule)} data-toggle="modal" href="#myModal"></i>
                            <i class="fa fa-times" onClick={() => this.DeleteRuleByID(idr.IdRule)}></i>
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
                            <form onSubmit={this.handlerAddRule(-1)}>
                                <div class="modal-body">
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputFName">
                                            <input type="text" className="form-control" onBlur={(x => {this.Soome.RuleName=x.target.value;})} name="RuleName" placeholder="Rule Name" required/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputLName">
                                            <input type="text" className="form-control" onBlur={(x => {this.Soome.HourStart=x.target.value;})} placeholder="Hour Start" name="HourStart" required/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputPhone">
                                            <input type="text"  className="form-control" onBlur={x=> {this.Soome.HourFinish=x.target.value;}} placeholder="Hour Finish" name="HourFinish" required/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputEmail">
                                            <input type="text"  className="form-control" onBlur={x=> {this.Soome.PeriodStart=x.target.value;}} id="inputEmailtext" placeholder="Period Start" name="PeriodStart" required/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputPassword">
                                            <input type="text"  className="form-control" placeholder="Period Finish" onBlur={(x => {this.Soome.PeriodFinish=x.target.value;})} name="PeriodFinish" required/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputPassword">
                                            <input class="form-check-input" type="checkbox" value="" onChange={x=> {this.Soome.IfInclusive = x.target.checked;}}/>
                                            <label class="form-check-label">Inclusive</label>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12">
                                        {Object.keys(this.Soome.Week).map((key) => <div class="form-check form-check-inline">
                                                <label class="form-check-label">{this.ShowShorterValueName(key)}
                                                    <input class="form-check-input" type="checkbox" value="" onChange={x=> {this.Soome.Week[key] = x.target.checked;}}/>
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
                            <form onSubmit={this.handlerAddRule(this.state.idForInfo)}>
                                <div class="modal-body">
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputFName">
                                            <input type="text" className="form-control" onBlur={(x => {this.Soome.RuleName=x.target.value;})} name="ruleName" placeholder="Rule Name"/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputLName">
                                            <input type="text" className="form-control" onBlur={(x => {this.Soome.HourStart=x.target.value;})} placeholder="Hour Start" name="hourStart"/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputPhone">
                                            <input type="text"  className="form-control" onBlur={x=> {this.Soome.HourFinish=x.target.value;}} placeholder="Hour Finish" name="hourEnd"/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputPhone">
                                            <input type="text"  className="form-control" onBlur={x=> {this.Soome.PeriodStart=x.target.value;}} placeholder="Hour Finish" name="periodStart"/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputPhone">
                                            <input type="text"  className="form-control" onBlur={x=> {this.Soome.PeriodFinish=x.target.value;}} placeholder="Hour Finish" name="periodEnd"/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12" id="inputPassword">
                                            <input class="form-check-input" type="checkbox" onBlur={x=> {this.Soome.IfInclusive = x.target.checked;}} name="ifInclusive"/>
                                            <label>Inclusive</label>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12">
                                        {Object.keys(this.Soome.Week).map((key) => <div class="form-check form-check-inline">
                                                <label class="form-check-label" >{this.ShowShorterValueName(key)}</label>
                                                <input class="form-check-input" type="checkbox" onBlur={x=> {this.Soome.Week[key] = x.target.checked;}} name={this.ShowShorterValueName(key)} checked={this.Soome.Week[key].value}/>                                                
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
            </div>
        )
    }
}

export default AdminRulesPage;
