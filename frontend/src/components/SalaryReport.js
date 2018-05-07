import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
import '../style/SalaryReport.css';

var server_url;
if (process.env.NODE_ENV === "development")
    server_url = "http://localhost:58511"
else if (process.env.NODE_ENV === "production")
    server_url = "https://hored.azurewebsites.net"

    class DayReport extends React.Component {
      render() {
        return (
        <div class="row" id="patientcard">
        <div class="col-3" id="col-custom">{this.props.Day}</div>
        <div class="col-2"id="col-custom">{this.props.WorkedHours}</div>
        <div class="col-2"id="col-custom">{this.props.SalaryCoefficient}</div>
        <div class="col-2"id="col-custom">{this.props.SalaryRate}</div>
        <div class="col-3">{this.props.EarnedMoney}</div>
      </div>
      )
      };
      };

       

class SalaryReport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(),
      salaryData: []
    };
    axios.get(server_url + '/DoctorSalaryStatistics/1/2017-11-01/2017-12-01')
    .then(res => {   
        this.setState({
          salaryData:res.data
        })
    });

    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
 
  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.startDate !== nextState.startDate);
  }

  componentWillUpdate(nextProps, nextState) {
     
  }
  
  render() {
    return (
      <div>
        <div className="container mt-5">
        <div class="row">
        <div class="col-12">
        <div id="datepicker">
        <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange} />
          </div>
          </div>
          </div>
          <div class="row" id="patientcard">
            <div class="col-3" id="col-custom">Date</div>
            <div class="col-2"id="col-custom">Hours</div>
            <div class="col-2"id="col-custom">Coeff</div>
            <div class="col-2"id="col-custom">Rate</div>
            <div class="col-3">Total</div>

            <div id='listProf' className="list-group">
            {this.state.salaryData.map(items => <DayReport Day={items.Day} WorkedHours={items.WorkedHours} SalaryCoefficient={items.SalaryCoefficient} SalaryRate={items.SalaryRate} EarnedMoney={items.EarnedMoney}/>)}
         
        </div>
        </div>
        </div>
        </div>
       
    )}
}
export default SalaryReport