import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import validator from 'validator';
import axios from 'axios'import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import validator from 'validator';
import axios from 'axios';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class Calendar extends React.Component{
    constructor(props){      
      super(props);
      this.state = { idDoc: 0, startPeriod: '', endPeriod: '', events:[], startTime:'', endTime:''};  
      $(document).on("VadikKrasava", this.showModal);
      $( "p" ).on( "myCustomEvent", function( event, myName ) {
        $( this ).text( myName + ", hi there!" );
        $( "span" )
          .stop()
          .css( "opacity", 1 )
          .text( "myName = " + myName )
          .fadeIn( 30 )
          .fadeOut( 1000 );
      });
    }

    saveCurrentDayStartEnd(start, end)
    {
      console.log(window.location.pathname + ' ' + window.location.host.slice(-1));
        var url_string = window.location.href;//"http://localhost:3000/?a=1&b=3&idDoctor=2"; //window.location.href
        var url = new URL(url_string);
        var Doctor = url.searchParams.get("doc");
        console.log(this.state.idDoc);
        console.log(Doctor);
        console.log(window.location.href);
        this.setState({
          idDoc :Doctor
        })
      this.setState({
        startPeriod: start,
        endPeriod: end,
        //idDoc : this.props.idDoctor
        idDoc :Doctor
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
        businessHours: true,
        editable: true,
        //color: '#FF0000', backgroundColor: '#000000' ,
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
            //$('#calendar').fullCalendar('unselect');
        },
        
        eventClick: function(event, jsEvent, view ) {
          // need button because issue related with opening modal from fullcalendar
          $("#modButton").trigger("click");
          console.log(event.start._i);
          console.log(event.end._i);
          localStorage.setItem("starTime", event.start._i);
          localStorage.setItem("endTime", event.end._i);
          // __that.setState({
          //   starttime: event.start._i,
          //   endTime: event.end._i,
          // })
          //$('#mModal').modal("show"); 
          //$( "p" ).trigger( "myCustomEvent", [ "John" ] );
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
        //return (this.props.idDoctor!== nextProps.idDoctor || (this.state.startPeriod!== nextState.startPeriod) || (this.state.endPeriod!== nextState.endPeriod)); 
        return ((this.state.startPeriod!== nextState.startPeriod) || (this.state.endPeriod!== nextState.endPeriod));       
      }

      componentWillUpdate(nextProps, nextState)
      {
        // console.log(window.location.pathname + ' ' + window.location.host.slice(-1));
        // var url_string = "http://localhost:3000/?a=1&b=3&idDoctor=1"; //window.location.href
        // var url = new URL(url_string);
        // var Doctor = url.searchParams.get("idDoctor");
        // console.log(Doctor);
        // this.setState({
        //   idDoc :Doctor
        // })
        console.log(this.state.idDoc);
        $('#calendar').fullCalendar( 'removeEvents');
        var isMonth;
        if($('#calendar').fullCalendar('getView').name=='month')
          isMonth = true;
        else 
          isMonth = false;
        axios.get(server_url+'/DoctorEvents/' + nextState.idDoc +'/' + nextState.startPeriod+'/' + nextState.endPeriod)
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
      return  (
        <div>
        <div id = "calendar">
        {/* need button because issue related with opening modal from fullcalendar */}
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
                DoctorId - {this.state.idDoc}
                Start - {this.state.startTime}
                End - {console.log(localStorage.getItem("endTime"))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-info btn-lg">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        </div>
                  );
  }
  }

  export default Calendar;
import Modal from'./BookingModal';
import modal from'jquery-modal';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class Calendar extends React.Component{
    constructor(props){      
      super(props);
      this.state = { idDoc: 0, startPeriod: '', endPeriod: '', events:[], isOpen: false};  
    }

    save(start, end)
    {
      this.setState({
        startPeriod: start,
        endPeriod: end,
        idDoc : this.props.idDoctor
      })
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
        businessHours: true,
        editable: true,
        //color: '#FF0000', backgroundColor: '#000000' ,import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import validator from 'validator';
import axios from 'axios';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class Calendar extends React.Component{
    constructor(props){      
      super(props);
      this.state = { idDoc: 0, startPeriod: '', endPeriod: '', events:[], startTime:'', endTime:''};  
      $(document).on("VadikKrasava", this.showModal);
      $( "p" ).on( "myCustomEvent", function( event, myName ) {
        $( this ).text( myName + ", hi there!" );
        $( "span" )
          .stop()
          .css( "opacity", 1 )
          .text( "myName = " + myName )
          .fadeIn( 30 )
          .fadeOut( 1000 );
      });
    }

    saveCurrentDayStartEnd(start, end)
    {
      console.log(window.location.pathname + ' ' + window.location.host.slice(-1));
        var url_string = window.location.href;//"http://localhost:3000/?a=1&b=3&idDoctor=2"; //window.location.href
        var url = new URL(url_string);
        var Doctor = url.searchParams.get("doc");
        console.log(this.state.idDoc);
        console.log(Doctor);
        console.log(window.location.href);
        this.setState({
          idDoc :Doctor
        })
      this.setState({
        startPeriod: start,
        endPeriod: end,
        //idDoc : this.props.idDoctor
        idDoc :Doctor
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
        businessHours: true,
        editable: true,
        //color: '#FF0000', backgroundColor: '#000000' ,
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
            //$('#calendar').fullCalendar('unselect');
        },
        
        eventClick: function(event, jsEvent, view ) {
          // need button because issue related with opening modal from fullcalendar
          $("#modButton").trigger("click");
          console.log(event.start._i);
          console.log(event.end._i);
          localStorage.setItem("starTime", event.start._i);
          localStorage.setItem("endTime", event.end._i);
          // __that.setState({
          //   starttime: event.start._i,
          //   endTime: event.end._i,
          // })
          //$('#mModal').modal("show"); 
          //$( "p" ).trigger( "myCustomEvent", [ "John" ] );
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
        //return (this.props.idDoctor!== nextProps.idDoctor || (this.state.startPeriod!== nextState.startPeriod) || (this.state.endPeriod!== nextState.endPeriod)); 
        return ((this.state.startPeriod!== nextState.startPeriod) || (this.state.endPeriod!== nextState.endPeriod));       
      }

      componentWillUpdate(nextProps, nextState)
      {
        // console.log(window.location.pathname + ' ' + window.location.host.slice(-1));
        // var url_string = "http://localhost:3000/?a=1&b=3&idDoctor=1"; //window.location.href
        // var url = new URL(url_string);
        // var Doctor = url.searchParams.get("idDoctor");
        // console.log(Doctor);
        // this.setState({
        //   idDoc :Doctor
        // })
        console.log(this.state.idDoc);
        $('#calendar').fullCalendar( 'removeEvents');
        var isMonth;
        if($('#calendar').fullCalendar('getView').name=='month')
          isMonth = true;
        else 
          isMonth = false;
        axios.get(server_url+'/DoctorEvents/' + nextState.idDoc +'/' + nextState.startPeriod+'/' + nextState.endPeriod)
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
      return  (
        <div>
        <div id = "calendar">
        {/* need button because issue related with opening modal from fullcalendar */}
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
                DoctorId - {this.state.idDoc}
                Start - {this.state.startTime}
                End - {console.log(localStorage.getItem("endTime"))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-info btn-lg">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        </div>
                  );
  }
  }

  export default Calendar;
        header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaDay,agendaWeek,month',
        },import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
import 'fullcalendar';
import validator from 'validator';
import axios from 'axios';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class Calendar extends React.Component{
    constructor(props){      
      super(props);
      this.state = { idDoc: 0, startPeriod: '', endPeriod: '', events:[], startTime:'', endTime:''};  
      $(document).on("VadikKrasava", this.showModal);
      $( "p" ).on( "myCustomEvent", function( event, myName ) {
        $( this ).text( myName + ", hi there!" );
        $( "span" )
          .stop()
          .css( "opacity", 1 )
          .text( "myName = " + myName )
          .fadeIn( 30 )
          .fadeOut( 1000 );
      });
    }

    saveCurrentDayStartEnd(start, end)
    {
      console.log(window.location.pathname + ' ' + window.location.host.slice(-1));
        var url_string = window.location.href;//"http://localhost:3000/?a=1&b=3&idDoctor=2"; //window.location.href
        var url = new URL(url_string);
        var Doctor = url.searchParams.get("doc");
        console.log(this.state.idDoc);
        console.log(Doctor);
        console.log(window.location.href);
        this.setState({
          idDoc :Doctor
        })
      this.setState({
        startPeriod: start,
        endPeriod: end,
        //idDoc : this.props.idDoctor
        idDoc :Doctor
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
        businessHours: true,
        editable: true,
        //color: '#FF0000', backgroundColor: '#000000' ,
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
            //$('#calendar').fullCalendar('unselect');
        },
        
        eventClick: function(event, jsEvent, view ) {
          // need button because issue related with opening modal from fullcalendar
          $("#modButton").trigger("click");
          console.log(event.start._i);
          console.log(event.end._i);
          localStorage.setItem("starTime", event.start._i);
          localStorage.setItem("endTime", event.end._i);
          // __that.setState({
          //   starttime: event.start._i,
          //   endTime: event.end._i,
          // })
          //$('#mModal').modal("show"); 
          //$( "p" ).trigger( "myCustomEvent", [ "John" ] );
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
        //return (this.props.idDoctor!== nextProps.idDoctor || (this.state.startPeriod!== nextState.startPeriod) || (this.state.endPeriod!== nextState.endPeriod)); 
        return ((this.state.startPeriod!== nextState.startPeriod) || (this.state.endPeriod!== nextState.endPeriod));       
      }

      componentWillUpdate(nextProps, nextState)
      {
        // console.log(window.location.pathname + ' ' + window.location.host.slice(-1));
        // var url_string = "http://localhost:3000/?a=1&b=3&idDoctor=1"; //window.location.href
        // var url = new URL(url_string);
        // var Doctor = url.searchParams.get("idDoctor");
        // console.log(Doctor);
        // this.setState({
        //   idDoc :Doctor
        // })
        console.log(this.state.idDoc);
        $('#calendar').fullCalendar( 'removeEvents');
        var isMonth;
        if($('#calendar').fullCalendar('getView').name=='month')
          isMonth = true;
        else 
          isMonth = false;
        axios.get(server_url+'/DoctorEvents/' + nextState.idDoc +'/' + nextState.startPeriod+'/' + nextState.endPeriod)
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
      return  (
        <div>
        <div id = "calendar">
        {/* need button because issue related with opening modal from fullcalendar */}
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
                DoctorId - {this.state.idDoc}
                Start - {this.state.startTime}
                End - {console.log(localStorage.getItem("endTime"))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-info btn-lg">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        </div>
                  );
  }
  }

  export default Calendar;
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
        
        eventClick: function(event, jsEvent, view ) {
          // Display the modal and set the values to the event values.
          //_that.mod();
          //$('#myModal').show(); 
          //(<any>$("#mModal")).modal("show");
          $('#mModal').modal("show");
          //8_that.mod();
          // $('.modal').find('#title').val(event.title);
          // $('.modal').find('#starts-at').val(event.start);
          // $('.modal').find('#ends-at').val(event.end);
          //(<any>$("#AAAA")).modal("show");
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
      return  (
        <div id = "calendar">
          {/* <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#mModal">
            Launch demo modal
          </button> */}
          <div className="modal fade" id="mModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                  <h4 className="modal-title" id="myModalLabel">Modal title</h4>
                </div>
                <div className="modal-body">
                  ...
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
          </div>
                  );
  }
  }

  export default Calendar;
