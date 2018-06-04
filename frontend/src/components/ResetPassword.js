import React from 'react';
import axios from 'axios';
import Loader from 'react-loader';
import { Link } from 'react-router-dom';
import '../style/NotFound.css'
import '../style/Navbar.css';
import '../style//ResetPassword.css';
import validator from 'validator';
import Notifications, {notify} from 'react-notify-toast';
import { withRouter } from 'react-router';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
      this.emailRegistr ='';
      this.passwordRegistr = '';
      this.confirmPasswordRegistr = '';

      this.divPassRegistr = React.createRef();
      this.divConfirmPassRegistr = React.createRef();
      this.btnResetPassword = React.createRef();

      this.validAll = false;
      this.validPasword = false;
      this.validConfirmPassword = false;
  }

  handleSubmitResetPassword = event => {
    event.preventDefault();
    var resetPassModel = {
      Email: this.emailRegistr,
      NewPassword:  this.passwordRegistr,
      Link: this.props.match.params.link
    };
   
    if (this.validAll) {
      axios({
        method: 'post',
        url: localStorage.getItem("server_url") + '/ResetPassword',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(resetPassModel)
      })
        .then(response => {
          if (response.data === 1){
            notify.show("You have succefully change the password", "custom", 5000, { background: 'green', text: "#FFFFFF" });
            this.props.history.push('/');
          }
          else
            notify.show("Invalid input data. Check out Your creds.", "custom", 5000, { background: '#FF0000', text: "#FFFFFF" });
        })
        .catch(error => {
          notify.show("something went wrong", "custom", 5000, { background: '#FF0000', text: "#FFFFFF" });
      });
    }
  }

  checkPassword() {
    var password = this.passwordRegistr;
    var confirmPassword = this.confirmPasswordRegistr;
    if (password !== confirmPassword) {
      this.validConfirmPassword = false;
      return false;
    }
    else {
      this.validConfirmPassword = true;
      return true;
    }
  }

  hideError(divName, inputName) {
    document.getElementById(inputName).style.borderColor = '#ced4da';
    divName.current.textContent = '';
  }

  showError() {
    if (this.validPasword && this.validConfirmPassword) {
      this.validAll = true;
    }
    else {
      this.validAll = false;
      if (this.validPasword) {
        document.getElementById("newPassword").style.borderColor = 'green';
        this.divPassRegistr.current.textContent = '';
      }
      else {
        document.getElementById("newPassword").style.borderColor = '#f74131';
        this.divPassRegistr.current.textContent = "Please enter a valid password";
      }
      if (this.validConfirmPassword) {
        document.getElementById("confirmNewPassword").style.borderColor = 'green';
        this.divConfirmPassRegistr.current.textContent = '';
      }
      else {
        document.getElementById("confirmNewPassword").style.borderColor = '#f74131';
        this.divConfirmPassRegistr.current.textContent = "Your passwords don't match";
      }
    }
  }

  validatePassword() {
    if (validator.isLength(this.passwordRegistr, 8, 30) && !validator.isAlphanumeric(this.passwordRegistr)
      && validator.matches(this.passwordRegistr, '[A-Z]') && validator.matches(this.passwordRegistr, '[a-z]') && validator.matches(this.passwordRegistr, '[0-9]')) {
      this.validPasword = true;
      return true;
    } else {
      this.validPasword = false;
      return false;
    }
  }

  render() {
    return ( 
      <div id="mainDivReset">
        <div className="container-fluid my-5">
          <div className="container">
            <Notifications/>
            <div>
              <div className="m-2 row">
                <h1 className="modal-title text-center col-12" id="registrationHeader">Resetting password</h1>
              </div>
              <div className="my-5 row">
                <p>New password should contain at least 8 characters, one special character, one number, one upper-case letter, one lower-case letter. The maximum password length is 30 characters.</p>
              </div>
              <div className="row my-5">
                <form className="col-md-12" onSubmit={this.handleSubmitResetPassword}>
                  <div className="form-row">
                    <div className="form-group justify-content-center col-sm-4 col-xs-12 mb-0">
                      <p className="labelFormReset">Email:</p>
                    </div>
                    <div className="form-group col-sm-7 col-xs-12" >
                      <input type="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={x => { this.emailRegistr = x.target.value; } }
                        required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group justify-content-center col-sm-4 col-xs-12 mb-0">
                      <p className="labelFormReset">New password:</p>
                    </div>
                    <div className="form-group col-sm-7 col-xs-12" id="inputNewPassword">
                      <input type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(x => { this.passwordRegistr = x.target.value; this.validatePassword(); this.hideError(this.divPassRegistr, 'newPassword') })}
                        id="newPassword"
                        required />
                      <div id="invalidPassword" className="text-muted" ref={this.divPassRegistr}>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group justify-content-center col-sm-4 col-xs-12 mb-0">
                      <p className="labelFormReset">Confirm new password:</p>
                    </div>
                    <div className="form-group col-sm-7 col-xs-12" id="inputConfirmNewPassword">
                      <input type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        onChange={(x => { this.confirmPasswordRegistr = x.target.value; this.checkPassword(); this.hideError(this.divConfirmPassRegistr, 'confirmNewPassword') })}
                        onPaste={x => { x.preventDefault() }}
                        id="confirmNewPassword"
                        required />
                      <div id="invalidConfirmPassword" className="text-muted" ref={this.divConfirmPassRegistr}>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <button id="btnReset" type="submit" ref={this.btnResetPassword} onClick={(x => this.showError())} className="btn btn-info btn-lg mb-3 col-md-3 sm-12">Ok
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ResetPassword);