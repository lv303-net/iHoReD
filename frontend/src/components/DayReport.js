import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
import '../style/SalaryReport.css';

    class DayReport extends React.Component {
        constructor(props)
        {
            super(props);
        }
      render() {  
              return (              
        <div className="row" id="patientcard">
        <div className="col-3" id="col-custom">{(this.props.day==null) ? <strong>Total</strong> : this.props.day.slice(0,7)}</div>
        <div className="col-2"id="col-custom">{this.props.workedHours}</div>
        <div className="col-2"id="col-custom">{this.props.salaryCoefficient}</div>
        <div className="col-2"id="col-custom">{this.props.salaryRate}</div>
        <div className="col-3">{this.props.earnedMoney}</div>    
      </div>   
      )
      };
      }
export default DayReport;