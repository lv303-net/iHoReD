import React from 'react';
import { Component } from 'react';
import VisitDescription from '../components/VisitDescription';
import axios from 'axios';
class AddMedRecord extends Component {
    constructor(props){
        super(props);
        this.getText = this.getText.bind(this);
        this.state = {
            treatment:"",
            description:""
        };
    }
    
    SaveAll()
{
    var data ={
        user:this.props.user,
        startDate:this.props.startDate,
        description:this.state.description,
        treatment:this.state.treatment
      }
    axios.post(localStorage.getItem("server_url") + '/api/Login',data).catch(function (response) {
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
      <div id="mainDiv">
<div>
<VisitDescription getText={this.getText} newTreatment={this.state.treatment} newDescription={this.state.description}/>
</div>
<div className="container">
<div className="btn-group-lg">
<button type="button" class="btn btn-primary btn-lg float-left" onClick={this.SaveAll()}>Save</button>
</div>
<button type="button" class="btn btn-danger btn-lg float-right">Cancel</button>
      </div>
      </div>
    );
  }
}

export default AddMedRecord;
