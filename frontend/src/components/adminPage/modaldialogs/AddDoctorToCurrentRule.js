import React from 'react';
import { Component } from 'react';
import axios from 'axios';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class AddDoctorToCurrentRule extends Component{
    constructor(props){
        super(props);
        this.state = {
            listDoctors: []
        }
    }

    
    
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.IdRule !== nextProps.IdRule);
    }

    componentWillUpdate(nextProps, nextState)
    {
        axios.get(server_url + "/Rule/" + nextProps.IdRule + "/DoctorHasRule/false")
        .then(res => {
            this.setState({
                listDoctors: res.data
            })
        })
        .catch(
            error => {console.log(error.message)}
        )
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
                            {this.state.listDoctors.map((doctor) => <div>
                                <h4>{doctor.FirstName + ' ' + doctor.LastName}</h4>
                            </div>
                            )}
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