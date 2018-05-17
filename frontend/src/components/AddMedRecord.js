import React from 'react';
import { Component } from 'react';
import VisitDescription from '../components/VisitDescription';
import axios from 'axios';
class AddMedRecord extends Component {
    constructor(props){
        super(props);
        this.state = {
            treatment:"",
            description:""
        };
        this.getText = this.getText.bind(this);
        this.SaveAll = this.SaveAll.bind(this);
        this.redirectToSchedule = this.redirectToSchedule.bind(this);
    }
    redirectToSchedule()
    {
        window.location.href = window.location.origin + '/doctor/mySchedule';
    }
    SaveAll()
    {
        var data ={
            IdPatient:this.props.PatientId,
            StartTime:this.props.Visit,
            Description:this.state.description,
            Treatment:this.state.treatment
        }
        axios.post(localStorage.getItem("server_url") + '/api/PatientData/AddMedicalRecord',data).catch(function (response) {
            console.log(response);
        });
    }

    getText(t,val)
    {
        if(val==1)
        {
            this.setState({description:t});
        }
        else
        {
            this.setState({treatment:t});
        }
    }



  render() {
    return(
      <div>
<div>
<VisitDescription getText={this.getText} newTreatment={this.state.treatment} newDescription={this.state.description}/>
</div>
<div className="row">
<div className="container">
<div className="btn-group-lg">
<button type="button" class="btn btn-info btn-lg float-left" onClick={this.SaveAll}>Save</button>
<button type="button" class="btn btn-danger btn-lg float-right" onClick={this.redirectToSchedule}>Cancel</button>
</div>
</div>
      </div>
      </div>
    );
  }
}

export default AddMedRecord;
