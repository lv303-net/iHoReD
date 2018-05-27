import React from 'react';
import { Component } from 'react';
import axios from 'axios';

class ChangingRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            role: "",
            idUser: 0
        };

    }
    shouldComponentUpdate(nextProps, nextState) {
        return ((this.state.idUser !== nextProps.idUser) ||
                (this.state.idUser !== nextState.idUser))
    }

    componentWillUpdate(nextProps, nextState) {
        if ((nextState.idUser !== nextProps.idUser) && 
            (nextProps.idUser !== undefined)) {
        axios({
            method: 'get',
            url: localStorage.getItem("server_url") + '/GetUserRole/' + nextProps.idUser,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
        })
            .then(res => {
                this.setState({
                    firstName: res.data.FirstName,
                    lastName: res.data.LastName,
                    role: res.data.Proffession,
                    idUser: nextProps.idUser
                })
            });
        }
    }

    render() {
        return (
            <div className="modal fade" id="changingRole" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Changing role</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h4>{this.state.firstName} {this.state.lastName}</h4>
                            <p>{this.state.role}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" >Apply</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangingRole;