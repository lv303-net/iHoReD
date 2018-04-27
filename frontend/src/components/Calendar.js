import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import axios from 'axios';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class Calendar extends React.Component{
    constructor(props){      
      super(props);
      this.state = { idDoc: 0, startPeriod: '', endPeriod: '', events:[]};  
    }

    save(start, end)
    {
      this.setState({
        startPeriod: start,
        endPeriod: end,
        idDoc : this.props.idDoctor
      })
    }

    componentDidMount()
    {
      var _that = this;
      $('#calendar').fullCalendar('changeView', 'agendaDay');
      $(document).ready(function() {
        $('#calendar').fullCalendar({
        eventLimit:true,
        theme: true,
        businessHours: true,
        editable: true,
        header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaDay,agendaWeek,month',
        },
        defaultView: "agendaDay",
        selectable: true,
        selectHelper: true,
        editable: true,
        themeSystem: 'bootstrap4',
        events: [ // put the array in the `events` property
            {
                title  : 'event1',
                start  : '2018-04-29',
                allDay: true
            }
          ],
        viewRender: function(view)
        {
            var view = $('#calendar').fullCalendar('getView');
            localStorage.setItem("startPeriod", view.intervalStart.format())
            localStorage.setItem("endPeriod", view.intervalEnd.format())
            _that.save(view.intervalStart.format(), view.intervalEnd.format())
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
            //$('#calendar').fullCalendar('unselect');
        },
        
        

        eventClick: function(calEvent, jsEvent, view) {
          alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
          // change the border color just for fun
          $(this).css('background', 'red');
        },
        
        }) 
      });
    }

      addEvent(newstart, newend, isMonth) {
        var event
        if(isMonth)
        {
          $($('#calendar').fullCalendar('getView').el[0]).find('.fc-day[data-date=' + newstart.slice(0, 10)+ ']').css('background-color', 'red');
        }
          
        else
        {
          event={
            start  : newstart,
            end  : newend,
            eventColor : "green"
          };
          $('#calendar').fullCalendar( 'renderEvent', event, true);
        }    
    }
      shouldComponentUpdate(nextProps, nextState) {
        return (this.props.idDoctor!== nextProps.idDoctor || (this.state.startPeriod!== nextState.startPeriod) || (this.state.endPeriod!== nextState.endPeriod)); 
      }

      componentWillUpdate(nextProps, nextState)
      {
        console.log(window.location.pathname + ' ' + window.location.host.slice(-1));

        $('#calendar').fullCalendar( 'removeEvents');
        var isMonth;
        if($('#calendar').fullCalendar('getView').name=='month')
          isMonth = true;
        else 
          isMonth = false;
        axios.get(server_url+'/DoctorEvents/' + nextProps.idDoctor +'/' + nextState.startPeriod+'/' + nextState.endPeriod)
        .then(response => {
            // this.setState({
            //   events: response.data
            // })
            response.data.map(event => {this.addEvent(event[0]+'T'+event[1], event[0]+'T'+event[2], isMonth)})
            // response.data.map(event => { var e={
            //   start  : event[0]+'T'+event[1],
            //   end  : event[0]+'T'+event[2],
            //   allDay: isAllDay
            // }
            //   $('#calendar').fullCalendar( 'renderEvent', e, true)})
            });
      }

    render(){
      return  (<div id = "calendar"> 
              </div>
                  );
  }
  }

  export default Calendar;
