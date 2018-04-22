import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LogbarAuth from './LogbarAuth';

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
          }

        axios.get(server_url+'/rule')
        .then(res => {
            res.data.forEach(rules => {
              document.getElementById("listRules").innerHTML 
               += '<button  class="list-group-item list-group-item-active d-flex justify-content-between" onclick={this.buttonClicked}>'
               + rules.RuleName + '</button>';
            });
          });
      }
buttonClicked() {
    document.getElementById("listDoctors").innerHTML = <DoctorsListWithSomeRule/>;
}

    render() {
        return (
            <div className = "container">
                <div className="list-group col-sm-6" id="listRules">
                </div>
                <div className="list-group col-sm-6" id="listDoctors">
                </div>
            </div>
        )
    }
}

class DoctorsListWithSomeRule extends Component {
    render () {
        return (
            <p>some</p>
        )
    }
}

export default AdminRulesPage;