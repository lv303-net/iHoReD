import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader';

class AddDoctorToCurrentRule extends Component{
    constructor(props){
        super(props);
        this.state = {
            listDoctors: [],
            loaded: false
        }
    }

    AddDoctorToRule(idDoctor){
        var model = {
            IdDoctor: idDoctor,
            IdRule: this.props.IdRule
        }
        axios.post(localStorage.getItem("server_url") + "/Rule/" + this.props.IdRule + "/DoctorHasRule/false/" + idDoctor + "/Assign", model)
        .then()
        .catch()
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.IdRule !== nextProps.IdRule || this.state.listDoctors !== nextState.listDoctors);
    }

    componentWillUpdate(nextProps, nextState)
    {
        if(this.props.IdRule !== nextProps.IdRule){
            this.setState({
                loaded: false
            })
            axios.get(localStorage.getItem("server_url") + "/Rule/" + nextProps.IdRule + "/DoctorHasRule/false")
            .then(res => {
                this.setState({
                    listDoctors: res.data,
                    loaded: true
                })
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
            <div class="modal fade" id="addDoctorToPageModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="exampleModalLabel">Doctors:</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <Loader loaded={this.state.loaded}/>
                            <div className="list-group col-sm-6 mt-4 padding-l-r-10px col-sm-12">
                                {this.state.listDoctors.map((doctor) => <div className="d-flex flex-row justify-content-between list-group-item list-group-active">
                                    <div>{doctor.FirstName + ' ' + doctor.LastName}</div>
                                    <i className="fa fa-plus" onClick={() => this.AddDoctorToRule(doctor.Id)}></i>
                                </div>
                                )}
                            </div>
                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddDoctorToCurrentRule;