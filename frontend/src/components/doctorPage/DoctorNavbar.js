import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import '../../style/UserPage.css';

class DoctorNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idLink: 0
    };
    this.colorSelected = this.colorSelected.bind(this);
    this.getValueFromURL = this.getValueFromURL.bind(this);
  };

  colorSelected(e) {
    e.preventDefault();
    var caller = e.target || e.srcElement;
    var id = caller.id;
    this.setState({
      idLink: id
    })
  }

  getValueFromURL() {
    if(window.location.href.indexOf("schedule") != -1) {
      this.setState({
        idLink: "link1"
      })
    } 
    else if (window.location.href.indexOf("mySchedule") != -1) {
      this.setState({
        idLink: "link2"
      })
    }
    else {
      this.setState({
        idLink: "link3"
      })
    }
  }

  componentDidMount() {
    this.getValueFromURL();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.idLink !== nextState.idLink);
  }

  componentWillUpdate(nextProps, nextState) {
    this.getValueFromURL();
    let i;
    for (i = 0; i <= $(".main-nav1 span").length; i++) { 
      $( ".main-nav1  span#link"+i).css("background-color", "#fff");
      $( ".main-nav1  span#link"+i).css("color", "rgba(0,0,0,.5)");
    }
    $('.main-nav1 span#'+nextState.idLink).css("color", "white");
    $('.main-nav1 span#'+nextState.idLink).css("background-color", "#49A2FF");
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light" id="navbarAdmin">
        <div className="navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav main-nav1" onClick={(e) => { this.colorSelected(e) }} >
            <li className="nav-item">
              <Link to='/doctor/schedule'>
                <span className="nav-link" id="link1">Schedule</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/doctor/mySchedule'>
                <span className="nav-link" id="link2">My Work Schedule</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/doctor/salary'>
                <span className="nav-link" id="link3">Salary Report</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default DoctorNavbar;