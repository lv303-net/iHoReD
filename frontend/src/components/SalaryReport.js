import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DayReport from './DayReport'
import $ from 'jquery';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/SalaryReport.css';



class SalaryReport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment().subtract(1,'months'),
      endDate: moment(),
      salaryData: [],
      days:[],
         };
         axios.get(localStorage.getItem("server_url") + '/DoctorSalaryStatistics/' + this.props.match.params.id + '/' + this.state.startDate.format('YYYY-MM-DD') + '/' + this.state.endDate.format('YYYY-MM-DD'))
         .then(res => {
           this.setState({
                salaryData: res.data,      
                })
              });

    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleClick = this.handleClick.bind(this);
}
  handleChangeStart(date) {
    this.setState(
      this.setState({
         startDate:date
       })
   );
 }

  handleChangeEnd(date) {
    this.setState({
      endDate:date
    });
   }
   
    handleClick(e){
    e.preventDefault();
    var start =this.state.startDate.format('YYYY-MM-DD');
  var end =this.state.endDate.format('YYYY-MM-DD');

    axios.get(localStorage.getItem("server_url") + '/DoctorSalaryStatistics/' + this.props.match.params.id + '/' + start + '/' + end)
    .then(res => {
      this.setState({
           salaryData: res.data,      
           })
  });
}

  sumWorkedHours(){
    let array = this.state.salaryData.map(item => item.WorkedHours)
    let total=0;
   for(let i=0;i<array.length;i++)
   total+=array[i];
    return total;
}
averageCoeff(){
  let array = this.state.salaryData.map(item => item.SalaryCoefficient)
  let total=0;
 for(let i=0;i<array.length;i++)
 total+=array[i]/array.length;
  return total;
}
averageRate(){
  let array = this.state.salaryData.map(item => item.SalaryRate)
  let total=0;
 for(let i=0;i<array.length;i++)
 total+=array[i]/array.length;
  return total;
}
earnedMoney(){
  let array = this.state.salaryData.map(item => item.EarnedMoney)
  let total=0;
 for(let i=0;i<array.length;i++)
 total+=array[i];
  return total;
}
forMonth(){
  let array = this.state.salaryData.map(item => item.Day)
  for(let i=0;i<array.length;i++)
  if(array[i].slice(7)==array[i++].slice(7))
  return array[i];
}

  render() {
     return (
      <div>
        <div class="panel-body">
          <h3>
            {localStorage.getItem("currentUserFirstName")}
            {localStorage.getItem("currentUserLastName")}
          </h3>
        </div>
        <div className="container mt-5">
          <div class="row">
            <div>
              Start Date:
            </div><div>
              <DatePicker
               selected={this.state.startDate}        
                selectsStart
                dateFormat="YYYY-MM-DD"
                startDate={this.state.startDate}  
                // endDate={this.state.endDate}
                onChange={this.handleChangeStart}
                maxDate={this.state.endDate}
              />
            </div>
            <div> End Date:</div>
            <div class>

              <DatePicker
                selected={this.state.endDate}
                selectsEnd
                dateFormat="YYYY-MM-DD"
                maxDate={moment()}
                minDate={this.state.startDate}
                endDate={this.state.endDate}  
                 onChange={this.handleChangeEnd}
              />
            </div>
            <div>
              <button className="btn btn-primary" onClick={this.handleClick}>Apply</button>
            </div>
          </div>
          <div className="container mt-5 col-lg-4 col-md-6 col-10" id="reportDiv">
            <div className="row">
              <div className="col">
                <div class="row" id="patientcard">
                <div class="col-6" id="col-custom">TotalSumm</div>
                  <div class="col-6" id="demo">{this.earnedMoney()}</div>                                   
                </div>
                <div class="row" id="patientcard">
                  <div class="col-6" id="col-custom">AverageRate</div>
                  <div class="col-6" id="col-custom">{this.averageRate()}</div>
                </div>
                <div class="row" id="patientcard">
                  <div class="col-6" id="col-custom">Coeff</div>
                  <div class="col-6" id="col-custom">{this.averageCoeff()}</div>
                </div>
                <div class="row" id="patientcard">
                  <div class="col-6" id="col-custom">Hours</div>
                  <div class="col-6" id="col-custom">{this.sumWorkedHours()}</div>
                </div>
              </div>
            </div>
          </div>
          <p>
            <a class="btn btn-primary"
              data-toggle="collapse" id="multiCollapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">More details</a></p>
          <div class="row">
            <div class="col">
              <div class="collapse multi-collapse" id="multiCollapseExample1">
                <div class="card card-body">
                  <div class="row" id="patientcard">
                    <div class="col-3" id="col-custom">Date</div>
                    <div class="col-2" id="col-custom">Hours</div>
                    <div class="col-2" id="col-custom">Coeff</div>
                    <div class="col-2" id="col-custom">Rate</div>
                    <div class="col-3">Total</div>
                  </div>
                  <div id='listProf' className="list-group"  >
                   {this.state.salaryData.map(items => <DayReport  day={items.Day}
                     workedHours={items.WorkedHours} salaryCoefficient={items.SalaryCoefficient}
                      salaryRate={items.SalaryRate} earnedMoney={items.EarnedMoney}
                    />)}
                  </div>
                 
                </div>
              </div>
              
            </div>

          </div>
        </div>
      </div>

    )
  }
}
export default SalaryReport