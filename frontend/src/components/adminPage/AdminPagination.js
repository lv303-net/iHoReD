import React from 'react';
import {
    Component
} from 'react';
import axios from 'axios';
import $ from 'jquery';
import PropTypes from 'prop-types';
import '../../style/AdminChangingRoles.css'

class AdminPagination extends Component {
    update = 0;
    constructor(props) {
        super(props);
        this.state = {
            countElements: 5,
            currentPage: 1,
            pageCount: 1,
            isDoctor: false,
            isAdmin: false,
            textFilter: null,
            shouldUpdate:1,
        };
        var url_string = window.location.href;
        var url = new URL(url_string);
        if (url.search !== '') {
            this.state.currentPage = url.searchParams.get("page");
            this.state.countElements = url.searchParams.get("count");
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return ((this.state.countElements !== nextState.countElements) ||
            (this.state.currentPage !== nextState.currentPage) ||
            (this.state.isDoctor !== nextState.isDoctor) ||
            (this.state.isAdmin !== nextState.isAdmin) ||
            (this.state.textFilter !== nextState.textFilter) ||
            (this.props.callPagination !== nextProps.callPagination) ||
            (this.state.pageCount !== nextState.pageCount) ||
            (this.state.shouldUpdate !== nextState.shouldUpdate)||
            (this.state.textFilter !== nextState.textFilter));
    }
    componentDidUpdate(nextProps, nextState) {
        let page;
        var url_string = window.location.href;
        var url = new URL(url_string);
        if (url.search !== '') {
            this.setState({
                countElements : url.searchParams.get("count"),
                currentPage : url.searchParams.get("page"),
                textFilter: url.searchParams.get("text"),
                isAdmin :  url.searchParams.get("isAdmin"),
                isDoctor :  url.searchParams.get("isDoc"),
                textFilter :  url.searchParams.get("text"),
            });
            page = url.searchParams.get("page");
        }
        let quant = 1;
        axios({
            method: 'get',
            url: localStorage.getItem("server_url") + '/NumbersOfPageFiltered/' + this.state.countElements +
                '/' + this.state.isAdmin + '/' + this.state.isDoctor + '/' + this.state.textFilter,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
        .then(res => {
            this.setState({
                pageCount: res.data,
            });
            quant = parseInt(res.data); 
            this.generatePages(parseInt(page),quant);
            this.props.callback(parseInt(page), nextState.countElements);        
        });
    }
    
    addPage(e) {
        e.preventDefault();
       var caller = e.target;
        var number = parseInt(caller.innerHTML);

        if (isNaN(number)) {
            if ((this.state.numberStart - 1) > 0) {
                let searchParameter = new URLSearchParams(window.location.search);
                searchParameter.delete("page");
            }
        } 
        else 
        {
            let searchParameter = new URLSearchParams(window.location.search);
            searchParameter.set('page', number);
            this.setState({
                currentPage: number
            });
            window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
        }
    }
    generatePages(number,quant) {
        number = parseInt(number);
        let arr = []
        let item = 
        <li className = "page-item mypag-item active"id = {"mypageitem" + number} key = { "mypageitem" + number}>
            <a className = "page-link mypag-link" id = "mypagelink" key = { "mypagelink" + number } > {(number).toString()}
            </a>
        </li >
        arr.push(item);

        if (quant !== 1) {
            if (number > 1) {
                item =
                < li className = "page-item mypag-item" id = { "mypageitem" + (number - 1)}   key = {  "mypageitem" + (number - 1)} >
                    <a className = "page-link mypag-link" id = "mypagelink" key = {"mypagelink" + (number - 1)} > {(number - 1).toString() } 
                    </a>
                </li >
                arr.unshift(item);
                if (number > 2) {
                    if (number > 3) {
                        item =
                         <li className = "page-item " id = { "mypageitem" + ".." } key = {"mypageitemli" + ".."} >
                             <a className = "page-link mypag-link" id = "mypagelink" key = {"mypagelink" + '..' } > 
                                ..
                            </a>
                        </li >
                        arr.unshift(item);
                    }
                    item = 
                    <li className = "page-item "id = {"mypageitem" + "1"} key = { "mypageitemli" + "1" } >
                        <a className = "page-link mypag-link" id = "mypagelink"key = {"mypagelink" + '1' } >
                             1 
                        </a>
                    </li >
                    arr.unshift(item);
                }
            }
            if (quant > number) {
                item = 
                <li className = "page-item mypag-item" id = { "mypageitem" + (number + 1)} key = { "mypageitem" + (number + 1) } >
                    <a className = "page-link mypag-link" id = "mypagelink"  key = {"mypagelink" + (number + 1)} > 
                        {(number + 1).toString() }
                    </a>
                </li>
                arr.push(item);
                if (quant > number + 1) {
                    if (quant > number + 2) {
                        item =
                         <li className = "page-item "id = { "mypageitem" + "."} key = {"mypageitemli" + "."} >
                            <a className = "page-link mypag-link" id = "mypagelink" key = {"mypagelink" + '.'} >
                             .. 
                            </a>
                        </li>
                        arr.push(item);
                    }
                    item = 
                    <li className = "page-item mypag-item" id = {"mypageitem" + (quant)} key = {"mypageitem" + (quant)} >
                        <a className = "page-link mypag-link" id = "mypagelink" key = {"mypagelink" + (quant) } >
                         {(quant).toString()}
                        </a>
                    </li >
                    arr.push(item);
                }
            }
        }
        return arr;
    }

    AddDropdown(number) {
        var button = $('#dropdownMenuButton');
        button.innerHTML = number;
    }

    addCountOfElements(e) {
        e.preventDefault();
        var caller = e.target;
        var number = parseInt(caller.innerHTML);
        var searchParameter = new URLSearchParams(window.location.search);
        searchParameter.set('count', number);
        var newPageNumber = 1;
        this.setState({
            countElements: number,
            currentPage: newPageNumber
        })
        searchParameter.set('page', newPageNumber);
        window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
        this.AddDropdown(number);
    }

    componentWillMount() {
        axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/NumbersOfPageFiltered/' + this.state.countElements +
                    '/' + this.state.isAdmin + '/' + this.state.isDoctor + '/' + this.state.textFilter,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
            .then(res => {
                this.setState({
                    pageCount: parseInt(res.data)
                });
                this.generatePages(1,this.state.pageCount);
            });
        this.props.callback(this.state.currentPage, this.state.countElements);
    }

    render() {
        return (
            <div className = "row mt-2 paginationRow" >
                <div className = "dropdown mydropdown float-right col-6" >
                    <button className = "btn btn-primary dropdown-toggle" type = "button" id = "dropdownMenuButton" data-toggle = "dropdown" aria-haspopup = "true" aria-expanded = "false" >
                        Elements per page
                    </button> 
                    <div className = "dropdown-menu" aria-labelledby = "dropdownMenuButton" onClick = {e => (this.addCountOfElements(e))} >
                        <button type = "button" className = "dropdown-item" > 5 </button>
                        <button type = "button" className = "dropdown-item" > 10 </button>
                        <button type = "button"className = "dropdown-item" > 15 </button>
                    </div>
               </div>
                <div className = "col-6" id = "paginationPages" >
                    <nav>
                        <ul className = "pagination pages" onClick = { e => (this.addPage(e))} > 
                            {this.generatePages(this.state.currentPage,this.state.pageCount) }
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