import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import validator from 'validator';
import axios from 'axios';
import '../style/Calendar.css';
import Loader from 'react-loader';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class Calendar extends React.Component{
    constructor(props){      
      super(props);
      this.state = { idDoc: 0, startPeriod: '', endPeriod: '', events:[], startTime:'', endTime:'', loading: false};  
      this.handleSubmitBooking=this.handleSubmitBooking.bind(this);
    }

    handleSubmitBooking() {
      var bookingEvent = {
        IdDoctor: this.state.idDoc,
        IdPatient: localStorage.getItem("currentUserId"),
        startDateTime: this.state.startTime,
        endDateTime:this.state.endTime
      }
  
        axios.post(server_url + '/api/Schedule',bookingEvent);
      }

    saveCurrentDayStartEnd(start, end)
    {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var Doctor = url.searchParams.get("doc");

      this.setState({
        startPeriod: start,
        endPeriod: end,
        idDoc :Doctor
      })
    }
    
    saveCurrentTimeStartEnd(start, end)
    {
      this.setState({
        endTime: end,
        startTime: start
      })
    }

    showModal(){
      $('#SignInModal').modal("show");
    }
    toggleModal = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    mod(){
      return {
        __html: '<Modal/>'
      }
    }
    componentDidMount()
    {
      var _that = this;
      
      $('#calendar').fullCalendar('changeView', 'agendaDay');
      $(document).ready(function() {
        $('#calendar').fullCalendar({
        eventLimit:true,
        theme: true,
        //color: '#FF0000', backgroundColor: '#000000' ,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'agendaDay, agendaWeek, month',
        },
        defaultView: "agendaDay",
        selectHelper: true,
        editable: true,
        themeSystem: 'bootstrap4',
        allDaySlot: false,
        lazyFetching: true,
        minTime: '07:00:00',
        blocked: true,
        loading: function(isLoading, view) {
          if (isLoading) {
              alert(isLoading);
          } else {
              alert(isLoading);
          }
        },
        events: [ // put the array in the `events` property
            {
              title: '',
              backgroundColor: "gray", 
              blocked: true,
            }
          ],
        
        viewRender: function(view)
        {
            var view = $('#calendar').fullCalendar('getView');
            localStorage.setItem("startPeriod", view.intervalStart.format())
            localStorage.setItem("endPeriod", view.intervalEnd.format())
            _that.saveCurrentDayStartEnd(view.intervalStart.format(), view.intervalEnd.format())
          },

        select: function(start, end) {
            end =  $.fullCalendar.moment(start);
            end.add(30, 'minutes');
            alert('Clicked on: ' + start.format() + 'to' + end.format());
            $('#calendar').fullCalendar('renderEvent',
            {
                start: start,
                end: end,
                allDay: false
                },
                true 
            );
            $('#calendar').fullCalendar('unselect');
        },
        
        eventClick: function(event, jsEvent, view ) {
          // need button because issue related with opening modal from fullcalendar
            if (jsEvent.blocked == true) {
                alert("This time is not available!");
            } else {
            
            console.log(event.start._i);
            console.log(event.end._i);
            _that.saveCurrentTimeStartEnd(event.start._i, event.end._i);
            
            $("#modButton").trigger("click");
            }
      }, 
        }) 
      });
    }

    addEvents(newEvents, isMonth)
    {
      if(isMonth)
        {
          newEvents.map(event => {
          $($('#calendar').fullCalendar('getView').el[0]).find('.fc-day[data-date=' + event.start.slice(0, 10)+ ']').css('background-color', 'red');
        })
      }
      else
         $('#calendar').fullCalendar( 'addEventSource', newEvents);
     }

    //   addEvent(newstart, newend, isMonth) {
    //     var event
    //     var dayoff
    //     if(isMonth)
    //     {
    //       $($('#calendar').fullCalendar('getView').el[0]).find('.fc-day[data-date=' + newstart.slice(0, 10)+ ']').css('background-color', 'red');
    //     }
          
    //     else
    //     {
    //       event={
    //         start  : newstart,
    //         end  : newend,
    //         color : "green",
    //         blocked: false,
    //       };
    //       $('#calendar').fullCalendar( 'addEventSource', event);
    //       dayoff={
    //         start: newstart,
    //           end: newend,
    //           rendering: 'inverse-background',
    //           color: "#DCDCDC"
    //       },
         
    //        $('#calendar').fullCalendar( 'addEventSource', dayoff);
    //     }    
    // }
      shouldComponentUpdate(nextProps, nextState) {
        return ((this.state.startPeriod!== nextState.startPeriod) || (this.state.endPeriod!== nextState.endPeriod) 
        || (this.state.idDoc!== nextState.idDoc) || (this.state.startTime!== nextState.startTime) || (this.state.endTime!== nextState.endTime) );       
      }

      componentWillUpdate(nextProps, nextState)
      {
        var getData = (this.state.startPeriod!== nextState.startPeriod) ||(this.state.endPeriod!== nextState.endPeriod) || (this.state.idDoc!== nextState.idDoc); 
          if(getData)
          {      
          console.log(this.state.idDoc);
          $('#calendar').fullCalendar( 'removeEvents');
          var isMonth;
          if($('#calendar').fullCalendar('getView').name=='month')
            isMonth = true;
          else 
            isMonth = false;
          axios.get(server_url+'/DoctorEvents/' + nextState.idDoc +'/' + nextState.startPeriod+'/' + nextState.endPeriod)
          .then(response => {
            var col;
            if(isMonth)
              col="red"
            else 
            col = 'green'
            var building = $.map(response.data, function(event)
          {
            
            return{
              start: event[0]+'T'+event[1],
              end: event[0]+'T'+event[2],
              color : col
            }
          })
          console.log(building);
          this.addEvents(building, isMonth);   
          })
      }
    }

    render(){
      let content;
        content = 
        <div>
        <div id = "calendar">
          <button data-toggle="modal" data-target="#mModal" id = "modButton" style={{display: "none"}}>
          </button>
          </div>
          <div className="modal fade" id="mModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              <h4 className="modal-title" id="mModalLabel">Confirm your booking</h4>
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button> 
              </div>
              <div className="modal-body">
                DoctorId - {this.state.idDoc}<br/>
                Start - {this.state.startTime}<br/>
                End - {this.state.endTime}<br/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-info btn-lg" data-dismiss="modal" onClick={() =>{this.handleSubmitBooking()}}>Confirm booking</button>
              </div>
          </div>
        </div>
        </div>
        </div>
          return <div>{content}</div>
  }
  }

  export default Calendar;
