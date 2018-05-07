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
            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={"#" + this.props.treatment + ".1"} aria-expanded="false" >More info</button>
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target={"#" + this.props.treatment + ".2"} aria-expanded="false">Treatment</button>
          </div>
          <div className="row">
            <div className="col">
              <div className="collapse multi-collapse" id={this.props.treatment + ".1"}>
                <div className="card card-body">
                  {this.props.diseaseDescr}
                </div>
              </div>
            </div>
            <div class="col">
              <div class="collapse multi-collapse" id={this.props.treatment + ".2"}>
                <div class="card card-body">
                  {this.props.treatmentDescr}
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