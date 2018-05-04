import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';

import '../style/PatientDiagnosesTable.css';
import CardDisease from '../components/CardDisease';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"
localStorage.removeItem("currentProfession");
//console.log(localStorage.getItem("currentProfession"));

class PatientDiagnosesTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          diagnosesArr: [],
          id: 1
        };

        axios.get(server_url+'/GetMedicalCard/1')
          .then(res => {
               //const diagnosesArr = res.data;
               this.setState({
                diagnosesArr: res.data
               })
          });
      };

    render(){
      return <div className="card-columns">
      {this.state.diagnosesArr.map(diagnoses => <CardDisease treatment={diagnoses.CardId} treatmentDescr={diagnoses.Cure} diseaseDescr={diagnoses.Description} doctor={diagnoses.IdDoctor} date={diagnoses.StartDateTime} diagnosis={diagnoses.DiseaseCode}/>)}
      </div>
   }
  }

  export default PatientDiagnosesTable;