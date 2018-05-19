import React from 'react';
import axios from 'axios';
import Loader from 'react-loader';
import { Link } from 'react-router-dom'
import '../style/NotFound.css'

class Direction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }
  componentDidMount() {
    var url = window.location.origin;
    setTimeout(() => {
      if (this.props.status === 1 || this.props.status === 0) window.location.href = url + "/";
    }, 4000);
  }
  render() {

    if (this.props.hasError) {
      return <div className="container mt-5">
        <h2 id="shaddow" className='font-italic text-center text-muted'>Something went wrong...</h2>
        <h5 className="text-center">
          <Link to='/'> Redirect to the main page </Link> ?
            </h5>
      </div>
    }
    else
      return (
        this.props.redirect ? (
          <div className="container mt-5">
            <h2 id="shaddow" className='font-italic text-center text-success'>{this.props.text}</h2>
          </div>
        )
          :
          <div className="container-fluid mt-5">
            <h2 id="shaddow" className='font-italic text-center text-danger'>{this.props.text}</h2>
          </div>
      );


  }
}
class ActivationLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      text: "",
      isRegistrated: 401,
      redirect: "",
      hasError: false
    };
    this.eventHandler = this.eventHandler.bind(this);
  }
  eventHandler(isReg) {
    switch (isReg) {
      case 0:
        this.setState({
          text: "You are already registered!",
          redirect: true
        });
        break;
      case -1:
        this.setState({
          text: "Please go to the main page and sign up",
          redirect: false
        })
        break;
      case 1:
        this.setState({
          text: "Congratulations, you have successfully registered in HoReD!",
          redirect: true
        });
        break;
    }
  }
  userId = this.props.match.params.id;

  componentDidMount() {
    setTimeout(() => {
      // axios.get(localStorage.getItem("server_url") + '/Registration/' + this.userId)
      axios({
        method: 'get',
        url: localStorage.getItem("server_url") + '/Registration/' + this.userId,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        }
      })
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
    const { text } = this.state;
    const { isRegistrated } = this.state;
    const { redirect } = this.state;
    const { hasError } = this.state;
    console.log(this.state.hasError);
    console.log(this.userId);
    console.log(localStorage.getItem("server_url") + '/Registration/' + this.userId)
    return (
      <div id='containerNotFound'>
        <div className="container-fluid mt-5">
          <h5 className="text-center">
            {this.state.loading ? <Loader /> : <Direction hasError={hasError} text={text} redirect={redirect} status={isRegistrated} />}
          </h5>
        </div>
      </div>
    )
  }
}

export default ActivationLink;