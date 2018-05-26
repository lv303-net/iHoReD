import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import AdminPagination from './AdminPagination';
import '../../style/AdminChangingRoles.css'

class AdminChangingRoles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rolesList: [],
            countElements: 10,
            currentPage: 1,
            textFilter: "",
            isAdmin: false,
            isDoctor: false, 
            applyClick: false
        };
        var url_string = window.location.href;
        var url = new URL(url_string);
        if (url.search !== '') {
            this.state.currentPage = url.searchParams.get("page");
            this.state.countElements = url.searchParams.get("count");
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/FiterAllUsers/' + this.state.currentPage + '/' + this.state.countElements + '/' +this.state.isAdmin+ '/' +this.state.isDoctor+ '/' + this.state.textFilter,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
                .then(res => {
                    this.setState({
                        rolesList: res.data,
                    })
                });
        }
        else {
            var searchParameter = new URLSearchParams(window.location.search);
            searchParameter.set('page', this.state.currentPage);
            searchParameter.set('count', this.state.countElements);
            window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/FiterAllUsers/' + this.state.currentPage + '/' + this.state.countElements + '/' +this.state.isAdmin+ '/' +this.state.isDoctor+ '/' + this.state.textFilter,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
                .then(res => {
                    this.setState({
                        rolesList: res.data,
                    })
                });
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return ((this.state.countElements !== nextState.countElements) ||
                (this.state.currentPage !== nextState.currentPage) ||
                (this.state.rolesList !== nextState.rolesList) ||
                (this.state.countElements !== nextState.countElements) ||
                (this.state.applyClick !== nextState.applyClick))
    }
    
    componentWillUpdate(nextProps, nextState) {
        if ((this.state.countElements !== nextState.countElements) ||
            (this.state.currentPage !== nextState.currentPage) ||
            (this.state.applyClick !== nextState.applyClick)) {
                axios({
                    method: 'get',
                    url: localStorage.getItem("server_url") + '/FiterAllUsers/' + nextState.currentPage + '/' + nextState.countElements + '/' +this.state.isAdmin+ '/' +this.state.isDoctor+ '/' + this.state.textFilter,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                    }
                })
                    .then(res => {
                        this.setState({
                            rolesList: res.data,
                        })
                    });
            }
    }

    changeAdmin() {
        this.setState({
            isAdmin: !this.state.isAdmin,
        })
    }

    changeDoctor() {
        this.setState({
            isDoctor: !this.state.isDoctor,
        })
    }

    getPagesAndQuantity(param, param2) {
        this.setState({
            currentPage: param,
            countElements: param2
        })
    }

    handleApply() {
        var searchParameter = new URLSearchParams(window.location.search);
        searchParameter.set('page', 1);
        searchParameter.set('count', this.state.countElements);
        window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
        this.setState({
            currentPage: 1,
            applyClick: !this.state.applyClick
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="row" id="rowFilter">
                            <div className="col-md-5 col-8" >
                                <input type="text" 
                                        id="textInputUsername" 
                                        onChange={x => { this.setState({
                                            textFilter: x.target.value,
                                        })}}
                                        placeholder="Username"/>
                            </div>
                            <div className="col-md-1 col-5 admDocCheck" >
                                <input type="checkbox" className="checkboxEach mt-2" id="checkboxAdmin" onChange={() => this.changeAdmin()}/>
                            </div>
                            <div className="col-md-2 col-6 mt-1 admDocLabel" >
                                <p>only Admins</p>
                            </div>                            
                            <div className="col-md-4 col-5 admDocCheck">
                                <input type="checkbox" className="checkboxEach mt-2" id="checkboxDoctor" onChange={() => this.changeDoctor()}/>
                            </div>
                            <div className="col-md-2 col-6 mt-1 admDocLabel" >
                                <p>only Doctors</p>
                            </div>                            
                            <div className="col-md-2 col-12 text-center">
                                <button type="button" className="btn btn-info" onClick={() =>{this.handleApply()}}>Apply
                                </button>
                            </div>
                        </div>
                    </div>
                        
                    <div className="col-md-9 col-12 col-centered" id="rolesMainTable">
                        <div className="row text-center mt-1" id="patientcard">
                            <div className="col-5 col-custom-header" id="col-custom">Username</div>
                            <div className="col-2 col-custom-header" id="col-custom">Admin</div>
                            <div className="col-5 col-custom-header">Doctor</div>
                        </div>
                        {
                            this.state.rolesList.map(items =>
                                <div className="row text-center" id="patientcard" key={items.LastName + items.FirstName + 'Row'}>
                                    <div className="col-5" id="col-custom" key={items.LastName}>
                                        <p className="mt-1 mb-1">{items.FirstName} {items.LastName} </p>
                                    </div>
                                    <div className="col-2" id="col-custom" key={items.LastName + 'IsAdmin'}>
                                        {items.IsAdmin
                                            ? <input type="checkbox" className="checkboxEach mt-2" disabled="disabled" checked />
                                            : <input type="checkbox" className="checkboxEach mt-2" disabled="disabled" />}
                                    </div>
                                    <div className="col-5" key={items.LastName + 'Prof'}>
                                        <p className="mt-1 mb-1">{items.Proffession}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                <AdminPagination currPage={this.state.currentPage} callback={this.getPagesAndQuantity.bind(this)}/>
            </div>
        );
    }
}

export default AdminChangingRoles;
