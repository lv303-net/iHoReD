import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class SubmitDeleting extends Component {
    constructor(props){
        super(props);
    }

    DeleteCurrentRule(){
        axios.post(server_url + '/rule/' + this.props.currentRule.IdRule + '/delete')
        .then(
            console.log("Deleted rule with id" + this.props.currentRule.RuleName)
        )
        .catch(error => {
            console.log(error.message);
        })
    }

    render(){
        return(
            <div class="modal fade" id="submitDeletingData" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="exampleModalLabel">Attention!</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h4>Are you sure that you want delete {this.props.currentRule.RuleName}?</h4>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                            <button type="button" class="btn btn-primary" onClick={() => this.DeleteCurrentRule()}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SubmitDeleting;