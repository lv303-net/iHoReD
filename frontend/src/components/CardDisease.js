import React from 'react';

class CardDisease extends React.Component {
  render() {
    return (
      <div className="card border-primary mb-3">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <div>{this.props.date}</div>
            <div>{this.props.doctor}</div>
          </div>
        </div>
        <div className="card-body text-primary">
          <h5 className="card-title">{this.props.diagnosis}</h5>
          <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#moreInfo"+this.props.treatment}>
    More info
  </button>
  <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#treatment"+this.props.treatment}>
    Treatment
  </button>
  <div className="modal" id={"moreInfo"+this.props.treatment}>
    <div className="modal-dialog">
      <div className="modal-content">
      
        <div className="modal-header">
          <h4 className="modal-title">{this.props.diagnosisFullName}</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        
        <div className="modal-body">
        {this.props.diseaseDescr}
        </div>
 
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>

   <div className="modal" id={"treatment"+this.props.treatment}>
    <div className="modal-dialog">
      <div className="modal-content">
      
        <div className="modal-header">
          <h4 className="modal-title">{this.props.diagnosisFullName}</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        
        <div className="modal-body">
        {this.props.treatmentDescr}
        </div>
 
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>

          </div>
        </div>
      </div>
    );
  }
}

export default CardDisease;