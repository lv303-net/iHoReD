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
        id: 0
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

    toggleArrow(name) {
      $(".fas")
    }

    responsiveTables(){
      if ($(window).width() <= 768) {
        if (this.state.id != 0) {          
          var idForDiv = "#prof"+this.state.id;
          var idForDivText = $(idForDiv).text();    
          $('#nameProf').text(idForDivText); 
        }
        $('#listDoc').hide();
        $('#listProf').hide();
        // $('.fa-angle-down').toggle();
        $('#profButton')
        .click(function(){
          $('#listProf').toggle();            
          // $('.fa-angle-down').toggle();
          // $('.fa-angle-right').toggle(); 
          $(".fas").toggleClass("fa-angle-down");
          $(".fas").toggleClass("fa-angle-right");             
          $('#listDoc').hide();
          }
        )
      $('.list-group-item-action')
      .click(function(){
          $('#listDoc').show();
          $('#nameProf').text('Professions');
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
      var searchParameter=new URLSearchParams(window.location.search);
      searchParameter.set('prof',val);
      searchParameter.delete('doc');
      window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
  };

    componentDidMount(){
      var url_string = window.location.href;
      var url = new URL(url_string);
      if (url.search != '') {
        var idProf = url.searchParams.get("prof");
        
        this.setState({
          id: idProf
        })
      }
       var _that = this;
        $(document).ready(function() {         
          _that.responsiveTables();
          $(window).resize(function() {          
            _that.responsiveTables();
          });
        });
    }

    componentDidUpdate(prevProps, prevState) {
      var idForDiv = "#prof"+this.state.id;
      var _that = this;
      $(idForDiv).addClass("active");
      if ($(window).width() <= 768) {
        var idForDivText = $(idForDiv).text();    
        $('#nameProf').text(idForDivText);
      }

    }

    eventHandler(idP) {
      localStorage.setItem("currentProfession", idP)
      this.setState({
        id: idP
      })
    }

    func(e) {
      e.preventDefault();
      var caller = e.target;
      var id = caller.id;
      var idDoc = caller.id.split('prof')[1];
      alert(caller.id);
    }

    render(){
      return <div className="col-sm-12 col-md-3" id='tablesBlock'>
              <div className="row">
              <div className="list-group mb-2 col-sm-6 col-md-12" id="professions">
                <div id='tableProf'>
                  <div className="list-group-item" id="profButton" tabIndex='1'>
                    <p id='tableLabel'>Professions</p>
                    <i className="fas fa-angle-down"></i>  
                    <span id='nameProf'> </span>           
                  </div>                  
                  <div id='listProf' className="list-group" onClick={this.func}>
                    {this.state.professionsArr.map(professionsArr => <a className='list-group-item list-group-item-action profDocTable' id={"prof"+professionsArr[0]} data-toggle="list" role="tab" key={professionsArr.toString()} onClick={() => {this.eventHandler(professionsArr[0]),this.addUrl(professionsArr[0])}} value='{professionsArr[1]}'>{professionsArr[1]}</a>)}
                    {/* {this.state.professionsArr.map(professionsArr => <a className='list-group-item list-group-item-action profDocTable' id={"prof"+professionsArr[0]} data-toggle="list" role="tab" key={professionsArr.toString()} value='{professionsArr[1]}'>{professionsArr[1]}</a>)}*/}
                    </div>
                  </div> 
                </div>
                <DoctorTable idProf={this.state.id}/> 
                </div>
        </div>
   }
  }

  export default ProfessionsTable;
