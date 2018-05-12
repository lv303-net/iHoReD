import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DayReport from './DayReport'
import $ from 'jquery';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/SalaryReport.css';



class SalaryReport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment().subtract(1,'months').date(1),
      endDate: moment(moment()).subtract(1,'months').endOf('month'),
      salaryData: [],
      days:[],
         };
        var url_string = window.location.href;
        var url = new URL(url_string);
        if (url.search !== '') {
          var startdate = Number(url.searchParams.get("startdate"));
          var enddate = Number(url.searchParams.get("enddate"));
        
          
         axios.get(localStorage.getItem("server_url") + '/DoctorSalaryStatistics/' + this.props.match.params.id + '/' +this.state.startDate.format('YYYY-MM-DD')+ '/' +this.state.endDate.format('YYYY-MM-DD'))
         .then(res => {
           this.setState({
            
            salaryData: res.data     
                })
              });
            }
              else
              { 
                 var searchParameter = new URLSearchParams(window.location.search);
                  searchParameter.set('startdate', this.state.startDate.format('YYYY-MM-DD'));
                  searchParameter.set('enddate', this.state.endDate.format('YYYY-MM-DD'));
                   window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
                  axios.get(localStorage.getItem("server_url")+'/DoctorSalaryStatistics/' + this.props.match.params.id +'/' +startdate+ '/' +enddate)
                  .then(res => {
                       this.setState({     
                        salaryData: res.data   
                       })
                  });
              }     
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleClick = this.handleClick.bind(this);
}
  handleChangeStart(date) {
    this.setState(
      this.setState({
         startDate:date
       })
   );
 }

  handleChangeEnd(date) {
    this.setState({
      endDate:date
    });
   }
   
    handleClick(e){
    e.preventDefault();
    var start =this.state.startDate.format('YYYY-MM-DD');
    var end =this.state.endDate.format('YYYY-MM-DD');

    axios.get(localStorage.getItem("server_url") + '/DoctorSalaryStatistics/' + this.props.match.params.id + '/' + start + '/' + end)
    .then(res => {
      this.setState({
           salaryData: res.data,      
           })
  });
  var url_string = window.location.href;
  var url = new URL(url_string);
  e.preventDefault();
  var searchParameter = new URLSearchParams(window.location.search);
  searchParameter.set('startdate', start);
  searchParameter.set('enddate', end);
  window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
 }
   sumWorkedHours(){
    let array = this.state.salaryData.map(items =>items.map(item=>item.WorkedHours));
    let total=0;
    for(let i=0;i<array.length;i++){
      for(let j=0;j<array[i].length;j++)
      total+=array[i][j];
    }
    return total;
}
averageCoeff(){
  let array = this.state.salaryData.map(items =>items.map(item =>item.SalaryCoefficient));
  let total=0;
  for(let i=0;i<array.length;i++){
    for(let j=0;j<array[i].length;j++)
    total+=array[i][j]/array[i].length;
     }
  return Math.round(total,4);
}
averageRate(){
  let array = this.state.salaryData.map(items =>items.map(item => item.SalaryRate))
  let total=0;
  for(let i=0;i<array.length;i++){
 for(let j=0;j<array[i].length;j++)
 total+=array[i][j]/array[i].length;
  }
  return Math.round(total,4);
}
earnedMoney(){
  let array = this.state.salaryData.map(items =>items.map(item  => item.EarnedMoney))
  let total=0;
  for(let i=0;i<array.length;i++){
    for(let j=0;j<array[i].length;j++)
    total+=array[i][j];
  }
  return total;
}
  render() {

     return (
      <div>
        <div class="panel-body text-center py-5 mx-5">
          <h3 id="name">
            {localStorage.getItem("currentUserFirstName") + "    "} 
            {" " + localStorage.getItem("currentUserLastName")}
          </h3>
        </div>
        <div className="container mt-5">
          <div className="row text-center">
            <div className="col-lg-4 col-md-4 col-12">
              Start Date:
              <DatePicker
                selected={this.state.startDate}        
                selectsStart
                dateFormat="YYYY-MM-DD"
                startDate={this.state.startDate}  
                onChange={this.handleChangeStart}
                maxDate={this.state.endDate}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-12"> End Date:
                 <DatePicker
                selected={this.state.endDate}
                selectsEnd
                dateFormat="YYYY-MM-DD"
                maxDate={moment()}
                minDate={this.state.startDate}
                endDate={this.state.endDate}  
                 onChange={this.handleChangeEnd}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-12 mt-3">
              <button className="btn btn-primary salarybutton" onClick={this.handleClick}>Apply</button>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-12">
                   <div className="row mt-5 mx-1">
                  <div className="col">
                    <div class="row" id="patientcard">
                    <div class="col-6 col-custom-header" id="col-custom">Total sum</div>
                      <div class="col-6" id="col-custom">{this.earnedMoney()}</div>                                   
                    </div>
                    <div class="row" id="patientcard">
                      <div class="col-6 col-custom-header" id="col-custom">Average rate</div>
                      <div class="col-6" id="col-custom">{this.averageRate()}</div>
                    </div>
                    <div class="row" id="patientcard">
                      <div class="col-6 col-custom-header" id="col-custom">Average coefficient</div>
                      <div class="col-6" id="col-custom">{this.averageCoeff()}</div>
                    </div>
                    <div class="row" id="patientcard">
                      <div class="col-6 col-custom-header" id="col-custom">Worked hours</div>
                      <div class="col-6" id="col-custom">{this.sumWorkedHours()}</div>
                    </div>
                  </div>
                </div>
            </div>
            <div className="col-3 mt-5">
              <p><a class="btn btn-primary salarybutton" data-toggle="collapse" id="multiCollapse" href="#multiCollapseExample1" role="button" aria-expanded="false"
                aria-controls="multiCollapseExample1">More details</a></p>
            </div>
          </div>
            <div class="collapse multi-collapse mt-5" id="multiCollapseExample1">
             
              <div id='listProf' className="list-group"> 
                {this.state.salaryData.map(items =>
                 <div className="col-12 mt-5">
                 <p><a class="btn btn-primary salarybutton" data-toggle="collapse" id="multiCollapse" href={'#' + items.toString()} role="button" aria-expanded="false"
                   aria-controls="multiCollapseExample">{items[0].Day.slice(0,7).toString()}</a></p>
                   <div class="collapse multi-collapse mt-5" id={items.toString()}>
              <div class="row" id="patientcard">
                <div class="col-3 col-custom-header" id="col-custom">Date</div>
                <div class="col-2 col-custom-header" id="col-custom">Hours</div>
                <div class="col-2 col-custom-header" id="col-custom">Coeff</div>
                <div class="col-2 col-custom-header" id="col-custom">Rate</div>
                <div class="col-3 col-custom-header" id="col-custom">Total</div>
              </div>
              
               {
                items.map(item=> <DayReport  day={item.Day}
                  workedHours={item.WorkedHours} salaryCoefficient={item.SalaryCoefficient}
                  salaryRate={item.SalaryRate} earnedMoney={item.EarnedMoney}
                />)
                 }
                 </div>
                 </div>
              )}
              </div>
              </div>
        </div>
      </div>

    )
  }
}
export default SalaryReport
