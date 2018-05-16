import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import '../../style/AdminPage.css';

class AdminNavbar extends Component {
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
    if(window.location.href.indexOf("rules") != -1) {
      this.setState({
        idLink: "link1"
      })
    } 
    else {
      this.setState({
        idLink: "link2"
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
    $('.main-nav1 #item'+nextState.idLink).addClass('active'); 
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light" id="navbarAdmin">
        <div className="navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav main-nav1" onClick={(e) => { this.colorSelected(e) }} >
            <li className="nav-item" id="itemlink1">
              <Link to='/admin/rules'>
                <span className="nav-link" id="link1">Rules</span>
              </Link>
            </li>
            <li className="nav-item" id="itemlink2">
              <Link to='/admin/salary'>
                <span className="nav-link" id="link2">Salary</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default AdminNavbar;
