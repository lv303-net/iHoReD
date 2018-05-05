import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import validator from 'validator';
import DoctorTable from './DoctorTable';
import '../style/Professions.css';
import Calendar from './Calendar';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"
localStorage.removeItem("currentProfession");

class ProfessionsTable extends React.Component{
constructor(props){
      super(props);
      this.state = {
        professionsArr: [],
        id: 0,
        shouldShow: false,
        idDoctor : 0,
        shouldDocBeShown: false
      };
      this.setStateID=this.setStateID.bind(this);
      // this.responsiveTables=this.responsiveTables.bind(this);      
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

    formChild1(param) {
      this.setState({
        idDoctor : param
      })
    }

    // responsiveTables(){
    //   var _that = this;
    //   //if ($(window).width() <= 768) {
    //     $(".fasProf").addClass("fa-angle-right");
    //     if (this.state.id != 0) {          
    //       var idForDiv = "#prof"+this.state.id;
    //       var idForDivText = $(idForDiv).text();    
    //       $('#nameProf').text(idForDivText); 
    //     //}
    //     $('#listDoc').hide();
    //     $('#listProf').hide();
    //     // $('.fa-angle-down').toggle();
    //     //$(".fas").toggleClass("fa-angle-down");
    //     $('#profButton')
    //     .click(function(){
    //       $('#listProf').toggle();            
    //       // $('.fa-angle-down').toggle();
    //       // $('.fa-angle-right').toggle(); 
    //       $(".fasProf").toggleClass("fa-angle-down");
    //       $(".fasProf").toggleClass("fa-angle-right");             
    //       $('#listDoc').hide();
    //       }
    //     )

    //     $('.list-group-item-action')
    //     .click(function(){
    //         $('#listDoc').show();
    //         var idForDiv = "#prof"+_that.state.id;
    //         var idForDivText = $(idForDiv).text();    
    //         $('#nameProf').text(idForDivText); 
    //       }
    //     )

    //   }
    //   else {
    //     $('.fa-angle-down').hide();
    //     $('.fa-angle-right').hide();
    //     $('#listDoc').show();
    //     $('#listProf').show();
    //   }
    //   }
    
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
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   return (this.state.id !== nextState.id); 
    // }

    // after updating occurs
    componentDidUpdate(prevProps, prevState) {
      if (!prevState.shouldShow) {
        var idForDiv = "#prof"+this.state.id;
        $(idForDiv).addClass("active");
      }
    }

    componentWillUpdate(nextProps, nextState) {
      let idSt = this.state.id;
      let id = nextState.professionsArr.find(professionsArr=> professionsArr[0] === idSt);
      if (!nextState.shouldShow && this.state.id != 0) {
        var idForDivText = id[1];  
        $('#nameProf').text(idForDivText);
      }
      else {
        $('#nameProf').text("");
      }
    }

    setStateID(idP) {
      this.setState({
        id: idP,
        shouldDocBeShown: true
      })
    }

    getIdProf(e) {
      e.preventDefault();
      var caller = e.target;
      var id = caller.id;
      var idProf = caller.id.split('prof')[1];
      this.setStateID(idProf);
      this.addUrl(idProf);
    }

    showList() {
      this.setState({
        shouldShow: !this.state.shouldShow
      })
      
    }

    render(){
      let basicButtons;
      if (this.state.shouldShow) {
        basicButtons =                   
        <div id='listProf' className="list-group">
        {this.state.professionsArr.map(
          professionsArr => 
          <a className='list-group-item list-group-item-action profDocTable' 
              id={"prof"+professionsArr[0]} data-toggle="list" role="tab" 
              key={professionsArr.toString()} 
              onClick={() => {this.setStateID(professionsArr[0]),this.addUrl(professionsArr[0])}} 
              value='{professionsArr[1]}'>{professionsArr[1]}
          </a>
          )
        }
        {/* {this.state.professionsArr.map(professionsArr => <a className='list-group-item list-group-item-action profDocTable' id={"prof"+professionsArr[0]} data-toggle="list" role="tab" key={professionsArr.toString()} value='{professionsArr[1]}'>{professionsArr[1]}</a>)} */}

        </div>
      }
      else {
        basicButtons = ""
      }
      
      return <div className="col-sm-12 col-md-12" id='tablesBlock'>
              <div className="row">
              <div className="list-group mb-2 col-sm-6 col-md-6" id="professions">
                <div id='tableProf'>
                  <div className="list-group-item" id="profButton" tabIndex='1' onClick= {()=>{this.showList()}}>
                    <p id='tableLabel'>Professions</p>
                    <i className="fas fasProf"></i>  
                    <i><span id='nameProf'> </span></i>           
                  </div>                  
                  {basicButtons}
                </div> 
              </div>
                <DoctorTable idProf={this.state.id} callback={this.formChild1.bind(this)} shouldShow={this.state.shouldDocBeShown}/> 
                <div className=" col-sm-12 col-md-11 mr-1" id="calendarDiv">
                <Calendar idDoctor = {this.state.idDoctor}/>
                </div>
                </div>
        </div>
   }   
  }

  
  export default ProfessionsTable;
