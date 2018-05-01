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
    render(){
      return <div className="card-columns">
      <CardDisease treatment="1" treatmentDescr="TreatmentDescr1" diseaseDescr="DiseaseDescr1" doctor="Doctor1" date="01.05.2018" diagnosis="diagnosis1"/>
      <CardDisease treatment="2" treatmentDescr="TreatmentDescr2" diseaseDescr="DiseaseDescr2" doctor="Doctor2" date="02.05.2018" diagnosis="diagnosis2"/>
      <CardDisease treatment="3" treatmentDescr="TreatmentDescr3" diseaseDescr="DiseaseDescr3" doctor="Doctor3" date="03.05.2018" diagnosis="diagnosis3"/>
      <CardDisease treatment="4" treatmentDescr="TreatmentDescr4" diseaseDescr="DiseaseDescr4" doctor="Doctor4" date="04.05.2018" diagnosis="diagnosis4"/>
      </div>
   }
  }

  export default PatientDiagnosesTable;