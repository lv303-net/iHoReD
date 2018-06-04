import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import NotAuthenticated from './components/NotAuthenticated';
import jwt_decode from 'jwt-decode';

class PrivateRoute extends Component {
    shouldRoute(){
        var resultFromSyncApiCall = false;
        if(typeof this.props.accessLevel!=='undefined')
        {
            if(localStorage.getItem('accessToken')!==null)
            {
                let jwtTokenInfo = jwt_decode(localStorage.getItem('accessToken'));
                Object.keys(jwtTokenInfo).map(key=>{if(key.indexOf('role')>=0){
                    if(this.props.accessLevel.includes(jwtTokenInfo[key])) {resultFromSyncApiCall=true;}}});
            }
        }
        else
            {
                resultFromSyncApiCall=true;
            }
        return resultFromSyncApiCall;
    }
    returnRoute()
    {
        if(this.shouldRoute())
        {
            return <Route path={this.props.path} component={this.props.component}/>
        }
        else
        {
            return <Route component={NotAuthenticated} />
        }
    }
    render()
    {
        return(
            <div>
            {this.returnRoute()}
            </div>
        )
        
    }
  }
  export default PrivateRoute;