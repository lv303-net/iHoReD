import React from 'react';
import { Component } from 'react';
import Reporting from './Reporting';

class SalaryReport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    };

  }
  render() {
    return (
      <div>
        <div className="container mt-5">
        <div class="row">
        <div class="col-12">
        <div id="datepicker">
          <Reporting />
          </div>
          </div>
          </div>
          <div class="row" id="patientcard">
            <div class="col-3" id="col-custom">Date</div>
            <div class="col-3"id="col-custom">Worked hours</div>
            <div class="col-2"id="col-custom">Coefficient</div>
            <div class="col-2"id="col-custom">Rate</div>
            <div class="col-2">Total</div>
          </div>
        </div>
      </div>
    )

  }
}
export default SalaryReport