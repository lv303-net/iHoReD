import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';
import validator from 'validator';

class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      firstName: "Name1",
      lastName: "Surname1",
      email: "example@gmail.com",
      phone: "88005553535",
      password: "qwerty",
      country: "Ukraine",
      city: "Lviv",
      street: "Fedkovycha",
      apartment: "60A",
      sex: false,
      loading: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.validate = this.validate.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  submitForm() {
    let validator = this.validate();
    let axResponse;
    if (validator === null) {
      axResponse =
        axios({
          method: 'post',
          url: localStorage.getItem("server_url") + '/EditUserInfo',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
          },
          data: JSON.stringify(this.state)
        })
          .then(response => {
            if (response.status == 200) {
              let myColor = { background: '#00FF00', text: "#FFFFFF" };
              notify.show("Your personal information has been updated", "custom", 5000, myColor);
              localStorage.setItem("currentUserFirstName", this.state.firstName);
              localStorage.setItem("currentUserLastName", this.state.lastName);
              window.location.reload();
            }
            else {
              let myColor = { background: '#FF0000', text: "#FFFFFF" };
              notify.show(response.status + " - " + response.statusText, "custom", 5000, myColor);
            }
          })
          .catch(error => {
            //console.log(error.response);
            let myColor = { background: '#FF0000', text: "#FFFFFF" };
            notify.show(error.response.status + " - " + error.response.statusText, "custom", 5000, myColor);
          });
    }
    else {
      let myColor = { background: '#FF0000', text: "#FFFFFF" };
      notify.show(validator, "custom", 5000, myColor);
    }
    console.log(axResponse);
  }
  validate() {
    let toRet = "";
    if (!this.validateFirstName()) return "Invalid firstname!";
    if (!this.validateLastName()) return "Invalid lastname!";
    if (!this.validateEmail() || this.state.email.includes("*")) return "Invalid email!";
    if (!this.validateCity() && this.state.city !== "") return "Invalid city!";
    if (!this.validateCountry() && this.state.country !== "") return "Invalid country!";
    if (!this.validateApartment() && this.state.apartment !== "") return "Invalid apartment!";
    if (!this.validatePhone()) return "Invalid phone number!";
    if (toRet == "") return null;
    else return toRet;
  }
  componentWillMount() {
    axios({
      method: 'get',
      url: localStorage.getItem("server_url") + '/GetUserInfoById/' + localStorage.getItem('currentUserId'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
      }
    })
      .then(res => {
        this.setState({
          id: res.data.Id,
          firstName: res.data.FirstName,
          lastName: res.data.LastName,
          email: res.data.Email,
          phone: res.data.Phone,
          password: res.data.Password,
          country: res.data.Country,
          city: res.data.City,
          street: res.data.Street,
          apartment: res.data.Apartment,
          sex: res.data.Sex,
        }
        );
        document.getElementsByName('firstName')[0].value = this.state.firstName;
        document.getElementsByName('lastName')[0].value = this.state.lastName;
        document.getElementsByName('email')[0].value = this.state.email;
        document.getElementsByName('phone')[0].value = this.state.phone;
        document.getElementsByName('country')[0].value = this.state.country;
        document.getElementsByName('city')[0].value = this.state.city;
        document.getElementsByName('street')[0].value = this.state.street;
        document.getElementsByName('apartment')[0].value = this.state.apartment;
        document.getElementsByName('sex')[(this.state.sex) ? 0 : 1].checked = true;
      });
  }
  render() {
    return (
      <div id="editMainDiv">
        <Notifications />
        <div className="container col-sm-8 mt-5" id="editInfoWindow">
          <div id="editUserInfoHeader">
            <p className="col-sm-5 offset-sm-1" id="basicInfoID"><b>Basic info</b></p>
            <div>
              <label>Gender:</label>
            </div>
            <div className="col-sm-5" id="sexButtonWindow">

              <div className="radio col-sm-12" id="radioMaleWindow">
                <label>
                  <input type="radio" name="sex" value="true" onClick={this.handleChange} />Male
            </label>
              </div>
              <div className="col-sm-1"></div>
              <div className="radio col-sm-12" id="radioFemaleWindow">
                <label>
                  <input type="radio" name="sex" value="false" onClick={this.handleChange} />Female
            </label>
              </div>
            </div>
          </div>
          <div>
            <div className="form-row mb-1 marginTop10px">
              <div className="col-sm-4 offset-sm-1">
                <label>First name</label>
                <input type="text" className="form-control" placeholder="First Name" name="firstName" onChange={this.handleChange} />
              </div>
              <div className="col-sm-4 offset-sm-1">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last Name" name="lastName" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-row mb-1">
              <div className="col-sm-4 offset-sm-1">
                <label>Email</label>
                <input type="text" className="form-control" placeholder="Email" name="email" onChange={this.handleChange} />
              </div>
              <div className="col-sm-4 offset-sm-1">
                <label>Phone number</label>
                <input type="text" className="form-control" placeholder="Phone number" name="phone" onChange={this.handleChange} />
              </div>
            </div>
          </div>

          <p className="marginTop35px offset-sm-1"><b>Home adress</b></p>
          <div className="form-row mb-1">
            <div className="col-sm-4 offset-sm-1">
              <label>Country</label>
              <input type="text" className="form-control" placeholder="Country" name="country" onChange={this.handleChange} />
            </div>
            <div className="col-sm-4 offset-sm-1">
              <label>City</label>
              <input type="text" className="form-control" placeholder="City" name="city" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-row mb-1">
            <div className="col-sm-4 offset-sm-1">
              <label>Street</label>
              <input type="text" className="form-control" placeholder="Street" name="street" onChange={this.handleChange} />
            </div>
            <div className="col-sm-4 offset-sm-1">
              <label>Apartment</label>
              <input type="text" className="form-control" placeholder="Apartment" name="apartment" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-row mb-2 justify-content-end col-sm-10 padding">
            <Link to="/">
              <button type="button" className="btn btn-error mr-3">Go back</button>
            </Link>
            <button type="button" className="btn btn-primary btn-md btn-clr" onClick={this.submitForm}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
  validateFirstName() {
    return (validator.isAlpha(this.state.firstName, 'en-GB'));
  }

  validateLastName() {
    return (validator.isAlpha(this.state.lastName, 'en-GB'));
  }

  validatePhone() {
    return (validator.isMobilePhone(this.state.phone, 'uk-UA'));
  }

  validateEmail() {
    return (validator.isEmail(this.state.email));
  }
  validateCountry() {
    return (validator.isAlpha(this.state.country, 'en-GB'));
  }
  validateCity() {
    return (validator.isAlpha(this.state.city, 'en-GB'));
  }
  validateApartment() {
    return (!validator.isEmpty(this.state.apartment)); //Apartment can contain symbols like ' ' or '/', letters and numbers
  }
}

export default Edit;
