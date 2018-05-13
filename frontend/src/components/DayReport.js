import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../style/SalaryReport.css';
 
import 'react-datepicker/dist/react-datepicker.css';
import '../style/SalaryReport.css';

    class DayReport extends React.Component {
        constructor(props)
        {
            super(props);
        }
      render() {  
              return (              
        <div class="row" id="patientcard">
        <div class="col-3" id="col-custom">{this.props.day.slice(0,10)}</div>
        <div class="col-2"id="col-custom">{this.props.workedHours}</div>
        <div class="col-2"id="col-custom">{this.props.salaryCoefficient}</div>
        <div class="col-2"id="col-custom">{this.props.salaryRate}</div>
        <div class="col-3">{this.props.earnedMoney}</div>    
      </div>   
      )
      };
      }
export default DayReport;