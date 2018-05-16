import React from 'react';
import { Component } from 'react';
import $ from 'jquery';
class VisitDescription extends Component {
    constructor(props){
        super(props);
       
    }
    saveText(e)
    {
        e.preventDefault();
        var caller = e.target;
       var text = caller.value;
       if(caller.id=="descriptionOfVisit")
       {
        this.props.getText(text,1);
       }
       else
       {
        this.props.getText(text,2);
       }

    }
  render() {
    return(
      <div id="mainDiv">
      <form>
    <div className="container">
      <div className="row">
      <div className="col-md-6">
  <div class="form-group">
    <label for="descriptionOfVisit">Add description of a visit</label>
    <textarea class="form-control" id="descriptionOfVisit" rows="3" onBlur={e=>(this.saveText(e))}>{this.props.newDescription}</textarea>
  </div>
  </div>
  <div className="col-md-6">
  <div class="form-group">
    <label for="treatmentOfVisit">Add treatment of a visit</label>
    <textarea class="form-control" id="treatmentOfVisit" rows="3" onBlur={e=>(this.saveText(e))}>{this.props.newTreatment}</textarea>
  </div>
  </div>
  </div>
  </div>
</form>
      </div>
    );
  }
}

export default VisitDescription;
