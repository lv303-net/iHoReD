import React from 'react';
import axios from 'axios';
import validator from 'validator';
import Calendar from './Calendar';
import PropTypes from 'prop-types';
import $ from 'jquery';

var server_url;
if (process.env.NODE_ENV === "development")
  server_url = "http://localhost:58511"
else if (process.env.NODE_ENV === "production")
  server_url = "https://hored.azurewebsites.net"

class DoctorTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: [],
      idProf: 0,
      idDoc: 0,
      shouldShow: false
    };
    this.setStateID = this.setStateID.bind(this);
    this.addUrl = this.addUrl.bind(this);
    this.getIdDoc = this.getIdDoc.bind(this);
  };

  getContent(e) {
    e.preventDefault();
    var caller = e.target || e.srcElement;
    var id = caller.id;
    var idDoc = caller.id.split('doc')[1];
    this.setStateID(idDoc);
    this.addUrl(idDoc);

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
  }

  componentDidUpdate(prevPros, prevState) {
    if (!prevState.shouldShow) {
      var idForDiv = "#doc" + this.state.idDoc;
      $(idForDiv).addClass("active");
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.idProf !== nextProps.idProf ||
      this.state.shouldShow !== nextState.shouldShow ||
      this.props.shouldShow !== nextProps.shouldShow);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.shouldShow !== nextProps.shouldShow || this.state.shouldShow !== nextState.shouldShow) {
      this.setState({
        shouldShow: !this.state.shouldShow
      })
    }


    axios.get(server_url + '/GetDoctors/' + nextProps.idProf)
      .then(res => {
        this.setState({
          idProf: nextProps.idProf,
          doc: res.data
        })
      });


    let idSt = this.state.idDoc;
    let id = nextState.doc.find(doc => doc[2] === idSt);
    if (!nextState.shouldShow && id !== undefined) {
      var idForDivText = id[1] + ' ' + id[0];
      $('#nameDoc').text(idForDivText);
      $(".fasDoc").addClass("fa-angle-right");
    }
    else {
      $('#nameDoc').text("");
      $(".fasDoc").removeClass("fa-angle-right");
      $(".fasDoc").addClass("fa-angle-down");
    }
  }

  setStateID(idDoctor) {
    this.setState({
      idDoc: idDoctor
    })
  }

  addUrl(val) {
    var searchParameter = new URLSearchParams(window.location.search);
    searchParameter.set('doc', val);
    window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
    this.props.callback(val);
  };

  getIdDoc(e) {
    e.preventDefault();
    var caller = e.target || e.srcElement;
    var id = caller.id;
    var idDoc = caller.id.split('doc')[1];
    this.setStateID(idDoc);
    this.addUrl(idDoc);
  }

  showList() {
    this.setState({
      shouldShow: !this.state.shouldShow
    })
  }

  render() {
    let basicButtons;
    if (this.state.shouldShow) {
      basicButtons =
        <div id='listDoc' className="list-group" onClick={this.getContent.bind(this)}>
          {this.state.doc.map(
            doc =>
              <a className='list-group-item list-group-item-action profDocTable'
                id={"doc" + doc[2]} data-toggle="list" role="tab"
                role="tab" key={doc.toString()}>{doc[1] + ' ' + doc[0]}</a>)}
        </div>
    }
    else {
      basicButtons = ""
    }

    return (<div className="list-group mb-2 col-sm-6 col-md-6" id="doctors">
      <div id='tableDoc'>
        <div className="list-group-item" id="docButton" tabIndex="1" onClick={() => { this.showList() }}>
          <p>Doctors</p>
          <i className="fas fasDoc"></i>
          <i><span id='nameDoc'> </span> </i>
        </div>
        {basicButtons}
      </div>
    </div>
    )
  }
}

DoctorTable.propTypes = {
  callback: PropTypes.func
};

export default DoctorTable;
