import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import '../../style/AdminChangingRoles.css'

class AdminChangingRoles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rolesList: []
        };
        var url_string = window.location.href;
        var url = new URL(url_string);
        if (url.search !== '') {
            var page = url.searchParams.get("page");
            var enddate = url.searchParams.get("count");
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/GetInfoAboutAllUsers',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
                .then(res => {
                    this.setState({
                        rolesList: res.data
                    })

                });
        }
        else {
            var searchParameter = new URLSearchParams(window.location.search);
            searchParameter.set('page', 1);
            searchParameter.set('count', 20);
            window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/GetInfoAboutAllUsers',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
                .then(res => {
                    this.setState({
                        rolesList: res.data
                    })
                });
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row mt-5 ">
                    <div className="col-12" id="rolesMainTable">
                        <div className="row text-center" id="patientcard">
                            <div className="col-4 col-custom-header" id="col-custom">Username</div>
                            <div className="col-4 col-custom-header" id="col-custom">Admin</div>
                            <div className="col-4 col-custom-header">Doctor</div>
                        </div>
                        {
                            this.state.rolesList.map(items =>
                                <div className="row text-center" id="patientcard" key={items.LastName + items.FirstName + 'Row'}>
                                    <div className="col-4" id="col-custom" key={items.LastName}>
                                        <p className="mt-1 mb-1">{items.FirstName} {items.LastName} </p>
                                    </div>
                                    <div className="col-4" id="col-custom" key={items.LastName + 'IsAdmin'}>
                                        {items.IsAdmin
                                            ? <input type="checkbox" className="checkboxEach mt-2" disabled="disabled" checked />
                                            : <input type="checkbox" className="checkboxEach mt-2" disabled="disabled" />}
                                    </div>
                                    <div className="col-4" key={items.LastName + 'Prof'}>
                                        <p className="mt-1 mb-1">{items.Proffession}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-2">
                    <div className="dropdown mydropdown float-right">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Elements per page
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button type="button" className="dropdown-item">10</button>
                            <button type="button" className="dropdown-item">20</button>
                            <button type="button" className="dropdown-item">50</button>
                        </div>
                    </div>
                    <div>
                        <nav >
                            <ul className="pagination pages">
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
        );
    }
}

export default AdminChangingRoles;
