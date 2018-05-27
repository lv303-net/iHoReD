import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import '../../../style/AdminChangingRoles.css'

class ChangingRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            role: "",
            idUser: 0,
            selectedOption: '',
            idRole: 0,
            options: [
                { value: '0', label: '' }
            ]
        };

    }
    shouldComponentUpdate(nextProps, nextState) {
        return ((this.state.idUser !== nextProps.idUser) ||
                (this.state.idUser !== nextState.idUser) ||
                (this.state.options !== nextState.options) || 
                (this.state.idRole !== nextState.idRole))
    }

    componentWillUpdate(nextProps, nextState) {
        let _that = this;
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

            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/GetUserAvailableRole/' + nextProps.idUser,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
                .then(function (response) {
                    _that.setState({
                        options: response.data.map(role => ({ value: role.RoleId, label: role.RoleName }))
                    })
                })
        }

        if (this.state.idRole !== nextState.idRole && nextState.idRole == 2) {
            console.log('selected role is doctor');
        }
    }

    handleChange = (selectedOption) => {
        if (selectedOption !== null) {
            this.setState({
                selectedOption: selectedOption,
                idRole: selectedOption.value
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
                            <div className="modalMain">
                                <h4>{this.state.firstName} {this.state.lastName}</h4>
                                <p>{this.state.role}</p>
                                <h5>Available roles:</h5>
                                <Select
                                    value={this.state.idRole}
                                    name="form-field-name"
                                    onChange={this.handleChange}
                                    options={this.state.options}
                                    clearable={false}
                                />
                            </div>
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