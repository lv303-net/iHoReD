import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import EditRateToProfession from './EditRateToProfession';
import 'react-datepicker/dist/react-datepicker.css';
import $ from 'jquery';

class DeleteRateToProfession extends Component{
    constructor(props){
        super(props);
        this.state = {
            startDate: moment(),
            rate: 0,
            shouldUpdate: 0
        }
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleSubmitDelete=this.handleSubmitDelete.bind(this);
        this.rate = "";
    }

    handleChangeStart(date) {
        this.setState({
          startDate: date
          
        });
    }
    
    handleSubmitDelete() {
        this.setState({
            shouldUpdate : this.state.shouldUpdate + 1
        }) 
      }
      shouldComponentUpdate(nextProps, nextState)
      {
        return((this.props.date!==nextProps.date ) || (this.state.shouldUpdate!==nextState.shouldUpdate))
      }

      componentWillUpdate(nextProps, nextState){
        if(this.state.shouldUpdate!==nextState.shouldUpdate)
        {
            var url_string = window.location.href;
            var url = new URL(url_string);
            var Profession = url.searchParams.get("prof");
            var newRate = {
            professionId: Profession,
            startDate: nextProps.date
            }   
            axios.post(localStorage.getItem("server_url") + '/api/Salary/Rate/delete', newRate)
            .then(response=>{
                    if(response==0){            
                        $('#deleting').remove();
                        // $('#registrationHeader').remove();
                        $('#textOutp').html("Please check your email."+'<br>'+"To confirm registration follow the link");
                        $('#buttonCancelForMessage').show();
                    }
                    else{            
                        $('#deleting').remove();
                        // $('#registrationHeader').remove();
                        $('#textOutp').html("ffffffffffffffffff."+'<br>'+"To confirm registration follow the link");
                        $('#buttonCancelForMessage').show();
                    }
            })
        }
      }
    render(){
        return(
            <div class="modal fade" id="DeleteRateToProfession" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="exampleModalLabel">Delete</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <div className="row mb-3 mt-5 justify-content-center" id="deleting">
                        <div className="col-xs-3 col-sm-3 col-md-3 text-center" >
                            <button type="button" className="btn btn-danger btn-lg" data-dismiss="modal">Cancel
                            </button>
                        </div>
                        <div className="col-xs-3 col-sm-3 col-md-3 text-center">
                            <button type="button" className="btn btn-info btn-lg mb-3"  onClick={() =>{this.handleSubmitDelete()}}>Submit
                        </button>
                        </div>
                        </div>
                        <div id="textOutp">
                        </div>
                        <button type="button" className="btn btn-danger btn-md " data-dismiss="modal" id="buttonCancelForMessage">Close
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteRateToProfession;