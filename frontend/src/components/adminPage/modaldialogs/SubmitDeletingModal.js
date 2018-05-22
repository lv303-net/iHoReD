import React from 'react';
import { Component } from 'react';
import axios from 'axios';

class SubmitDeleting extends Component {
    DeleteCurrentRule() {
        axios({
            method: 'post',
            url: localStorage.getItem("server_url") + '/rule/' + this.props.currentRule.IdRule + '/delete',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            },
        })
            .then(
                console.log("Deleted rule with id" + this.props.currentRule.RuleName)
            )
            .catch(error => {
                console.log(error.message);
            })
    }

    render() {
        return (
            <div className="modal fade" id="submitDeletingData" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Attention!</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h4>Are you sure that you want delete {this.props.currentRule.RuleName}?</h4>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.DeleteCurrentRule()}>Yes</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SubmitDeleting;