import React from 'react';
import axios from 'axios';
import Loader from 'react-loader';
import { Link } from 'react-router-dom'
import '../style/NotFound.css'

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };  
  }

  token = this.props.match.params.token;

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default ResetPassword;