import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import Calendar from './Calendar';
import $ from 'jquery'

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class DoctorTable extends React.Component{
    constructor(props){      
      super(props);
      this.state = { doc: [], idProf: 0, idDoc: 0};     
      this.setStateID=this.setStateID.bind(this);
      this.addUrl=this.addUrl.bind(this);
      this.getIdDoc=this.getIdDoc.bind(this);

    };

    responsiveTables(){
      if ($(window).width() <= 768) {
        $(".fasDoc").toggle("fa-angle-down");
        $(".fasDoc").toggle("fa-angle-right");
        if (this.state.idDoc != 0) {
          var idForDiv = "#doc"+this.state.idDoc;
          var idForDivText = $(idForDiv).text();    
          $('#nameDoc').text(idForDivText);
        } 
        $("#docButton")
        .click(function() {
          $("#listDoc").toggle();
        })            
    }
    else {
      // $('#nameDoc').text('Doctors');
    }
    }

    componentDidMount() {
      var url_string = window.location.href;      
      var url = new URL(url_string);
      if (url.search != '') {
        var idDoc = url.searchParams.get("doc");  
        this.setState({
          idDoc: idDoc
        })
      }
      var _that = this;
      $(document).ready(function() {
        _that.responsiveTables();
        $(window).resize(function() {          
          _that.responsiveTables();
        });
      });
    }
   
    componentDidUpdate(prevPros, prevState) {
      var _that = this;
      var idForDiv = "#doc"+this.state.idDoc;
      $(idForDiv).addClass("active");
      var idForDivText = $(idForDiv).text();    
      if ($(window).width() <= 768) {  
        // _that.responsiveTables();
        $('#nameDoc').text(idForDivText);
      }
      // $('#docButton').text(idForDivText);
    }

      shouldComponentUpdate(nextProps, nextState) {
        return (this.state.idProf !== nextProps.idProf); 
      }

      componentWillUpdate(nextProps, nextState)
      {
        axios.get(server_url+'/GetDoctors/' + nextProps.idProf)
        .then(res => {
        this.setState({
          idProf: nextProps.idProf,
          doc: res.data
        })
      });
      }

      setStateID(idDoctor) {
        this.setState({
          idDoc: idDoctor
        })
      }

      addUrl(val) {
        var searchParameter=new URLSearchParams(window.location.search);
        searchParameter.set('doc',val);
        window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`); 
        window.location.reload();
    };

      getIdDoc(e) {
        e.preventDefault();
        var caller = e.target || e.srcElement;
        var id = caller.id;
        var idDoc = caller.id.split('doc')[1];        
        this.setStateID(idDoc);
        this.addUrl(idDoc);
      }
      
    render(){
      return  <div className="list-group mb-2 col-sm-6 col-md-6" id="professions">
                  <div id='tableDoc'>
                    <div className="list-group-item" id="docButton" tabIndex="1">
                      <p>Doctors</p>
                      <i className="fas fasDoc"></i>  
                      <i><span id='nameDoc'> </span> </i>
                    </div>
                      <div id='listDoc' className="list-group" onClick={e => this.getIdDoc(e)}>
                      {this.state.doc.map(doc => <a className='list-group-item list-group-item-action profDocTable'id={"doc"+doc[2]} role="tab" key={doc.toString()}>{doc[1] + ' ' + doc[0]}</a>)}                                   
                      </div>
                    </div>              
                  </div>
         }
  }

  export default DoctorTable;
