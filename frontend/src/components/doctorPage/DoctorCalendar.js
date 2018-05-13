import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import validator from 'validator';
import axios from 'axios';
import { divideDurationByDuration } from 'fullcalendar';
import InfoSchedule from './modaldialogs/InfoSchedule'
import '../../style/Calendar.css';



class DoctorCalendar extends React.Component{
  constructor(props){      
    super(props);
    this.state = { idDoc: 0, 
      startPeriod: '', 
      endPeriod: '', 
      events:[], 
      startTime:'', 
      endTime:'',
      idPatient:0,
      namePatient: ""
    };  
    this.setId=this.setId.bind(this);   
  }
  setId(id, name){
    this.setState({
      idPatient : id,
      namePatient: name    
    });
  }

  saveCurrentDayStartEnd(start, end){
    this.setState({
      startPeriod: start,
      endPeriod: end,
      idDoc :1,
      idPatient :11
    })
    console.log(start);
    console.log(end);
    console.log(this.endTime);
    console.log(this.startTime);

  }
    
  saveCurrentTimeStartEnd(start, end){
    this.setState({
      endTime: end,
      startTime: start
    })
  }


  componentDidMount(){
    var _that = this;
    $('#calendar').fullCalendar('changeView', 'agendaDay');
    $(document).ready(function() {
      $('#calendar').fullCalendar({
      eventLimit:true,
      theme: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaDay, agendaWeek, month',
      },
      defaultView: "agendaDay",
      selectable: false,
      selectHelper: true,
      editable: true,
      themeSystem: 'bootstrap4',
      allDaySlot: false,
      lazyFetching: true,
      minTime: '07:00:00',
      blocked: true,
      eventStartEditable : false,
      droppable : false,
    
      viewRender: function(view){
        var view = $('#calendar').fullCalendar('getView');
        localStorage.setItem("startPeriod", view.intervalStart.format())
        localStorage.setItem("endPeriod", view.intervalEnd.format())
        _that.saveCurrentDayStartEnd(view.intervalStart.format(), view.intervalEnd.format())
      },
      
      eventClick: function(event, jsEvent, view ) {
        if (event.selectable) {          
          $("#modButton").trigger("click");
        } else {
          _that.saveCurrentTimeStartEnd(event.start._i, event.end._i); 
          _that.setId(event.patientId, event.patientName);
          //this.setState({idPatient : event.idPatient});
          $("#blockClickButton").trigger("click");
        }
      }, 
    }) 
  });
}

  addEvents(newEvents, isMonth){
    var events
    newEvents.map(event => {
      $($('#calendar').fullCalendar('getView').el[0]).find('.fc-day[data-date=' + event.start.slice(0, 10)+ ']');
      })
    $('#calendar').fullCalendar('addEventSource', newEvents);       
  }

  shouldComponentUpdate(nextProps, nextState) {
    return ((this.state.startPeriod!== nextState.startPeriod) 
    || (this.state.endPeriod!== nextState.endPeriod) 
    || (this.state.idDoc!== nextState.idDoc) 
    || (this.state.startTime!== nextState.startTime) 
    || (this.state.endTime!== nextState.endTime) 
    || (this.state.idPatient!== nextState.idPatient) 
    || (this.state.namePatient!== nextState.namePatient) );       
  }


  componentWillUpdate(nextProps, nextState){
    var getData = (this.state.startPeriod!== nextState.startPeriod) 
    || (this.state.endPeriod!== nextState.endPeriod) 
    || (this.state.idDoc!== nextState.idDoc); 
    if(getData){
      $('#calendar').fullCalendar( 'removeEvents');
      var isMonth;
      if($('#calendar').fullCalendar('getView').name=='month')
        isMonth = true;
      else 
        isMonth = false;
      axios.get(localStorage.getItem("server_url")+'/DoctorEventsForDoctor/' + nextState.idDoc +'/' + nextState.startPeriod+'/' + nextState.endPeriod)
      .then(response => {
        var col;
        var building = $.map(response.data, function(event){
          var isSelectable = false;
          if($('#calendar').fullCalendar('getView').name=='month')
          {
            if(event.isFake){
              col = 'green';
            }else {
              col = 'red';
            }  
            return{
              start: event.dateTime[0],
              end: event.dateTime[0],            
              selectable: isSelectable,
              rendering: 'background',
              color : col,               
            }
            
          }else {

            if(event.isFake){
              col = 'green';
              isSelectable = true;
            }else {
              col = 'red';
              isSelectable = false;
              patientName : event.PatientName;
              patientId : event.PatientId;
            }
            return{
              start: event.dateTime[0]+'T'+event.dateTime[1],
              end: event.dateTime[0]+'T'+event.dateTime[2],
              color : col, 
              selectable: isSelectable,
              title : event.PatientName,
              patientId : event.PatientId,
              patientName : event.PatientName
            }
          }
        })        
        this.addEvents(building, isMonth);   
      })
    }
  }

    render(){      
      let content;
        content = 
      <div>
        <div className="row justify-content-center">
        <div className="col-sm-11 col-md-10 mt-5" id = "calendarDiv">
        <div id = "calendar">
          <button data-toggle="modal" data-target="#mModal" id = "modButton" style={{display: "none"}}>
          </button>
          <button data-toggle="modal" data-target="#BlockClickModal" id = "blockClickButton" style={{display: "none"}}>
          </button>
        </div>
        </div>
        </div>
        <div className="modal fade" id="mModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              <h4 className="modal-title" id="mModalLabel">This session is free.</h4>
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Cancel</span></button> 
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>

        <InfoSchedule idPatient={this.state.idPatient} namePatient={this.state.namePatient}/>
      </div>
      return <div>{content}</div>
    }
  }

  export default DoctorCalendar;