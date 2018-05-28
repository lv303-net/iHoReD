import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import PropTypes from 'prop-types';
import '../../../style/AdminChangingRoles.css'

class ChangingRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            role: "",
            idUser: 0,
            selectedOption: "",
            idRole: 0,
            options: [
                { value: "0", label: "" }
            ],
            selectedOptionProf: "",
            idProf: 0,
            optionsProf: [
                { value: "0", label: "" }
            ],
        };

    }
    shouldComponentUpdate(nextProps, nextState) {
        return ((this.state.idUser !== nextProps.idUser) ||
                (this.state.idUser !== nextState.idUser) ||
                (this.state.options !== nextState.options) || 
                (this.state.idRole !== nextState.idRole) ||
                (this.state.optionsProf !== nextState.optionsProf) ||
                (this.state.idProf !== nextState.idProf))
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(nextState.idProf);
        let _that = this;
        if (((nextState.idUser !== nextProps.idUser) ||
            (this.state.idUser !== nextState.idUser) ||
            (this.state.idUser !== nextProps.idUser)) &&
            (nextProps.idUser !== undefined)) {
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/GetUserRole/' + nextProps.idUser,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                     'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
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
                     'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
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
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/AllProfessions',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                     'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
            .then(function (response) {
                _that.setState({
                    optionsProf: response.data.map( profession => ({ value: profession[0], label: profession[1] }))
                })
              })
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

    handleChangeProf = (selectedOption) => {
        if (selectedOption !== null) {
            this.setState({
                selectedOptionProf: selectedOption,
                idProf: selectedOption.value
            });
        }
    }

    nullSelect() {
        this.setState({
            idRole: 0,
            idProf: 0,
        })
    }

    handleApplyClick(){
        console.log(this.props.idUser + ' '+ this.state.idRole +' '+ this.state.idProf)
        if (this.state.idProf !== 0) {
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/ChangeRole/' +this.props.idUser+ '/' +this.state.idRole+ '/' +this.state.idProf,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
            .then(function (response) {
                console.log("successfully");
              })
        }
        else {
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + '/ChangeRole/' +this.props.idUser+ '/' +this.state.idRole,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
            .then(function (response) {
                console.log("successfully");
              })
        }
        this.props.callback();
        this.nullSelect();
    }

    render() {
        let selectProfession;
        if (this.state.idRole == 2) {
            selectProfession =   
            <div>
                <br/>
                <h5>Choose profession:</h5>                              
                <Select
                    value={this.state.idProf}
                    name="form-field-name"
                    onChange={this.handleChangeProf}
                    options={this.state.optionsProf}
                    clearable={false}
                />
            </div>
        }
        else 
            selectProfession = ""
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
                                {selectProfession}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.handleApplyClick()}>Apply</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.nullSelect()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ChangingRole.propTypes = {
    callback: PropTypes.func
};

export default ChangingRole;