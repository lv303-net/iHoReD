import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import axios from 'axios';
import { months } from 'moment';
var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

/*$(document).ready(function() {
$('#calendar').fullCalendar({
    dayClick: function(date, jsEvent, view) {
  
      alert('Clicked on: ' + date.format());
  
      alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
  
      alert('Current view: ' + view.name);
  
      // change the day's background color just for fun
      $(this).css('background-color', 'red');
  
    }
  });
});*/

class Calendar extends Component {
    constructor(props){      
      super(props);
      this.state = { idDoc: 1};     
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      return {
        idDoc: nextProps.idDoctor,
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      console.log(nextProps.idDoctor);
      console.log(this.props.idDoctor);
      return (this.state.idDoc !== nextState.idDoc); 
    }

    addEvent(newstart, newend, newallday) {
        var event={
        //title  : newtitle,
        start  : newstart,
        end  : newend,
        allDay : newallday // will make the time show
    };
        $('#calendar').fullCalendar( 'renderEvent', event, true);
    }
    getRules(){
    axios.get(server_url+'/GetDoctorSchedule/' + this.state.idDoc)
        .then(response => {
            response.data.forEach(startEndTime => {
               //doctor.FirstName + ' ' + doctor.LastName + '</a>';
               this.addEvent(startEndTime[0], startEndTime[1], false);
            });
        });
      }
    
    componentDidMount(){
        
      const { calendar } = this.refs;

      $(document).ready(function() {
        // page is ready
        
        $('#calendar').fullCalendar({

            // enable theme
        eventLimit:true,

        theme: true,
        // emphasizes business hours
        businessHours: true,
        // event dragging & resizing
        editable: true,
        // header
        header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
        },
        
        selectable: true,
        selectHelper: true,
        editable: true,
        viewRender: function(view)
        {
            var view = $('#calendar').fullCalendar('getView');
            //alert("The view's title is " + view.intervalStart.format() + 'T00:00:00'+ ' ' + view.intervalEnd.format() + 'T00:00:00'+ ' '); 
            
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
                true // stick the event
            );
            
            $('#calendar').fullCalendar('unselect');
             
        },
        events: [
          {
            title  : 'Conference',
            start  : '2018-04-22T20:30:00',
            end    : '2018-04-23T23:30:00',
          }
        ]
        
        })
      });
    }

    render() {
      this.getRules();
      return (
        <div id='calendar'></div>
        
      );
    }
  
  }

export default Calendar;