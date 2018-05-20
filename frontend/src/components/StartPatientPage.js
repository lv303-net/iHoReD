import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import LogbarAuth from './LogbarAuth';

class StartPatientPage extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <LogbarAuth />
        <div className="wrapper row mt-4">
          <AllRecords />
        </div>
      </div>
    );
  }
}

function AllRecords(props) {
  return <div className="col sm-6 md-8 lg-9 xl-10">
    <div className="container table-responsive">
    </div>
    <div className="form-row col sm-4 mb-1 justify-content-center">
      <div className="form-row mb-2 col-sm-2 justify-content-center">
        <Link to="/editUserInfo">
          <button type="button" className="btn btn-primary btn-md">Edit information</button>
        </Link>
      </div>
      <div className="form-row mb-2 col-sm-2 justify-content-center">
        <Link to="/allDiagnoses">
          <button type="button" className="btn btn-primary btn-md">All diagnoses</button>
        </Link>
      </div>
    </div>
  </div>
}
export default StartPatientPage;