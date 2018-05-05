import React from 'react';
import { Component } from 'react';

class PatientInfo  extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       
      };
    }
    
    render() {
        {
            return (
                <div className="container mt-5 col-lg-4 col-md-6 col-sm-10" id="patientInfoMain">
                    <div className="row" id="patientcard">
                        <div className="col">Patient</div>
                        <div className="col">
                       <i className="fa fa-heart"></i>
                       <i className="fa fa-heart"></i>
                       <i className="fa fa-heart"></i>
                       </div>
                    </div>
                   
                   <div className="row" id="patientcard">
                        <div className="col-6" id="col-custom">FirstName</div>
                        <div className="col-6">LastName</div>
                    </div>
                    <div className="row" id="patientcard">
                        <div className="col-6" id="col-custom">DateOfBirds</div>
                        <div className="col-6">30.04.2000</div>
                    </div>
                    <div className="row" id="patientcard">
                        <div className="col-6" id="col-custom">PhoneNumber</div>
                        <div className="col-6">0978214596</div>
                    </div>
                    <div className="row" id="patientcard">
                        <div className="col-6" id="col-custom">BllodType</div>
                        <div className="col-6">2</div>
                    </div>
                      </div>
                    
                
            );
        }
  }
  }

  export default PatientInfo;