import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import validator from 'validator';
import DoctorTable from './DoctorTable';

import '../style/Professions.css'

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"
localStorage.removeItem("currentProfession");
//console.log(localStorage.getItem("currentProfession"));

class ProfessionsTable extends React.Component{
constructor(props){
      super(props);
      this.state = {
        professionsArr: [],
        id: 1
      };
      this.eventHandler=this.eventHandler.bind(this);
      this.responsiveTables=this.responsiveTables.bind(this);
      axios.get(server_url+'/ProfessionsStatic')
        .then(res => {
          res.data.forEach(profession => {
             const professionsArr = res.data;
             this.setState({
               professionsArr
             })
          });
        });
    };

    responsiveTables(){
      if ($(window).width() <= 768 && $(window).width() >= 576) {
        $('#listDoc').hide();
        $('#listProf').hide();
        $('.fa-angle-down').toggle();
        $('#profButton')
        .click(function(){
          $('#listProf').toggle();            
          $('.fa-angle-down').toggle();
          $('.fa-angle-right').toggle();              
          $('#listDoc').hide();
        },
      )
      $('.list-group-item-action')
      .click(function(){
          $('#listDoc').show();
        }
      )
    }
    else {
      $('.fa-angle-down').hide();
      $('.fa-angle-right').hide();
      $('#listDoc').show();
      $('#listProf').show();
    }
    }
    
    addUrl(val) {
      var url = window.location.href;
      window.history.pushState( {} , '', '?prof='+val )
  };

    componentDidMount(){
      var _that = this;
      $(document).ready(function() {
        _that.responsiveTables();
        $(window).resize(function() {          
          _that.responsiveTables();
        });
      });
    }


    eventHandler(idP) {
      localStorage.setItem("currentProfession", idP)
      this.setState({
        id: idP
      })
    }

    render(){
      return <div className="col-sm-12 col-md-3" id='tablesBlock'>
              <div className="row">
              <div className="list-group mb-2 col-sm-6 col-md-12" id="professions">
                <div id='tableProf'>
                  <div className="list-group-item" id="profButton" tabindex='1'>
                    <p id='tableLabel'>Professions</p>
                    <i className="fas fa-angle-down"></i>  
                    <i class="fas fa-angle-right"></i>              
                  </div>                  
                  <div id='listProf'>
                    {this.state.professionsArr.map(professionsArr => <a className='list-group-item list-group-item-action profDocTable' data-toggle="list" role="tab" key={professionsArr.toString()} onClick={() => {this.eventHandler(professionsArr[0]),this.addUrl(professionsArr[1])}}><div>{professionsArr[1]}</div></a>)}
                  </div>
                  </div> 
                </div>
                <DoctorTable idProf={this.state.id}/> 
                </div>
        </div>
   }
  }

  export default ProfessionsTable;
