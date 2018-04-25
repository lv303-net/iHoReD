import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LogbarAuth from './LogbarAuth';
import DoctorsListWithSomeRule from './DoctorsListWithSomeRule';

class AdminRulesPage extends Component {
    render () {
        return (
            <div>
                <div>
                    <LogbarAuth/>
                </div>
                <div>
                    <RulesList/>
                </div>
            </div>
        );
    }
}

var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511"
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net"

class RulesList extends Component {
    constructor() {
        super();
        this.state = {
            idArr: [],
            id: -1
          };
        this.eventHandler=this.eventHandler.bind(this);
        axios.get(server_url+'/rule')
        .then(res => {
                this.setState({
                  idArr: res.data
                });
          });
      }

      eventHandler(idP) {
        localStorage.setItem("currentProfession", idP)
        this.setState({
          id: idP
        })
      }

    render() {
        return (
            <div className = "container">
                <div className="list-group col-sm-6 float-left" id="listRules">
					<div className="list-group-item active bg-info">Rules:</div>
                	{this.state.idArr.map(idr => <div className='list-group-item list-group-item-active' key={idr.toString()}><div className='col-sm-9 float-left' onClick={() => this.eventHandler(idr.IdRule)}>{idr.RuleName}</div><div className='col-sm-3 float-right justify-content-end'><i class="fas fa-info-circle"></i><i class="fas fa-pencil-alt"></i><i class="fas fa-times"></i></div></div>)}
                </div>
                <div id="listDoctors">
                <DoctorsListWithSomeRule idRule={this.state.id}/>
                </div>                
            </div>
        )
    }
}

export default AdminRulesPage;
