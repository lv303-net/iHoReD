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

        axios.get(server_url+'/GetMedicalCard/'+this.props.PatientId)
          .then(res => {
               this.setState({
                diagnosesArr: res.data
               })
          });
      };

    render(){
      var elements=[];
      return (<div>
      <div className="card-columns">
      {this.state.diagnosesArr.map(diagnoses => <CardDisease treatment={diagnoses.CardId} treatmentDescr={diagnoses.Cure} diseaseDescr={diagnoses.Description} doctor={diagnoses.IdDoctor} date={diagnoses.StartDateTime} diagnosis={diagnoses.DiseaseCode}/>)}
      </div>
      <div>
      <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item mypag-item"><a class="page-link mypag-link" href="1">1</a></li>
    <li class="page-item mypag-item"><a class="page-link mypag-link" href="2">2</a></li>
    <li class="page-item mypag-item"><a class="page-link mypag-link" href="3">3</a></li>
    <li class="page-item mypag-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>
 </div>
    </div>)
   }
  }

  export default PatientDiagnosesTable;