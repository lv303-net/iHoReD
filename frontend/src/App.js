import React from 'react';
import { Component } from 'react';
import './App.css';
import ProfessionsTable from './components/ProfessionsTable';

class App extends Component {
 
  render() {
    return(
      <div id="mainDiv">
        <div className="container-fluid mt-5">
          <div >
            <ProfessionsTable />           
          </div> 
        </div>
      </div>
    );
  }
}

export default App;
