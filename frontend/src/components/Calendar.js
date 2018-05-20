import React from 'react';
import $ from 'jquery';
import 'fullcalendar';
import axios from 'axios';
import '../style/Calendar.css';

class Calendar extends React.Component{
  constructor(props){      
    super(props);
    this.state = { idDoc: 0, 
      startPeriod: '', 
      endPeriod: '', 
      startTime:'', 
      endTime:'',
      shouldUpdate: 1,
      bookingModalMessage: 'This time is not available for booking. Choose another time slot, please.'
    };  
    this.handleSubmitBooking=this.handleSubmitBooking.bind(this);   
  }

  handleCloseModal()
  {
    this.setState({
      bookingModalMessage: 'This time is not available for booking. Choose another time slot, please.'
    })
  }

  handleSubmitBooking() {
    var bookingEvent = {
      IdDoctor: this.state.idDoc,
      IdPatient: localStorage.getItem("currentUserId"),
      startDateTime: this.state.startTime,
      endDateTime:this.state.endTime      
    }   
    axios({
      method: 'post',
      url: localStorage.getItem("server_url") + '/api/Schedule',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
      },
      data: JSON.stringify(bookingEvent)
    })
    .then((response => {
      // 1 - booking went fine
      // 0 - booking is outdated (start time <= now)
      // -1 - doctor already has event on that time slot
      // -2 - patient already has event on that time slot
      // -3 - doctor and patient is the same person
      // -4 - start time >= end tame

      var message
      switch (response.data) {
        case 0:
              message = "Booking is outdated.";
            break;
        case 1:
            message = "You have successfully booked.";
            break;
        case -1:
            message = "Sorry, this time slot is not available for booking anymore. Choose another one, please.";
            break;
        case -2:
            message = "Sorry, You have allready booked this time slot to an another doctor. Choose another one, please.";
            break;
        case -3:
            message = "This booking is not availible for You.";
            break;
        }
      this.setState({
        bookingModalMessage: message
      })
      $("#bookingInfoModalButton").trigger("click");
      this.setState({
        shouldUpdate: this.state.shouldUpdate + 1
      }) 
    }))
    
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
  
  setStateIdDoc(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var Doctor = url.searchParams.get("doc");
    this.setState({
      idDoc :Doctor
    })
  }

  componentWillMount(){
    this.setStateIdDoc();
  }

  componentDidMount(){
    this.setStateIdDoc();
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
      editable: false,
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
          $("#bookingInfoModalButton").trigger("click");
        }
      }, 
    }) 
  });
}

  addEvents(newEvents, isMonth){
    newEvents.map(event => {
      $($('#calendar').fullCalendar('getView').el[0]).find('.fc-day[data-date=' + event.start.slice(0, 10)+ ']');
      })
    $('#calendar').fullCalendar('addEventSource', newEvents);       
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (( this.state!==nextState)
    || (this.props.idDoctor!==nextProps.idDoctor));       
  }

  componentWillUpdate(nextProps, nextState){
    if( (this.state.shouldUpdate===nextState.shouldUpdate && (this.state.idDoc!== nextState.idDoc)) || (this.props.idDoctor!==nextProps.idDoctor))
      {
         this.setStateIdDoc();

      }
    var getData = (((this.state.startPeriod!== nextState.startPeriod) ||
                  (this.state.endPeriod!== nextState.endPeriod) || 
                  (this.state.idDoc!== nextState.idDoc) || 
                  (this.state.shouldUpdate!==nextState.shouldUpdate)) &&
                  (nextState.idDoc != null)); 
    if(getData){
      $('#calendar').fullCalendar( 'removeEvents');
      var isMonth;
      if($('#calendar').fullCalendar('getView').name === 'month')
        isMonth = true;
      else 
        isMonth = false;
      axios({
        method: 'get',
        url: localStorage.getItem("server_url")+'/DoctorEvents/' + nextState.idDoc +'/' + nextState.startPeriod+'/' + nextState.endPeriod,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        }
    })
      .then(response => {
        var col;
        var building = $.map(response.data, function(event){
          var isSelectable = false;
          if($('#calendar').fullCalendar('getView').name==='month')
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
            if(new Date(event.dateTime[0]+'T'+event.dateTime[1]) <= (new Date()))
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
      var doctor;
      doctor = $("#doc"+this.state.idDoc).text();
      if($('#nameDoc').text()==="")
        doctor = $("#doc"+this.state.idDoc).text();
      else
        doctor = $("#nameDoc").text();
      
      return (<div>
        <div id = "calendar">
          <button data-toggle="modal" data-target="#confirmModal" id = "modButton" style={{display: "none"}}>
          </button>
          <button data-toggle="modal" data-target="#BookingInfoModal" id = "bookingInfoModalButton" style={{display: "none"}}>
          </button>
          <button data-toggle="modal" data-target="#ModalToPreventUnauthorizedBooking" id = "preventUnauthorizedBookingButton" style={{display: "none"}}>
          </button>
        </div>
        <div className="modal fade" id="confirmModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              <h4 className="modal-title" id="mModalLabel">Confirm Your booking</h4>
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Cancel</span></button> 
              </div>
              <div className="modal-body">
                Doctor - {doctor}<br/>
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

         <div className="modal fade" id="BookingInfoModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              <h4 className="modal-title" id="mModalLabel">{this.state.bookingModalMessage}</h4>
                <button type="button" className="close" data-dismiss="modal" onClick={() =>{this.handleCloseModal()}}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button> 
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-info btn-lg" data-dismiss="modal" onClick={() =>{this.handleCloseModal()}}>Ok</button>
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
      </div>)
    }
  }

  export default Calendar;