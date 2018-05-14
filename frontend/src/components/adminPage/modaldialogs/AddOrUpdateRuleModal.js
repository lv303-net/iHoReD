import React from 'react';
import { Component } from 'react';
import axios from 'axios';

class AddOrUpdateRule extends Component{
    constructor(props){
        super(props);
        this.state={
            id: 0,
            currentRule: {
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
        }
    }

    NewData = {
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

    ShowShorterValueName(text) {
        var newText = '';
        var i;
        for(i=0;i<3;i++){
            newText += text[i];
        }
        return newText;
    }

    AddOrUpdateRule(){
        axios.post(localStorage.getItem("server_url") + '/rule/' + this.NewData.IdRule, this.NewData)
        .then(console.log("Inserted" + this.NewData))
        .catch(error => {
            console.log(error.message);
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.currentRule !== nextProps.currentRule); 
      }

    componentWillUpdate(nextProps, nextState)
    {
        this.setState({
            currentRule: nextProps.currentRule
        })

        this.NewData = nextProps.currentRule;

        document.getElementById("rulenameAoUInput").value = nextProps.currentRule.RuleName;
        document.getElementById("hourstartAoUInput").value = nextProps.currentRule.HourStart;
        document.getElementById("hourendAoUInput").value = nextProps.currentRule.HourFinish;
        document.getElementById("periodstartAoUinput").value = nextProps.currentRule.PeriodStart;
        document.getElementById("periodendAoUinput").value = nextProps.currentRule.PeriodFinish;
        document.getElementById('inclusiveAoUCheckbox').checked = nextProps.currentRule.IfInclusive;
        Object.keys(this.state.currentRule.Week).map((key) => {document.getElementById(key.toLowerCase() +'AoUCheckbox').checked = nextProps.currentRule.Week[key]});
    }

    render(){
        return(
            <div className="modal fade" id="addRuleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Rule info</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-row mb-3 justify-content-center">
                                    <div className="form-group col-sm-6 col-xs-12">
                                        <input type="text" className="form-control" id="rulenameAoUInput" placeholder="Rule Name" onBlur={(x) => this.NewData.RuleName = x.target.value}/>
                                    </div>
                                </div>
                                <div className="form-row mb-3 justify-content-center">
                                    <div className="form-group col-sm-6 col-xs-12">
                                        <input type="time" className="form-control" id="hourstartAoUInput"placeholder="Hour Start" onBlur={(x) => this.NewData.HourStart = x.target.value}/>
                                    </div>
                                </div>
                                <div className="form-row mb-3 justify-content-center">
                                    <div className="form-group col-sm-6 col-xs-12">
                                        <input type="time"  className="form-control" id="hourendAoUInput"placeholder="Hour Finish" onBlur={(x) => this.NewData.HourFinish = x.target.value}/>
                                    </div>
                                </div>
                                <div className="form-row mb-3 justify-content-center">
                                    <div className="form-group col-sm-6 col-xs-12">
                                        <input type="text"  className="form-control" id="periodstartAoUinput" placeholder="Period Start" onBlur={(x) => this.NewData.PeriodStart = x.target.value}/>
                                    </div>
                                </div>
                                <div className="form-row mb-3 justify-content-center">
                                    <div className="form-group col-sm-6 col-xs-12">
                                        <input type="text"  className="form-control" id="periodendAoUinput" placeholder="Period Finish" onBlur={(x) => this.NewData.PeriodFinish = x.target.value}/>
                                    </div>
                                </div>
                                <div className="form-row mb-3 justify-content-center">
                                    <div className="form-group col-sm-6 col-xs-12 d-flex justify-content-between">
                                        <label className="form-check-label">Inclusive
                                            <input className="form-check-input align-middle" type="checkbox" id="inclusiveAoUCheckbox" onBlur={(x) => this.NewData.IfInclusive = x.target.checked}/>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row mb-3 justify-content-center">
                                    <div className="form-group col-xs-12">
                                        {Object.keys(this.state.currentRule.Week).map((key) => <div className="form-check form-check-inline" key={key.toString() + "AoURule"}>
                                            <label className="form-check-label d-flex flex-column dayOfWeekLabel">{this.ShowShorterValueName(key)}
                                                <input className="" type="checkbox" id={key.toLowerCase() + 'AoUCheckbox'} onChange={(x)=> {this.NewData.Week[key] = x.target.checked}}/>
                                            </label>
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => this.AddOrUpdateRule(this.props.currentRule)}>Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddOrUpdateRule;