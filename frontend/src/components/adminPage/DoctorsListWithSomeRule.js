import React from 'react';
import { Component } from 'react';
import axios from 'axios';

class DoctorsListWithSomeRule extends Component {
    constructor(props){      
        super(props);
        this.state = { doc: [], idRule: 0 };      
        }
  
        DissmissDoctorFromCurrentRule(idDoc)
        {
          var model = {
            IdRule: this.state.idRule,
            IdDoctor: idDoc
          }
          axios.post(localStorage.getItem("server_url") + "/Rule/" + this.state.idRule + "/DoctorHasRule/" + idDoc +"/Dismiss", model)
          .then()
          .catch()
        }

        shouldComponentUpdate(nextProps, nextState) {
          return (this.state.idRule !== nextProps.idRule); 
        }

        componentWillUpdate(nextProps, nextState){
        axios.get(localStorage.getItem("server_url") + '/rule/' + nextProps.idRule + '/DoctorHasRule')
        .then(res => {
          this.setState({
            idRule: nextProps.idRule,
            doc: res.data
          })
        });
      }
        
      render(){
        return  (
            <div className="list-group col-sm-6 mt-4 padding-l-r-10px">
              <div className="list-group-item active">Doctors:</div>
              {this.state.doc.map(doc => <div className="list-group-item list-group-active d-flex flex-row justify-content-between">
                  <div key={doc.toString()}>{doc.FirstName + ' ' + doc.LastName}</div>
                  <div>  
                    <i className="fa fa-times align-middle" onClick={() => this.DissmissDoctorFromCurrentRule(doc.Id)}></i>
                  </div>
                </div>
                )}                  
            </div>
        );
    }
}

export default DoctorsListWithSomeRule;

