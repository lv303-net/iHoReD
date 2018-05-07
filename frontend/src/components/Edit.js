import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


var server_url;
if(process.env.NODE_ENV==="development")
  server_url="http://localhost:58511";
else if(process.env.NODE_ENV==="production")
  server_url="https://hored.azurewebsites.net";

class Edit extends React.Component {
  constructor(){
    super();
    this.state={
      id:0,
      firstName:"Name1",
      lastName:"Surname1",
      email:"example@gmail.com",
      phone:"88005553535",
      password:"qwerty",
      country:"Ukraine",
      city:"Lviv",
      street:"Fedkovycha",
      apartment:"60A",
      sex:false,
      loading:false,  
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  handleChange(event){
    this.setState({[event.target.name] : event.target.value});
  }
  submitForm(){
    axios.post(server_url+'/EditUserInfo',this.state).then(response => { 
      console.log(response+response.status)
    })
    .catch(error => {
        console.log(error.response)
    });
  }
  componentWillMount(){
    //localStorage.setItem('currentUserId','111');
    axios.get(server_url+'/GetUserInfoById/'+localStorage.getItem('currentUserId'))
    .then(res=>
      {
        this.setState({
            id:res.data.Id,
            firstName : res.data.FirstName,
            lastName: res.data.LastName,
            email:res.data.Email,
            phone:res.data.Phone,
            password:res.data.Password,
            country:res.data.Country,
            city:res.data.City,
            street:res.data.Street,
            apartment:res.data.Apartment,
            sex:res.data.Sex,
          }
        );
        document.getElementsByName('firstName')[0].value=this.state.firstName;
        document.getElementsByName('lastName')[0].value=this.state.lastName;
        document.getElementsByName('email')[0].value=this.state.email;
        document.getElementsByName('phone')[0].value=this.state.phone;
        document.getElementsByName('country')[0].value=this.state.country;
        document.getElementsByName('city')[0].value=this.state.city;
        document.getElementsByName('street')[0].value=this.state.street;
        document.getElementsByName('apartment')[0].value=this.state.apartment;
        document.getElementsByName('sex')[(this.state.sex) ? 0 : 1].checked=true;
      });
  }
  render() {
    return (
      <div id="editMainDiv">
       <div className="container col-sm-8 mt-5" id="editInfoWindow">
      <div id="editUserInfoHeader">
        <p className="col-sm-5 offset-sm-1" id="basicInfoID"><b>Basic info</b></p>
        <div>
          <label>Gender:</label>
          </div>
        <div className="col-sm-5" id="sexButtonWindow">
        
          <div className="radio col-sm-12" id="radioMaleWindow">
            <label>
              <input type="radio" name="sex"  value="true" onClick={this.handleChange}/>Male
            </label>
          </div>
          <div className="col-sm-1"></div>
          <div className="radio col-sm-12" id="radioFemaleWindow">
            <label>
              <input type="radio" name="sex" value="false" onClick={this.handleChange}/>Female
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
            <input type="text" className="form-control" placeholder="Last Name" name="lastName" onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-row mb-1">
          <div className="col-sm-4 offset-sm-1">
            <label>Email</label>
            <input type="text" className="form-control" placeholder="Email" name="email" onChange={this.handleChange}/>
          </div>
          <div className="col-sm-4 offset-sm-1">
            <label>Phone number</label>
            <input type="text" className="form-control" placeholder="Phone number" name="phone" onChange={this.handleChange}/>
          </div>
        </div>
      </div>

      <p className="marginTop35px offset-sm-1"><b>Home adress</b></p>
      <div className="form-row mb-1">
        <div className="col-sm-4 offset-sm-1">
          <label>Country</label>
          <input type="text" className="form-control" placeholder="Country" name="country" onChange={this.handleChange}/>
        </div>
        <div className="col-sm-4 offset-sm-1">
          <label>City</label>
          <input type="text" className="form-control" placeholder="City" name="city" onChange={this.handleChange}/>
        </div>
      </div>
      <div className="form-row mb-1">
        <div className="col-sm-4 offset-sm-1">
          <label>Street</label>
          <input type="text" className="form-control" placeholder="Street" name="street" onChange={this.handleChange}/>
        </div>
        <div className="col-sm-4 offset-sm-1">
          <label>Apartment</label>
          <input type="text" className="form-control" placeholder="Apartment" name="apartment" onChange={this.handleChange}/>
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
}

export default Edit;
