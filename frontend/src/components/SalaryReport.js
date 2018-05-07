import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DayReport from './DayReport'
import $ from 'jquery';

import 'react-datepicker/dist/react-datepicker.css';
import '../style/SalaryReport.css';

var server_url;
if (process.env.NODE_ENV === "development")
  server_url = "http://localhost:58511"
else if (process.env.NODE_ENV === "production")
  server_url = "https://hored.azurewebsites.net"



class SalaryReport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(),
      endDate: moment(),
      salaryData: []
    };
  
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date.format('YYYY-MM-DD')
    });
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date.format('YYYY-MM-DD')
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.startDate !== nextState.startDate ||this.state.endDate !== nextState.endDate);
  }

  componentWillUpdate(nextProps, nextState) {

    axios.get(server_url + '/DoctorSalaryStatistics/' + 1 + '/' + nextState.startDate + '/' + nextState.endDate)
      .then(res => {
        this.setState({
          salaryData: res.data,
         
        })
   });

  }
  render() {

    return (

      <div>
        <div className="container mt-5">
          <div class="row">
            <div class="col-6">
              <DatePicker
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
              />
            </div>
            <div class="col-6">
              <DatePicker
                selected={this.state.endDate}
                selectsEnd
                maxDate={moment()}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeEnd}
              />
            </div>
          </div>
          <div class="row" id="patientcard">
            <div class="col-3" id="col-custom">Date</div>
            <div class="col-2" id="col-custom">Hours</div>
            <div class="col-2" id="col-custom">Coeff</div>
            <div class="col-2" id="col-custom">Rate</div>
            <div class="col-3">Total</div>
          </div>
          <div id='listProf' className="list-group">
            {this.state.salaryData.map(items => <DayReport day={items.Day} workedHours={items.WorkedHours} salaryCoefficient={items.SalaryCoefficient}
              salaryRate={items.SalaryRate} earnedMoney={items.EarnedMoney}
            />)}
          </div>

        </div>
      </div>

    )
  }
}
export default SalaryReport