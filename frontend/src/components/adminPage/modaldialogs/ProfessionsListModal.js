import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader';

class ProfessionsListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            professionsArr: [],
            id: 0
        }
    }
    addUrl(val) {
        var searchParameter = new URLSearchParams(window.location.search);
        searchParameter.set('prof', val);
        searchParameter.delete('doc');
        window.history.pushState(null, null, `${window.location.pathname}?${searchParameter.toString()}${window.location.hash}`);
    };

    setStateID(idP) {
        this.setState({
            id: idP
        })
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: localStorage.getItem("server_url") + '/AllProfessions',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
            .then(res => {
                this.setState({
                    professionsArr: res.data
                });
            });
    }

    render() {
        return (
            <div class="modal fade" id="ProfessionsListModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="exampleModalLabel">Doctors:</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <div id='listProf' className="list-group ">
                                {this.state.professionsArr.map(
                                    professionsArr =>
                                        <a className='list-group-item list-group-item-action profDocTable'
                                            id={"prof" + professionsArr[0]} data-toggle="list" role="tab"
                                            key={professionsArr.toString()}
                                            onClick={() => { this.setStateID(professionsArr[0]), this.addUrl(professionsArr[0]) }}
                                            value='{professionsArr[1]}'>
                                            <div className="row col-xs-12">
                                                <div className="col-xs-10 col-sm-8 col-md-10">
                                                    {professionsArr[1]}
                                                </div>
                                                <div className="col-xs-1">
                                                    <i className="fa fa-plus mt-2" data-dismiss="modal" data-toggle="modal" data-target="#AddRateToProfession" ></i>
                                                </div>
                                            </div>
                                        </a>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfessionsListModal;