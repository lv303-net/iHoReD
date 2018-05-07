import React from 'react';
import { Component } from 'react';
import LogbarWrapper from './LogbarWrapper';

class Diagnoses extends Component {
  render() {
    return (
        <div className="App container-fluid">
        <LogbarWrapper/>
        <div className="wrapper row mt-4">
        <AllDiagnoses/>
        </div>
      </div>
    );
  }
}
  
function AllDiagnoses(props){
  return <div className="col sm-1 md-8 lg-9 xl-10">
  <div className="container table-responsive">
    <table className="table table-bordered table-hover table-light">
      <thead>
        <tr>
          <th colSpan="8" className="bg-info text-white">Diagnoses</th>
        </tr>
        <tr>
          <th>№</th>
          <th>Diagnos</th>
          <th>Srart</th>
          <th>Finish</th>
          <th>Doctor</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>2</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>3</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>4</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>5</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
}
export default Diagnoses;