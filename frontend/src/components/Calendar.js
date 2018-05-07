import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import validator from 'validator';
import axios from 'axios';
import '../style/Calendar.css';
import Loader from 'react-loader';
import { isNull } from 'util';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class Calendar extends React.Component{
  constructor(props){      
    super(props);
    this.state = { idDoc: 0, 
      startPeriod: '', 
      endPeriod: '', 
      events:[], 
      startTime:'', 
      endTime:''};  
    this.handleSubmitBooking=this.handleSubmitBooking.bind(this);   
  }

  handleSubmitBooking() {
    var bookingEvent = {
      IdDoctor: this.state.idDoc,
      IdPatient: localStorage.getItem("currentUserId"),
      startDateTime: this.state.startTime,
      endDateTime:this.state.endTime
    }  

    axios.post(server_url + '/api/Schedule', bookingEvent);
  }

  saveCurrentDayStartEnd(start, end){
    var url_string = window.location.href;
    var url = new URL(url_string);
    this.setState({
      startPeriod: start,
      endPeriod: end
    })
    if (url.search != '') { 
      var Doctor = url.searchParams.get("doc");
      this.setState({
        idDoc :Doctor
      })
    }
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

      select: function(start, end) {
        end =  $.fullCalendar.moment(start);
        end.add(30, 'minutes');
        $('#calendar').fullCalendar('renderEvent',
        {
          start: start,
          end: end,
          allDay: false,
          },
          true 
        );
        $('#calendar').fullCalendar('unselect');
      },
      
      eventClick: function(event, jsEvent, view ) {
        // need button because issue related with opening modal from fullcalendar
        if (event.selectable) {
          if(localStorage.getItem("currentUserFirstName") !== null)
          {
            _that.saveCurrentTimeStartEnd(event.start._i, event.end._i);  
            $("#modButton").trigger("click");
          }else{
            $("#preventUnauthorizedBookingButton").trigger("click");
          }

        } else {
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
    return ((this.state.startPeriod!== nextState.startPeriod) || (this.state.endPeriod!== nextState.endPeriod) 
    || (this.props.idDoctor!== nextProps.idDoctor) || (this.state.startTime!== nextState.startTime) || (this.state.endTime!== nextState.endTime) );       
  }

  componentWillUpdate(nextProps, nextState){
    var getData = (this.state.startPeriod!== nextState.startPeriod) ||(this.state.endPeriod!== nextState.endPeriod) || (this.props.idDoctor!== nextProps.idDoctor); 
    if(getData){
      $('#calendar').fullCalendar( 'removeEvents');
      var isMonth;
      if($('#calendar').fullCalendar('getView').name=='month')
        isMonth = true;
      else 
        isMonth = false;
      axios.get(server_url+'/DoctorEvents/' + nextProps.idDoctor +'/' + nextState.startPeriod+'/' + nextState.endPeriod)
      .then(response => {
        var col;
        var building = $.map(response.data, function(event){
          var isSelectable = false;
          if($('#calendar').fullCalendar('getView').name=='month')
          {
            event.isFake?col = 'green': col = 'red';
            return{
              start: event.dateTime[0],
              end: event.dateTime[0],            
              rendering: 'background',
              color : col, 
            }
            
          }else {
            event.isFake ? (col = 'green', isSelectable = true):(col = 'red', isSelectable = false);
            if(new Date(event.dateTime[0]+'T'+event.dateTime[1]) < (new Date()))
            {
              return{
                start: event.dateTime[0]+'T'+event.dateTime[1],
                end: event.dateTime[0]+'T'+event.dateTime[2],
                rendering: 'background',
                color : col, 
              }
            }else{
              return{
                start: event.dateTime[0]+'T'+event.dateTime[1],
                end: event.dateTime[0]+'T'+event.dateTime[2],
                selectable: isSelectable,
                color : col, 
              }
             }

          }
        })
        this.addEvents(building, isMonth);   
      })
    }
  }

    render(){
      var doctor
      doctor = $("#doc"+this.state.idDoc).text();
      console.log(doctor);
      
      let content;
        content = 
      <div>
        <div id = "calendar">
          <button data-toggle="modal" data-target="#mModal" id = "modButton" style={{display: "none"}}>
          </button>
          <button data-toggle="modal" data-target="#BlockClickModal" id = "blockClickButton" style={{display: "none"}}>
          </button>
          <button data-toggle="modal" data-target="#ModalToPreventUnauthorizedBooking" id = "preventUnauthorizedBookingButton" style={{display: "none"}}>
          </button>
        </div>
        <div className="modal fade" id="mModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              <h4 className="modal-title" id="mModalLabel">Confirm Your booking</h4>
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Cancel</span></button> 
              </div>
              <div className="modal-body">
                Doctor - {$("#doc"+this.state.idDoc).text()}<br/>
                Date - {this.state.startTime.slice(0, 10)}<br/>
                Start - {this.state.startTime.slice(-8)}<br/>
                End - {this.state.endTime.slice(-8)}<br/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-info btn-lg" data-dismiss="modal" onClick={() =>{this.handleSubmitBooking()}}>Confirm</button>
                <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>

         <div className="modal fade" id="BlockClickModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              <h4 className="modal-title" id="mModalLabel">This time is not available for booking. Choose another time slot, please.</h4>
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button> 
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-info btn-lg" data-dismiss="modal">Ok</button>
              </div>
            </div>
          </div>
        </div>

         <div className="modal fade" id="ModalToPreventUnauthorizedBooking">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              <h4 className="modal-title" id="mModalLabel">Booking is available only for authorized users. Please, sign up or sign in.</h4>
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button> 
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-info btn-lg" data-dismiss="modal">Ok</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      return <div>{content}</div>
    }
  }

  export default Calendar;