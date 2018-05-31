import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import Select from 'react-select';
import AdminPagination from './AdminPagination';
import ChangingRole from './modaldialogs/ChanginRole';
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
            applyClick: false,
            idClick: 0,
            shouldUpdate: false,
            shouldUpdateModal: false,
            options: [
                { value: "0", label: "" }
            ],
            idSelectedUser: 0,
            users: [],
            default: 0,
        };
        var url_string = window.location.href;
        var url = new URL(url_string);
        if (url.search !== '') {
            this.state.currentPage = url.searchParams.get("page");
            this.state.countElements = url.searchParams.get("count");
            this.state.textFilter = url.searchParams.get("text");
            this.state.isAdmin = url.searchParams.get("isAdmin");
            this.state.isDoctor = url.searchParams.get("isDoc");
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/FilterAllUsers/' + this.state.currentPage + '/' + this.state.countElements + '/' +this.state.isAdmin+ '/' +this.state.isDoctor+ '/' + this.state.textFilter,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
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
            searchParameter.set('text', "");
            searchParameter.set('isAdmin', false);
            searchParameter.set('isDoc', false);
            window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/FilterAllUsers/' + this.state.currentPage + '/' + this.state.countElements + '/' +this.state.isAdmin+ '/' +this.state.isDoctor+ '/' + this.state.textFilter,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
                .then(res => {
                    this.setState({
                        rolesList: res.data,
                    })
                });
        }
    };

    componentDidMount() {
        if (this.state.isAdmin == "true") {
            $('#checkboxAdmin').prop('checked', true);
        }
        if (this.state.isDoctor == "true") {
            $('#checkboxDoctor').prop('checked', true);
        }
        if (this.state.textFilter !== "") {
            $('#textInputUsername').val(this.state.textFilter);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return ((this.state.countElements !== nextState.countElements) ||
                (this.state.currentPage !== nextState.currentPage) ||
                (this.state.rolesList !== nextState.rolesList) ||
                (this.state.countElements !== nextState.countElements) ||
                (this.state.applyClick !== nextState.applyClick) ||
                (this.state.idUser !== nextState.idUser) ||
                (this.state.shouldUpdate !== nextState.shouldUpdate) ||
                (this.state.options !== nextState.options) ||
                (this.state.idSelectedUser !== nextState.idSelectedUser) ||
                (this.state.txtFilter !== nextState.txtFilter) ||
                (this.state.users !== nextState.users))
    }
    
    componentWillUpdate(nextProps, nextState) {
        if ((this.state.countElements !== nextState.countElements) ||
            (this.state.currentPage !== nextState.currentPage) ||
            (this.state.applyClick !== nextState.applyClick) ||
            (this.state.shouldUpdate !== nextState.shouldUpdate)) {
                axios({
                    method: 'get',
                    url: localStorage.getItem("server_url") + '/FilterAllUsers/' + nextState.currentPage + '/' + nextState.countElements + '/' + nextState.isAdmin+ '/' + nextState.isDoctor+ '/' + nextState.textFilter,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
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
        if ($('#checkboxAdmin').is(":checked")){
            this.setState({
                isAdmin: true,
            })
        }
        else {
            this.setState({
                isAdmin: false,
            })
        }
    }

    changeDoctor() {
        if ($('#checkboxDoctor').is(":checked")){
            this.setState({
                isDoctor: true,
            })
        }
        else {
            this.setState({
                isDoctor: false,
            })
        }
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
        searchParameter.set('text', this.state.textFilter);
        searchParameter.set('isAdmin', this.state.isAdmin);
        searchParameter.set('isDoc', this.state.isDoctor);
        window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
        
        this.setState({
            currentPage: 1,
            applyClick: !this.state.applyClick,
        })
    }

    getIdClick(e) {
        e.preventDefault();
        var caller = e.target || e.srcElement;
        this.setState({
            idUser: caller.id,
            shouldUpdateModal: !this.state.shouldUpdateModal
        })
    }

    rerenderFromModal(){
        this.setState({
            shouldUpdate: !this.state.shouldUpdate,
        })
    }

    handleChange = (selectedOption) => {
        this.setState({
            idSelectedUser: selectedOption.value, 
            textFilter: selectedOption.label
        })
    }
    
    returnDatalist(value){
        this.setState({
            textFilter: value,
            users: []
        })
        if (value !== "") {
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/FirstLastname/' + value,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
                .then(response => {
                    this.setState({
                        users: response.data,
                    })
                });
        }
    }

    render() {
        return (
            <div className="container" id="changingRolesDiv">
                <div className="row mt-5">
                    <div className="col-12 col-md-9 col-centered">
                        <div className="row mt-2" id="rowFilter">
                            <div className="col-md-5 col-8 text-center" >
                                <p className="admDocMid">Enter username</p>
                                <input list="names" type="text" 
                                        id="textInputUsername" 
                                        onChange={x => { this.returnDatalist(x.target.value)}}
                                        placeholder="Username">
                                        
                                </input>
                                <datalist id="names">
                                    {this.state.users.map(
                                        names => 
                                        <option key={names.IdUser}>{names.FirstName + ' ' + names.LastName}</option>
                                    )}
                                </datalist>
                                
                            </div>
                            <div className="col-md-2 col-5 admDocCheck text-center" >
                                <p className="admDocMid">Admin</p>
                                <input type="checkbox" className="checkboxEach mt-2" id="checkboxAdmin" onChange={() => this.changeAdmin()}/>
                            </div>
                            <div className="col-md-2 col-6 mt-1 admDocSmall" >
                                <p>only Admins</p>
                            </div>                            
                            <div className="col-md-2 col-5 admDocCheck text-center">
                                <p className="admDocMid">Doctor</p>
                                <input type="checkbox" className="checkboxEach mt-2" id="checkboxDoctor" onChange={() => this.changeDoctor()}/>
                            </div>
                            <div className="col-md-2 col-6 mt-1 admDocSmall" >
                                <p>only Doctors</p>
                            </div>                            
                            <div className="col-md-3 col-12 text-center">
                                <button type="button" className="btn btn-info" onClick={() =>{this.handleApply()}}>Apply
                                </button>
                            </div>
                        </div>
                    </div>
                        
                    <div className="col-md-9 col-12 col-centered" id="rolesMainTable">
                        <div className="row text-center mt-1 patientcard">
                            <div className="col-5 col-custom-header column-custom" >Username</div>
                            <div className="col-2 col-custom-header column-custom">Admin</div>
                            <div className="col-5 col-custom-header">Doctor</div>
                        </div>
                        {
                            this.state.rolesList.map(items =>
                                <div className="row text-center patientcard" key={items.LastName + items.FirstName + 'Row'}>
                                    <div className="col-5 column-custom" id={items.IdUser} data-toggle="modal" data-target="#changingRole" onClick={(e)=>this.getIdClick(e)} >
                                        <p className="mt-1 mb-1" id={items.IdUser}>{items.FirstName} {items.LastName} </p>
                                    </div>
                                    <div className="col-2 column-custom" key={items.LastName + 'IsAdmin'}>
                                        {items.IsAdmin
                                            ? <input value={this.state.default} type="checkbox" className="checkboxEach mt-2" disabled="disabled" checked />
                                            : <input value={this.state.default} type="checkbox" className="checkboxEach mt-2" disabled="disabled" />}
                                    </div>
                                    <div className="col-5" key={items.LastName + 'Prof'}>
                                        <p className="mt-1 mb-1">{items.Proffession}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                <AdminPagination currPage={this.state.currentPage} txtFilter={this.state.textFilter} isAdmin={this.state.isAdmin} isDoctor={this.state.isDoctor} callback={this.getPagesAndQuantity.bind(this)}/>
                <ChangingRole shoudldUpdateModal={this.state.shouldUpdateModal} idUser = {this.state.idUser} callback={this.rerenderFromModal.bind(this)}/>
            </div>
        );
    }
}

export default AdminChangingRoles;
