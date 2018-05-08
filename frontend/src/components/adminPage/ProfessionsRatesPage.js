import React from 'react';
import $ from 'jquery';
import axios from 'axios';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class ProfessionsRatesPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          professionsArr: [],
          id: 0,
          shouldShow: false,
          idDoctor: 0,
          shouldDocBeShown: false
        };
        this.setStateID = this.setStateID.bind(this);
        axios.get(server_url + '/AllProfessions')
          .then(res => {
            res.data.forEach(profession => {
              const professionsArr = res.data;
              this.setState({
                professionsArr
              })
            });
          });
      };
    
      formChild1(param) {
        this.setState({
          idDoctor: param
        })
      }
    
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
            <div id='listProf' className="list-group">
              {this.state.professionsArr.map(
                professionsArr =>
                  <a className='list-group-item list-group-item-action profDocTable'
                    id={"prof" + professionsArr[0]} data-toggle="list" role="tab"
                    key={professionsArr.toString()}
                    onClick={() => { this.setStateID(professionsArr[0]), this.addUrl(professionsArr[0]) }}
                    value='{professionsArr[1]}'>{professionsArr[1]}
                  </a>
              )
              }
            </div>
        }
        else {
            professionList = ""
        }
    
        return <div className="col-sm-12 col-md-12" id='tablesBlock'>
          <div className="row justify-content-center">
            <div className="list-group mb-2 col-sm-6 col-md-4" id="professions">
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
      }
}

export default ProfessionsRatesPage;