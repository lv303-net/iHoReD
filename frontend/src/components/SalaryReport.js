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
        <div class="panel-body text-center py-5 mx-5">
          <h3>
            {localStorage.getItem("currentUserFirstName") + "    "} 
            {" " + localStorage.getItem("currentUserLastName")}
          </h3>
        </div>
        <div className="container mt-5">
          <div className="row text-center">
            <div className="col-4">
              Start Date:
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
            <div className="col-4"> End Date:
            {/* <div class> */}

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
            <div className="col-4 mt-3">
              <button className="btn btn-primary" onClick={this.handleClick}>Apply</button>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-12">
              {/* <div className="container mt-5 col-lg-4 col-md-6 col-10" id="reportDiv"> */}
                <div className="row mt-5">
                  <div className="col">
                    <div class="row" id="patientcard">
                    <div class="col-6 col-custom-header" id="col-custom">Total sum</div>
                      <div class="col-6" id="col-custom">{this.earnedMoney()}</div>                                   
                    </div>
                    <div class="row" id="patientcard">
                      <div class="col-6 col-custom-header" id="col-custom">Average rate</div>
                      <div class="col-6" id="col-custom">{this.averageRate()}</div>
                    </div>
                    <div class="row" id="patientcard">
                      <div class="col-6 col-custom-header" id="col-custom">Average coefficient</div>
                      <div class="col-6" id="col-custom">{this.averageCoeff()}</div>
                    </div>
                    <div class="row" id="patientcard">
                      <div class="col-6 col-custom-header" id="col-custom">Worked hours</div>
                      <div class="col-6" id="col-custom">{this.sumWorkedHours()}</div>
                    </div>
                  </div>
                </div>
              {/* </div> */}
            </div>
            <div className="col-3 mt-5">
              <p><a class="btn btn-primary" data-toggle="collapse" id="multiCollapse" href="#multiCollapseExample1" role="button" aria-expanded="false"
                aria-controls="multiCollapseExample1">More details</a></p>
            </div>
          </div>
            <div class="collapse multi-collapse mt-5" id="multiCollapseExample1">
              <div class="row" id="patientcard">
                <div class="col-3 col-custom-header" id="col-custom">Date</div>
                <div class="col-2 col-custom-header" id="col-custom">Hours</div>
                <div class="col-2 col-custom-header" id="col-custom">Coeff</div>
                <div class="col-2 col-custom-header" id="col-custom">Rate</div>
                <div class="col-3 col-custom-header" id="col-custom">Total</div>
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

    )
  }
}
export default SalaryReport