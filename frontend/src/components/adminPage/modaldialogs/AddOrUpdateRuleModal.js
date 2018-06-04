import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../../../style/AddOrUpdateRuleModal.css';

class AddOrUpdateRule extends Component{
    constructor(props){
        super(props);
        this.state={
            finishDate: moment(),
            startDate: moment(),
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
        this.handleChangeFinish = this.handleChangeFinish.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
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
    handleChangeFinish(date) {
        this.setState({
          finishDate: date, 
        });
    }
    handleChangeStart(date) {
        this.setState({
          startDate: date, 
        });
    }
    async AddOrUpdateRule(){
        this.NewData.PeriodFinish = this.state.finishDate.format('YYYY-MM-DD');
        this.NewData.Periodstart = this.state.startDate.format('YYYY-MM-DD');
        await axios({
            method: 'post',
            url: localStorage.getItem("server_url") + '/rule/' + this.NewData.IdRule,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            },
            data: JSON.stringify(this.NewData)
        })
        .then(res => {
            console.log(res.status),
            this.props.updateRulesList()
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.currentRule !== nextProps.currentRule || this.state.startDate!==nextState.startDate 
            || this.state.finishDate!==nextState.finishDate); 
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
                                        <p className="marginBottom0">Rule name</p>
                                        <input type="text" className="form-control" id="rulenameAoUInput" placeholder="Rule Name" onBlur={(x) => this.NewData.RuleName = x.target.value}/>
                                    </div>
                                </div>
                                <div className="form-row mb-3 justify-content-center">
                                    <div className="form-group col-sm-6 col-xs-12">
                                        <p className="marginBottom0">Start hour</p>
                                        <input type="time" className="form-control" id="hourstartAoUInput" placeholder="Hour Start" onBlur={(x) => this.NewData.HourStart = x.target.value}/>
                                    </div>
                                </div>
                                <div className="form-row mb-3 justify-content-center">
                                    <div className="form-group col-sm-6 col-xs-12">
                                    <p className="marginBottom0">End hour</p>
                                        <input type="time"  className="form-control" id="hourendAoUInput"placeholder="Hour Finish" onBlur={(x) => this.NewData.HourFinish = x.target.value}/>
                                    </div>
                                </div>
                                <div className="form-row mb-3 justify-content-center">
                                    <div className="form-group col-sm-6 col-xs-12">
                                        <p className="marginBottom0">Period start</p>
                                        <DatePicker
                                            selected={this.state.startDate}
                                            startDate={this.state.startDate}
                                            onChange={this.handleChangeStart}
                                            id="periodstartAoUinput"
                                        />
                                    </div>
                                </div>
                                <div className="form-row mb-3 justify-content-center">
                                    <div className="form-group col-sm-6 col-xs-12">
                                        <p className="marginBottom0">Period end</p>
                                        <DatePicker
                                            selected={this.state.finishDate}
                                            startDate={this.state.finishDate}
                                            onChange={this.handleChangeFinish}
                                            id="periodendAoUinput"
                                        />
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
                                    <div className="form-group col-xs-12" id="daysOfWeekMainContainter">
                                        {Object.keys(this.state.currentRule.Week).map((key) => <div className="form-check form-check-inline" key={key.toString() + "AoURule"} id={key.toString() + "Container"}>
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