import * as React from 'react';
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

        axios.get(server_url+'/rule')
        .then(res => {
        res.data.forEach(profession => {
          document.getElementById("rulesList").innerHTML 
           //+= '<div  class="list-group-item list-group-item-active" id="'+profession[0]+'">'// + this.setProfession(); + '
           += '<div  class="list-group-item list-group-item-active" onclick={localStorage.setItem("currentProfession",' + profession[0] + ')}>'
           + profession[1] + '</div>';
        });
      });
    }
    render() {
        return (
            <div id="rulesList">
                
            </div>
        )
    }
}

export default AdminRulesPage;