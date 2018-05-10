import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import ProfessionRows from './ProfessionRows';
import AddRateToProfession from './modaldialogs/AddRateToProfession';
import '../../style/Professions.css';

class ProfessionsRatesPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          professionsArr: [],
          id: 0,
          shouldShow: true,
          idDoctor: 0,
          shouldDocBeShown: false
        };
        this.setStateID = this.setStateID.bind(this);
        axios.get(localStorage.getItem("server_url") + '/AllProfessions')
          .then(res => {
            res.data.forEach(profession => {
              const professionsArr = res.data;
              this.setState({
                professionsArr
              })
            });
          });
      };
    
    
      addUrl(val) {
        var searchParameter = new URLSearchParams(window.location.search);
        searchParameter.set('prof', val);
        searchParameter.delete('doc');
        window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
      };
    
      componentDidMount() {
        var url_string = window.location.href;
        var url = new URL(url_string);
        if (url.search !== '') {
          var idProf = url.searchParams.get("prof");
          this.setState({
            id: idProf
          })
        }
      }
    
      // after updating occurs
      componentDidUpdate(prevProps, prevState) {
        if (!prevState.shouldShow) {
          var idForDiv = "#prof" + this.state.id;
          $(idForDiv).addClass("active");
    
        }
      }
      
      componentWillUpdate(nextProps, nextState) {
        let idSt = this.state.id;
        let id = nextState.professionsArr.find(professionsArr => professionsArr[0] === idSt);
        if (!nextState.shouldShow && this.state.id !== 0) {
          var idForDivText = id[1];
          $('#nameProf').text(idForDivText);
          $(".fasProf").addClass("fa-angle-right");
        }
        else {
          $('#nameProf').text("");
          $(".fasProf").removeClass("fa-angle-right");
          $(".fasProf").addClass("fa-angle-down");
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
        var idProf = caller.id.split('prof')[1];
        this.setStateID(idProf);
        this.addUrl(idProf);
      }
    
      showList() {
        this.setState({
          shouldShow: !this.state.shouldShow
        })
    
      }
    
      render() {
        let professionList;
        if (this.state.shouldShow) {
            professionList =
            <div className="">
            <div id='listProf' className="list-group ">
              {this.state.professionsArr.map(
                professionsArr =>
                  <a className='list-group-item list-group-item-action profDocTable'
                    id={"prof" + professionsArr[0]} data-toggle="list" role="tab"
                    key={professionsArr.toString()}
                    onClick={() => { this.setStateID(professionsArr[0]), this.addUrl(professionsArr[0]) }}
                    value='{professionsArr[1]}'>
                    <div className="row col-xs-12">
                    <div className="col-xs-10 col-sm-8 col-md-10">
                    {professionsArr[1]}
                    </div>
                    <div className="col-xs-1">
                      <i className="fa fa-plus mt-2" data-toggle="modal" data-target="#AddRateToProfession" ></i>
                    </div> 
                    </div>
                  </a>
              )
              }
            </div>
          </div>
        }
        else {
            professionList = ""
        }
    
        return(
        <div className="row mt-5 justify-content-center">
        <div className="col-sm-10 col-md-5 " id='allProfessions'>
          <div className="row">
            <div className="list-group col-sm-12 col-md-8 mb-3" id="professions">
              <div id='tableProf'>
                <div className="list-group-item" id="profButton" tabIndex='1' onClick={() => { this.showList() }}>
                  <p id='tableLabel'>Professions</p>
                  <i className="fas fasProf"></i>
                  <i><span id='nameProf'> </span></i>
                </div>
                {professionList}
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-10 col-md-5 " id='rates'>
          <div className="row " id="patientcard">
              <div className="col-6 justify-content-center text-center" id="col-custom">Rate</div>
              <div className="col-6 justify-content-center text-center" id="col-custom">Date</div>
          </div>
          <ProfessionRows idProf={this.state.id}/>
          <AddRateToProfession/>
        </div>
      </div>
        )}
}

export default ProfessionsRatesPage;