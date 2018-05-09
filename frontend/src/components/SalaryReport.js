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
      start:"",
      end: ""
    };

  
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date,
     
    });
    
      
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date,  
    });
   
  }
  componentDidMount(){
    
    axios.get(localStorage.getItem("server_url") + '/DoctorSalaryStatistics/' + 1 + '/' + this.state.startDate.format('YYYY-MM-DD') + '/' + this.state.endDate.format('YYYY-MM-DD'))
    .then(res => {
      this.setState({
        salaryData: res.data,
       
      })
    });

  }

  componentWillUpdate(nextProps, nextState) {
    var start=this.state.startDate.format('YYYY-MM-DD');
    var end=this.state.endDate.format('YYYY-MM-DD');
      axios.get(localStorage.getItem("server_url") + '/DoctorSalaryStatistics/' + 1 + '/' + start + '/' + end)
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
            Start Date:
              <DatePicker
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
              />
            </div>
            <div class="col-6">
              End Date:
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