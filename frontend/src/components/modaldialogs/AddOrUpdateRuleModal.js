import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

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
        axios.post(server_url + '/rule/' + this.NewData.IdRule, this.NewData)
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
        <div class="modal fade" id="addRuleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Rule info</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form>
                                <div class="modal-body">
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12">
                                            <input type="text" className="form-control" id="rulenameAoUInput" placeholder="Rule Name" onBlur={(x) => this.NewData.RuleName = x.target.value}/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12">
                                            <input type="text" className="form-control" id="hourstartAoUInput"placeholder="Hour Start" onBlur={(x) => this.NewData.HourStart = x.target.value}/>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12">
                                            <input type="text"  className="form-control" id="hourendAoUInput"placeholder="Hour Finish" onBlur={(x) => this.NewData.HourFinish = x.target.value}/>
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
                                        <div className="form-group col-sm-6 col-xs-12">
                                            <input class="form-check-input" type="checkbox" id="inclusiveAoUCheckbox" onBlur={(x) => this.NewData.IfInclusive = x.target.checked}/>
                                            <label class="form-check-label">Inclusive</label>
                                        </div>
                                    </div>
                                    <div className="form-row mb-3 justify-content-center">
                                        <div className="form-group col-sm-6 col-xs-12">
                                        {Object.keys(this.state.currentRule.Week).map((key) => <div class="form-check form-check-inline">
                                                <label class="form-check-label">{this.ShowShorterValueName(key)}
                                                    <input class="form-check-input" type="checkbox" id={key.toLowerCase() + 'AoUCheckbox'} onChange={(x)=> {this.NewData.Week[key] = x.target.checked}}/>
                                                </label>
                                            </div>)}
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={(e) => this.AddOrUpdateRule(this.props.currentRule)}>Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        )
    }
}

export default AddOrUpdateRule;