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
        endPeriod: end
      })
    }

    componentDidMount()
    {
      var _that = this;
      $(document).ready(function() {
        $('#calendar').fullCalendar({
        eventLimit:true,
        theme: true,
        businessHours: true,
        editable: true,
        header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaDay,agendaWeek,month'
        },
        selectable: true,
        selectHelper: true,
        editable: true,
        
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
        
            $('#calendar').fullCalendar('unselect');
        },
         
        })
        
      });
    }

      addEvent(newstart, newend) {
        var event={
        start  : newstart,
        end  : newend
      };
        $('#calendar').fullCalendar( 'renderEvent', event, true);
    }
      shouldComponentUpdate(nextProps, nextState) {
        return (this.props.idDoctor!== nextProps.idDoctor || (this.state.startPeriod!== nextState.startPeriod) || (this.state.endPeriod!== nextState.endPeriod)); 
      }

      componentWillUpdate(nextProps, nextState)
      {
        axios.get(server_url+'/DoctorEvents/' + this.props.idDoctor +'/' + this.state.startPeriod+'/' + this.state.endPeriod)
        .then(response => {
            this.setState({
              events: response.data
            })
            });
      }

    render(){
      return  (<div id = "calendar"> 
                {this.state.events.map(event => {this.addEvent(event[0]+'T'+event[1], event[0]+'T'+event[2])})}
              </div>
                  );
  }
  }

  export default Calendar;