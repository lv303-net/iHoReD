import React from 'react';
import { Component } from 'react';
import { Link} from 'react-router-dom';
import '../../style/AdminPage.css';


class AdminNavbar extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav main-nav1">
              <li className="nav-item">
                <Link to='/admin/rules'>
                  <a className="nav-link" id="link">Rules</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/admin/salary'>
                 <a className="nav-link" id="link">Salary</a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
    );
  }
}

export default AdminNavbar;
