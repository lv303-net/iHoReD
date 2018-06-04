import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import '../../style/UserPage.css';


class UserNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idLink: 0
    };
    this.getValueFromURL = this.getValueFromURL.bind(this);
  };

  tabSelected(e) {
    e.preventDefault();
    var caller = e.target || e.srcElement;
    var id = caller.id;
    this.setState({
      idLink: id
    })
  }

  getValueFromURL() {
    if (window.location.href.indexOf("schedule") != -1) {
      this.setState({
        idLink: "link1"
      })
    }
    else if (window.location.href.indexOf("edit") != -1) {
      this.setState({
        idLink: "link2"
      })
    }
    else if (window.location.href.indexOf("medicalCard") != -1) {
      this.setState({
        idLink: "link3"
      })
    }
    else {
      this.setState({
        idLink: "link0"
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
    $(".main-nav1").find(".active").removeClass("active");
    $('.main-nav1 #item' + nextState.idLink).addClass('active');
  }

  render() {
    var id = localStorage.getItem("currentUserId");
    return (
      <nav className="navbar navbar-light bg-light" id="navbarAdmin">
        <div className="navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav main-nav1" onClick={(e) => { this.tabSelected(e) }} >
            <li className="nav-item" id="itemlink1">
              <Link to='/patient/schedule'>
                <span className="nav-link" id="link1">Schedule</span>
              </Link>
            </li>
            <li className="nav-item" id="itemlink2">
              <Link to='/patient/edit'>
                <span className="nav-link" id="link2">Edit Info</span>
              </Link>
            </li>
            <li className="nav-item" id="itemlink3">
              <Link to={'/patient/medicalCard/' + id}>
                <span className="nav-link" id="link3">Medical Card</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default UserNavbar;
