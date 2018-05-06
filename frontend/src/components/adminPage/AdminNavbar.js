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
  };

  colorSelected(e) {
    e.preventDefault();
    var caller = e.target || e.srcElement;
    var id = caller.id;
    this.setState({
      idLink: id
    })
    alert(id);
  }

  componentDidMount() {
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

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.idLink !== nextProps.idLink);
  }

  componentWillUpdate(nextProps, nextState) {
    let i;
    for (i = 0; i < $(".main-nav1 a").length; i++) { 
      $( ".main-nav1  a#link"+i).css("background-color", "#fff");
      $( ".main-nav1  a#link"+i).css("color", "rgba(0,0,0,.5)");
    }
    $('.main-nav1 a#'+nextState.idLink).css("color", "white");
    $('.main-nav1 a#'+nextState.idLink).css("background-color", "#49A2FF");
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light" id="navbarAdmin">
        <div className="navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav main-nav1" onClick={(e) => { this.colorSelected(e) }} >
            <li className="nav-item">
              <Link to='/admin/rules'>
                <a className="nav-link" id="link1">Rules</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/admin/salary'>
                <a className="nav-link" id="link2">Salary</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default AdminNavbar;
