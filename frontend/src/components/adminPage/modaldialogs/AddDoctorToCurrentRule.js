import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader';

class AddDoctorToCurrentRule extends Component{
    constructor(props){
        super(props);
        this.state = {
            listDoctors: [],
            loaded: false,
            shouldUpdate: false
        }
    }

    listIdMustBeAssigning = [];

    AddDoctorsToRule(){
        this.listIdMustBeAssigning.map((idDoctor) =>
            {
                var model = {
                    IdDoctor: idDoctor,
                    IdRule: this.props.IdRule
                }
                axios({
                    method: 'post',
                    url: localStorage.getItem("server_url") + "/Rule/" + model.IdRule + "/DoctorHasRule/false/" + model.IdDoctor + "/Assign",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                    },
                    data: JSON.stringify(model)
                })
                .then(res => {
                    if(this.listIdMustBeAssigning.length == 1){
                        this.props.updateDoctorsList()
                        this.listIdMustBeAssigning.splice(0,1)
                        this.setState({
                            shouldUpdate: !this.state.shouldUpdate
                        })
                    }
                    else{
                    this.listIdMustBeAssigning.splice(0,1)
                    }
                })
                .catch()
            }
        )
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.IdRule !== nextProps.IdRule || 
            this.state.listDoctors !== nextState.listDoctors ||
            this.state.shouldUpdate !== nextState.shouldUpdate ||
            this.props.shouldUpdate !== nextProps.shouldUpdate
        );
    }

    componentWillUpdate(nextProps, nextState)
    {
        if(this.props.IdRule !== nextProps.IdRule || this.state.shouldUpdate !== nextState.shouldUpdate ||
            this.props.shouldUpdate !== nextProps.shouldUpdate){
            this.setState({
                loaded: false
            })
            axios({
                method: 'get',
                url: localStorage.getItem("server_url") + "/Rule/" + nextProps.IdRule + "/DoctorHasRule/false",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            })
            .then(res => {
                this.setState({
                    listDoctors: res.data,
                    loaded: true,
                })
                this.props.dismissUpdate()
                if(this.state.shouldUpdate !== nextState.shouldUpdate){
                    this.setState({
                        shouldUpdate: !this.state.shouldUpdate
                    })
                }
            })
            .catch(
                error => {console.log(error.message)}
            )
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        this.setState({
            loaded: false
        })
    }

    render(){
        return(
            <div className="modal fade" id="addDoctorToPageModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Doctors:</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Loader loaded={this.state.loaded}/>
                            <div className="list-group col-sm-6 mt-4 padding-l-r-10px col-sm-12">
                                {this.state.listDoctors.map((doctor) => <div className="list-group-item list-group-active" key={doctor.Id.toString() + "addDoctorToCurrentRule"}>
                                    <label className="form-check-label d-flex justify-content-between">{doctor.FirstName + ' ' + doctor.LastName}
                                        <input className="form-check-input" type="checkbox" id={doctor.Id + 'AddDoctorCheckbox'} onChange={(x)=> {
                                            if(x.target.checked)
                                            {
                                                this.listIdMustBeAssigning.push(doctor.Id);
                                            }
                                            else {
                                                this.listIdMustBeAssigning.splice(this.listIdMustBeAssigning[doctor.Id],1);
                                            }
                                            }}/>
                                    </label>
                                </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => this.AddDoctorsToRule()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddDoctorToCurrentRule;