import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import PropTypes from 'prop-types';
import '../../style/AdminChangingRoles.css'

class AdminPagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberStart: 1,
            numberFinish: 2,
            countElements: 10,
            currentPage: 1,
            pageCount: 1,
            ifArrow: false
        };
        var url_string = window.location.href;
        var url = new URL(url_string);
        if (url.search !== '') {
            this.state.currentPage = url.searchParams.get("page");
            this.state.countElements = url.searchParams.get("count");
            this.activePages(this.state.currentPage);
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return ((this.state.countElements !== nextState.countElements) ||
            (this.state.currentPage !== nextState.currentPage))
    }

    componentWillUpdate(nextProps, nextState) {
        axios({
            method: 'get',
            url: localStorage.getItem("server_url") + '/NumbersOfPage/' + this.state.countElements,
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
        this.props.callback(nextState.currentPage, nextState.countElements);
    }

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
                this.setState({ currentPage: number });
                window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
                this.activePages(number);
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
        this.setState({
            countElements: number
        })
        var newPageNumber;
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
        this.setState({ pageNumber: newPageNumber, currentPage: newPageNumber });
        searchParameter.set('page', newPageNumber);
        window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
        this.AddDropdown(number);
    }

    componentWillMount() {
        this.setState({
            currentPage: this.props.currPage
        })
    }

    render() {
        return (
            <div className="row mt-2 paginationRow">
                <div className="dropdown mydropdown float-right col-6">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Elements per page
                        </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" onClick={e => (this.addCountOfElements(e))}>
                        <button type="button" className="dropdown-item">5</button>
                        <button type="button" className="dropdown-item">10</button>
                        <button type="button" className="dropdown-item">15</button>
                    </div>
                </div>
                <div className="col-6" id="paginationPages">
                    <nav >
                        <ul className="pagination pages" onClick={e => (this.addPage(e))}>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </li>
                            {this.generatePages(this.state.numberStart, 10)}
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
        );
    }
}

AdminPagination.propTypes = {
    callback: PropTypes.func
};

export default AdminPagination;
