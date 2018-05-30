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

  componentDidMount() {
    setTimeout(() => {
      axios.get(localStorage.getItem("server_url") + '/Registration/' + this.userId)
         .then(rez => {
          this.setState({ isRegistrated: rez.data });
          this.eventHandler(this.state.isRegistrated);
          console.log("hello");
        })
        .catch(err => this.setState({ hasError: true }),
          console.log("hellczdco"));
      this.setState({ loading: false });

    }, 2000);
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default ResetPassword;