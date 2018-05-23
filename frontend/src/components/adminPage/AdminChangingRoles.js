import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import '../../style/AdminChangingRoles.css'

class AdminChangingRoles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rolesList: [],
            numberStart: 1,
            numberFinish: 2,
            countElements: 10,
            currentPage: 1,
            ifArrow: false
        };
        var url_string = window.location.href;
        var url = new URL(url_string);
        if (url.search !== '') {
            this.state.currentPage = url.searchParams.get("page");
            this.state.countElements = url.searchParams.get("count");
            this.activePages(this.state.currentPage);
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/GetInfoAboutAllUsers/' + this.state.currentPage + '/' + this.state.countElements,
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
            searchParameter.set('page', this.state.numberStart);
            searchParameter.set('count', this.state.countElements);
            window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/GetInfoAboutAllUsers/' + this.state.currentPage + '/' + this.state.countElements,
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

    addPage(e) {
        e.preventDefault();
        var caller = e.target;
        var number = caller.innerHTML;
        if ((number == '»') || (number == '<span aria-hidden="true">»</span><span class="sr-only">Next</span>')) {
            if ((this.state.numberFinish + 1) <= this.state.pageCount) {
                var searchParameter = new URLSearchParams(window.location.search);
                searchParameter.delete('page');
                let tempStart = this.state.numberStart + 1;
                let tempFinish = this.state.numberFinish + 1;
                this.setState({ numberStart: tempStart, numberFinish: tempFinish, ifArrow: true });
                this.removeActive();
            }
        }
        else {
            if ((number == '«') || (number == '<span aria-hidden="true">«</span><span class="sr-only">Previous</span>')) {
                if ((this.state.numberStart - 1) > 0) {
                    var searchParameter = new URLSearchParams(window.location.search);
                    searchParameter.delete("page");
                    let tempStart = this.state.numberStart - 1;
                    let tempFinish = this.state.numberFinish - 1;
                    this.setState({ numberStart: tempStart, numberFinish: tempFinish, ifArrow: true });
                    this.removeActive();
                }
            }
            else {
                var searchParameter = new URLSearchParams(window.location.search);
                searchParameter.set('page', number);
                window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
                this.activePages(number);
                axios({
                    method: 'get',
                    url: localStorage.getItem("server_url") + '/GetInfoAboutAllUsers/' + number + '/' + this.state.countElements,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                    }
                })
                    .then(res => {
                        this.setState({
                            rolesList: res.data,
                            currentPage: number,
                            numberStart: 1,
                            numberFinish: 2,
                            ifArrow: false
                        })
                    });
            }
        }
    }

    activePages(number) {
        this.removeActive();
        $('.pages li#mypageitem' + (number)).addClass('active');
    }

    removeActive() {
        let i;
        for (i = this.state.numberStart; i <= this.state.numberFinish; i++) {
            $('.pages li#mypageitem' + (i)).removeClass('active');
        }
    }

    generatePages(numberStart, numberFinish) {
        var arr = []
        var url_string = window.location.href;
        var url = new URL(url_string);
        var item =
            <li className="page-item mypag-item active" id={"mypageitem" + numberStart} key={"mypageitemli" + numberStart}>
                <a className="page-link mypag-link" id="mypagelink" key={"mypageitem" + numberStart}>{(numberStart).toString()}</a>
            </li>
        arr.push(item);
        for (var i = numberStart; i < numberFinish; i++) {
            var item =
                <li className="page-item mypag-item" id={"mypageitem" + (i + 1)} key={"mypageitem" + (i + 1)}>
                    <a className="page-link mypag-link" id="mypagelink" key={"mypagelink" + (i + 1)}>{(i + 1).toString()}</a>
                </li>
            arr.push(item);
        }
        if (!this.state.ifArrow) {
            this.activePages(Number(url.searchParams.get("page")));
        }
        return arr;
    }

    AddDropdown(number) {
        var button = $('#dropdownMenuButton');
        button.innerHTML = number;
    }

    addCountOfElements(e) {
        var url_string = window.location.href;
        var url = new URL(url_string);
        e.preventDefault();
        var caller = e.target;
        var number = parseInt(caller.innerHTML);
        var searchParameter = new URLSearchParams(window.location.search);
        searchParameter.set('count', number);
        var newPageNumber;
        axios({
            method: 'get',
            url: localStorage.getItem("server_url") + '/NumbersOfPage/' + number,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
            .then(res => {
                this.setState({
                    pageCount: res.data
                })
            });
        if (this.state.elementsCount < number) {
            for (var i = 1; i < number; i++) {
                var start = this.state.elementsCount * (this.state.pageNumber - 1) + 1;
                if ((start >= ((i - 1) * number + 1)) && ((start + this.state.elementsCount - 1) <= ((i - 1) * number + number))) {
                    newPageNumber = i;
                }
                else {
                    if ((start >= ((i - 1) * number + 1)) && ((start) <= ((i - 1) * number + number))) {
                        newPageNumber = i;
                    }
                }
            }
            if (newPageNumber == null) {
                newPageNumber = 1;
            }
        }
        else {
            newPageNumber = 1;
        }
        if ((newPageNumber + 1) < this.state.pageCount) {
            this.setState({ numberStart: newPageNumber, numberFinish: newPageNumber + 1 })
        }
        else {
            if ((newPageNumber - 1) >= 1) {
                this.setState({ numberStart: newPageNumber - 1, numberFinish: newPageNumber })
            }
            else {
                this.setState({ numberStart: newPageNumber, numberFinish: newPageNumber })
            }
        }
        this.setState({ pageNumber: newPageNumber });
        searchParameter.set('page', newPageNumber);
        window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
        this.AddDropdown(number);
        axios({
            method: 'get',
            url: localStorage.getItem("server_url") + '/GetInfoAboutAllUsers/' + number + '/' + this.state.countElements,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
            .then(res => {
                this.setState({
                    rolesList: res.data,
                    countElements: number,
                    numberStart: 1,
                    numberFinish: 2
                })
            });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return ((this.state.currentPage !== this.nextState.currentPage) ||
                (this.state.countElements !== this.nextState.countElements))
    }

    componentWillUpdate(nextProps, nextState) {
        
    }

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
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" onClick={e => (this.addCountOfElements(e))}>
                            <button type="button" className="dropdown-item">5</button>
                            <button type="button" className="dropdown-item">10</button>
                            <button type="button" className="dropdown-item">15</button>
                        </div>
                    </div>
                    <div>
                        <nav >
                            <ul className="pagination pages" onClick={e => (this.addPage(e))}>
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                {this.generatePages(this.state.numberStart, this.state.numberFinish)}
                                {/* {this.generatePages(1, 10)} */}
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
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
