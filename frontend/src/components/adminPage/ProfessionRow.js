import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
//import '../style/SalaryReport.css';

var server_url;
if (process.env.NODE_ENV === "development")
    server_url = "http://localhost:58511"
else if (process.env.NODE_ENV === "production")
    server_url = "https://hored.azurewebsites.net"

    class ProfessionRow extends React.Component {
        constructor(props)
        {
            super(props);
        }
      render() {
              return (
        <div class="row" id="patientcard">
        <div class="col-4" id="col-custom">{this.props.day.slice(0,10)}</div>
        <div class="col-4"id="col-custom">{this.props.day.slice(-8)}</div>
        <div class="col-4"id="col-custom">{this.props.rate}</div>
      </div>
      )
      };
      };
export default ProfessionRow;