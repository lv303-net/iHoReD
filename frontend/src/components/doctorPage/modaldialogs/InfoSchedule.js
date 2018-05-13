import React from 'react';
import { Component } from 'react';
import axios from 'axios';

class InfoSchedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            idPatient: 0
        }
    }

    componentDidMount()
    {

        axios.get(localStorage.getItem("server_url") + '/AllProfessions')
        .then(res => {
            this.setState({
                professionsArr: res.data
            });
        });
    }

    handleClicking(){
        
        window.location.href = window.location.origin+'/user/medicalCard/'+this.state.idPatient;
      }

    render(){
        return(
            <div className="modal fade" id="BlockClickModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h4 className="modal-title" id="mModalLabel">Some info about patient.</h4>
                        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button> 
                        </div>
                        <div className="modal-body" id="patientModal">
                        Patient ID - {this.props.idPatient} 
                        Patient Name - {this.props.namePatient}
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-info btn-lg" onClick={()=>this.handleClicking()} data-dismiss="modal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoSchedule;