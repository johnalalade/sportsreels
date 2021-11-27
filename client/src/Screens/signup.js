import React, { useState, Component } from "react";
import logo from '../Images/logo.png'
import { Progress } from "reactstrap";
import "./login.css";
import axios from "./axios";
import player from "../Images/player-e.png"

import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    // width: "60%",
    minHeight: "1000vh",
    // display: "flex",
    // height: "80vh",
    transform: "translate(-50%, -50%)",
    transition: "1s ease",
    backgroundColor: "#0f1419",
    // margin: "20px",
    // marginBottom: "30px",
    borderRadius: "10px",
    boxShadow: "0 0px 5px rgba(80, 80, 80, 0.3), 0 0px 5px rgba(80, 80, 80, 0.3)",
  },
};

var date = new Date();
date.getFullYear();
var year = date.toString();

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      err: "",
      loaded: null,
      modal: false,
      fullname: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      dob: "",
      country: "Nigeria",
      countries: ['Afghanistan',
      'Albania',
      'Algeria',
      'Andorra',
      'Angola',
      'Antigua & Deps',
      'Argentina',
      'Armenia',
      'Australia',
      'Austria',
      'Azerbaijan',
      'Bahamas',
      'Bahrain',
      'Bangladesh',
      'Barbados',
      'Belarus',
      'Belgium',
      'Belize',
      'Benin',
      'Bhutan',
      'Bolivia',
      'Bosnia Herzegovina',
      'Botswana',
      'Brazil',
      'Brunei',
      'Bulgaria',
      'Burkina',
      'Burundi',
      'Cambodia',
      'Cameroon',
      'Canada',
      'Cape Verde',
      'Central African Rep',
      'Chad',
      'Chile',
      'China',
      'Colombia',
      'Comoros',
      'Congo',
      'Congo {Democratic Rep}',
      'Costa Rica',
      'Croatia',
      'Cuba',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Djibouti',
      'Dominica',
      'Dominican Republic',
      'East Timor',
      'Ecuador',
      'Egypt',
      'El Salvador',
      'Equatorial Guinea',
      'Eritrea',
      'Estonia',
      'Ethiopia',
      'Fiji',
      'Finland',
      'France',
      'Gabon',
      'Gambia',
      'Georgia',
      'Germany',
      'Ghana',
      'Greece',
      'Grenada',
      'Guatemala',
      'Guinea',
      'Guinea-Bissau',
      'Guyana',
      'Haiti',
      'Honduras',
      'Hungary',
      'Iceland',
      'India',
      'Indonesia',
      'Iran',
      'Iraq',
      'Ireland {Republic}',
      'Israel',
      'Italy',
      'Ivory Coast',
      'Jamaica',
      'Japan',
      'Jordan',
      'Kazakhstan',
      'Kenya',
      'Kiribati',
      'Korea North',
      'Korea South',
      'Kosovo',
      'Kuwait',
      'Kyrgyzstan',
      'Laos',
      'Latvia',
      'Lebanon',
      'Lesotho',
      'Liberia',
      'Libya',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Macedonia',
      'Madagascar',
      'Malawi',
      'Malaysia',
      'Maldives',
      'Mali',
      'Malta',
      'Marshall Islands',
      'Mauritania',
      'Mauritius',
      'Mexico',
      'Micronesia',
      'Moldova',
      'Monaco',
      'Mongolia',
      'Montenegro',
      'Morocco',
      'Mozambique',
      'Myanmar, {Burma}',
      'Namibia',
      'Nauru',
      'Nepal',
      'Netherlands',
      'New Zealand',
      'Nicaragua',
      'Niger',
      'Nigeria',
      'Norway',
      'Oman',
      'Pakistan',
      'Palau',
      'Panama',
      'Papua New Guinea',
      'Paraguay',
      'Peru',
      'Philippines',
      'Poland',
      'Portugal',
      'Qatar',
      'Romania',
      'Russian Federation',
      'Rwanda',
      'St Kitts & Nevis',
      'St Lucia',
      'Saint Vincent & the Grenadines',
      'Samoa',
      'San Marino',
      'Sao Tome & Principe',
      'Saudi Arabia',
      'Senegal',
      'Serbia',
      'Seychelles',
      'Sierra Leone',
      'Singapore',
      'Slovakia',
      'Slovenia',
      'Solomon Islands',
      'Somalia',
      'South Africa',
      'South Sudan',
      'Spain',
      'Sri Lanka',
      'Sudan',
      'Suriname',
      'Swaziland',
      'Sweden',
      'Switzerland',
      'Syria',
      'Taiwan',
      'Tajikistan',
      'Tanzania',
      'Thailand',
      'Togo',
      'Tonga',
      'Trinidad & Tobago',
      'Tunisia',
      'Turkey',
      'Turkmenistan',
      'Tuvalu',
      'Uganda',
      'Ukraine',
      'United Arab Emirates',
      'United Kingdom',
      'United States',
      'Uruguay',
      'Uzbekistan',
      'Vanuatu',
      'Vatican City',
      'Venezuela',
      'Vietnam',
      'Yemen',
      'Zambia',
      'Zimbabwe'],
      sport: [],
      sports: ["Badminton", "Basketball", "Cricket", "Esport", "Football", "Golf", "Gymnastics", "Hockey", "Lawn Tenis", "Squash", "Swimming", "Table Tenis", "Taekwondo"],
      src: "",
      signed: false,
      scout: false,
      role: "Athlete",
      password: "",
      cpassword: "",
      passwordError: "",
      cpasswordError: "",
      err: "",
      modal: false,
      modal2: true,
      loaded2: null,
      isOpen: false,
      typeP: true,
      step: 1,
      img: null
    };
  }

  // Next
  nextStep = () => {
    const { step } = this.state
    this.setState({
      step: step + 1
    })
  }

  // Previous
  prevStep = () => {
    const { step } = this.state
    this.setState({
      step: step - 1
    })
  }

  componentDidMount() {
    const sorter = (a, b) => {
      if (a.name > b.name) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      }
      return 0
    }

  }

  visibility = () => {
    this.setState({
      typeP: !this.state.typeP
    })
  }

  toggleModal = (event) => {
    // console.log(event);
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  modal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  log = (ev) => {
    ev.preventDefault();
    this.props.history.replace(`/signup`);
  };
  userN = (ev) => {
    let name = ev.target.value.toLowerCase();
    this.setState({ userName: name });
  };
  password = (ev) => {
    let password = ev.target.value;
    this.setState({ password: password });
  };
  click = (ev) => {
    ev.preventDefault();
  };

  submit1 = (ev) => {
    ev.preventDefault();
    let user = {
      userName: this.state.userName,
      password: this.state.password,
    };
    if (
      user.userName.trim() == ""
    ) {
      toast.error(
        "Please use correct student email..."
      );
    }
    else if (user.password.trim() == "" || user.password.trim().length < 8) {
      toast.error("Please use correct 8 character password")
    }
    else {
      toast.success("Loading...")
      axios
        .post("/login", user, {
          onUploadProgress: (ProgressEvent) => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
            });
          },
        })
        .then((res) => {
          if (res.data.id && !res.data.response.isTutorial) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("username", res.data.response.username);
            localStorage.setItem("src", res.data.response.src);
            localStorage.setItem("department", res.data.response.department);
            localStorage.setItem("level", res.data.response.level);
            localStorage.setItem("phone", res.data.response.phone);
            localStorage.setItem("email", res.data.response.email);
            localStorage.setItem("firstname", res.data.response.firstname);
            localStorage.setItem("isVerified", res.data.response.isVerified);
            localStorage.setItem("PathToSearch", "")
            if (localStorage.getItem('redirect') !== null) {
              window.location = `/${localStorage.getItem('redirect')}?oau=true`
            }
            else {
              window.location = `/welcome`
            }
          }
          else {
            toast.error(
              "Login failed, " + res.data.message
            )
          }
        })
        .then((res) => {
          this.setState({ loaded: 0 });

        })

        .catch((err) => {
          toast.error(
            "Login Failed, Please use correct student email and your correct 8 character password"
          );
        });
    }
  };

  // Signup
  filer = (ev) => {
    this.setState({
      checkerImg: "loading",
    });

    let file = ev.target.files[0];
    if (file.size > 5000 * 5000 * 5) {
      toast.error("Attachment Size Too Large (max 5mb)");
    } else {
      this.setState({
        img: ev.target.files[0],
        src: window.URL.createObjectURL(ev.target.files[0]),
      });
    }
  };
  log = (ev) => {
    ev.preventDefault();
    this.props.history.push(`/`);
  };
  fullname = (ev) => {
    let name = ev.target.value;
    this.setState({ fullname : name, err: "" });
  };
  lastN = (ev) => {
    let name = ev.target.value;
    this.setState({ lastName: name, err: "" });
  };
  username = (ev) => {
    let name = ev.target.value;
    this.setState({ username: name, err: "" });
  };
  phone = (ev) => {
    let name = ev.target.value;
    this.setState({ phone: name, err: "" });
  };
  email = (ev) => {
    let name = ev.target.value.toLowerCase();
    this.setState({ email: name, err: "" });
  };
  date = (ev) => {
    let dept = ev.target.value;
    this.setState({ dob: dept, err: "" });
  };
  sport = (ev) => {
    let sp = ev.target.value;
    this.setState({ sport: [...this.state.sport, sp], err: "" });
  };
  country = (ev) => {
    let school = ev.target.value
    this.setState({ country: school, err: '' })
  }
  role = (ev) => {
      let role = ev.target.value
      this.setState({ role })
  }
  isSigned = (ev) => {
    let signed = ev.target.value
    this.setState({ signed })
}
scouting = (ev) => {
  let scout = ev.target.value
  this.setState({ scout })
}
  pword = (ev) => {
    let password = ev.target.value;
    if (this.state.password.length < 7) {
      this.setState({ passwordError: "Password too short (8)" });
    } else {
      this.setState({ passwordError: "Password Okay!!!" });
    }
    this.setState({ password, err: "" });
  };
  cpword = (ev) => {
    let cpassword = ev.target.value;
    if (this.state.password === cpassword) {
      this.setState({ cpasswordError: "Password Match!!!" });
    } else {
      this.setState({ cpasswordError: "Password does not match!!!" });
    }
    this.setState({ cpassword });
  };
  click = (ev) => {
    ev.preventDefault();
  };

  submit = (ev) => {
    ev.preventDefault();
    let data = new FormData();
    if (this.state.img) {
      data.append("file", this.state.img);
      data.append("filename", this.state.img.name);
    }
    data.append("fullname", this.state.fullname);
    data.append("scout", this.state.scout);
    data.append("email", this.state.email);
    data.append("country", this.state.country);
    data.append("sport", this.state.sport);
    data.append("role", this.state.role);
    data.append("signed", this.state.signed);
    data.append("password", this.state.password);
    let user = {
      fullname: this.state.fullname,
      email: this.state.email,
      scout: this.state.scout,
      country: this.state.country,
      role: this.state.role,
      signed: this.state.signed,
      sport: this.state.sport,
      password: this.state.password
    };
    if (
      user.fullname.trim() == "" ||
      user.country.trim() == "" ||
      user.role.trim() == "" ||
      // user.signed.trim() == "" ||
      user.email.trim() == "" ||
      // user.scout.trim() == "" ||
      user.password.trim() == ""
    ) {
      toast.error("Please All Fields Are Required");
      this.setState({ err: "Please All Fields Are Required" });
      return false;
    } 
    // else if (user.password.trim() !== this.state.cpassword.trim()) {
    //   this.setState({ err: "Password does not match" });
    //   toast.error("Password does not match");
    //   return false;
    // }
     else if (user.password.trim().length < 8) {
      this.setState({ err: "Password must be atleast 8 characters" });
      toast.error("Password must be atleast 8 characters");
      return false;
    } 
    // else if (user.email.trim().indexOf(this.state.test) == -1) {
    //   this.setState({
    //     err: "Your student email does not tally with the selected school"
    //     // err: "You are not an OAU student, use valid student email",
    //   });
    //   toast.error(
    //     "Your student email does not tally with the selected school"
    //     // "You are not an OAU student! App is for OAU students, use valid student email"
    //   );
    //   return false;
    // }
    
    else {
      toast.success('Loading...')
      axios
        .post("/register", user, {
          onUploadProgress: (ProgressEvent) => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
            });
          },
        })
        .then((res) => {
          if (res.data.id) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("fullname", res.data.fullname);
            localStorage.setItem("src", res.data.src);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("isVerified", "true");
            toast.success("Sign up successful, please wait...")
            if (localStorage.getItem('redirect') !== null) {
              window.location = `/${localStorage.getItem('redirect')}?oau=true`
            }
            else {
              window.location = `/home`
            }
          } else {
            toast.error(
              "Sign up failed, " + res.data.message
            )
          }
        })
        .catch((err) => {
          toast.error("Sign up failed, please check your network and try again. "+err
          );
        });
      return true;
    }
  };
  
  render() {
    const { isOpen } = this.state;
    const { step } = this.state;
    return (
      <div className="out">
    
            {/* <div className="logo" style={(localStorage.getItem("mode") === "light") ? { color: "white" } : null}>
                <img src={logo} alt="logo" className="log-logo"/>
                <span
                  class="iconify"
                  data-icon="mdi:food-apple"
                  data-inline="false"
                ></span>
              </div> */}

        <div>
          <div className="login-form row">

            <div className="col-md-6 d-none d-md-block">
                <div style={{align: "center"}}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "50px"}}>
                <h3>Welcome To SportsReels</h3>
                <h4 className="lead" >Home Of Sport Talents</h4>
                </div>
                </div>
            
            <img src={player} alt="" className="player-image"/>
            </div>
            <form onSubmit={this.submit} id="login" className="col-md-6">
            <div className="container-2-header-su">

            <h2>Let's Get Started!</h2>
                <p>
                <b>
                    Already have an account
                </b>
                </p>

                <p>
                <a className="sign-up-link" href="/login">
                    Login
                </a>
                </p>
            </div>
              {step === 1 &&
                <div>
                  
                 
                    <span>
                      {/* First Name */}
                      <h4 className="form-names" >Full name*</h4>
                      <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        onChange={this.fullname}
                        value={this.state.fullname}
                        className="form-control"
                        id="search"
                      />
                    </span>

                    {/* <span>
                      <h4> Last Name.*</h4>
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        onChange={this.lastN}
                        value={this.state.lastName}
                        className="form-control"
                        id="search"
                      />
                    </span> */}
              
                    <br/>
                    <span>
                      <h4 className="form-names"> Email.*</h4>
                      <input
                        type="email"
                        name="email"
                        placeholder="email@email.com"
                        onChange={this.email}
                        value={this.state.email}
                        className="form-control"
                        id="search"
                      />
                    </span>

                    {/* <span>
                      <h4>Phone*</h4>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="e.g +2349000000000"
                        onChange={this.phone}
                        value={this.state.phone}
                        className="form-control"
                        id="search"
                      />
                    </span> */}

                  <br/>

                  <span>
                      <h4 className="form-names">Password</h4>
                      {this.state.passwordError && (
                        <p className="text" style={(this.state.passwordError === "Password Okay!!!") ? { color: "green" } : null} >{this.state.passwordError}</p>
                      )}
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={this.pword}
                        value={this.state.password}
                        className="form-control"
                        id="search"
                      />
                      {/* <span class="iconify" data-icon="akar-icons:eye-open" data-inline="false"></span> */}
                    </span>

                  <br />
                  
                  <span>
                      <h4 className="form-names">Country.*</h4>
                      <div className="input">
                      <select 
                        value={this.state.country}
                        name="level"
                        onChange={this.country}
                        className="form-control"
                      >
                        {this.state.countries.map((level) => (
                          <option value={level}>{level}</option>
                        ))}
                      </select>
                      </div>
                    </span>

                  {/* <span>
                    <h4> Date Of Birth.*</h4>
                    <input
                      value={this.state.dob}
                      name="department"
                      onChange={this.date}
                      className="form-control"
                      type="date"
                    >
                    </input>
                  </span> */}

                  {/* <div>
                    <h4> Profile Image.</h4>
                    <input type='file' onChange={this.filer} accept="image/*" />

                  </div>

                  <br />
                  <div align="center">
                    {this.state.src && (
                      <img src={this.state.src} className="img" width="100%" />
                    )}
                  </div> */}

                  <br />
                  <div align="center">
                    <a onClick={this.nextStep} className="btn btn-primary">Next</a>
                  </div>

                </div>
                || (step === 2) &&

                  <div>
                      <h3>What will you like to do with Sportsreels?</h3>

                      <div>
                        <label className="radio">
                            
                        <input type="radio" className="radio-b" name="role" value="Athlete" onClick={this.role} />
                        <span>I want to signup as an Athlete</span>
                            
                        </label>

                        <label className="radio">
                        <input type="radio" style={{marginRight: "0px"}} className="radio-b" name="role" value="Agent" onClick={this.role} />
                        <span>I want to signup as an Agent</span>

                        </label>

                        <label className="radio">
                        <input type="radio" className="radio-b" name="role" value="Enthusiast" onClick={this.role} />
                        <span>I want to signup as an Sports Fan</span>

                        </label>

                      </div>
                    
                      <div align="center" style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <a onClick={this.prevStep} className="btn btn-outline-primary">Back</a>
                    <a id="sign-in-btn" onClick={this.nextStep} className="sign-in-btn2">Next</a>
                  </div>

                  </div>

                || (step === 3) &&
                <div>

                  <h3>What kind of sports are you interested in?</h3>
                  <h4 className="lead">Choose at least one sport</h4>
                  <br/>

                  <div className="row">

                    {this.state.sports.map((sport) => 
                        <label className="check col-4">
                          <input type="checkbox" name="sport" value={sport} onClick={this.sport} />
                          {sport}
                        </label>
                    )}
                    
                  </div>

                  <div align="center" style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <a onClick={this.prevStep} className="btn btn-outline-primary">Back</a>
                    <a id="sign-in-btn" onClick={this.nextStep} className="sign-in-btn2">Next</a>
                  </div>
                        
                </div>

                  || (step === 4) &&

                  <div>
                      <h3>Are you Signed?</h3>
                        <br/>
                      <div>
                        <label className="radio">
                            
                        <input type="radio" className="radio-b" name="signed" value={true} onClick={this.isSigned} />
                        <span>Yes, I am signed</span>
                            
                        </label>

                        <label className="radio">
                        <input type="radio" style={{marginRight: "0px"}} className="radio-b" name="signed" value={false} onClick={this.isSigned} />
                        <span>No, I am not</span>

                        </label>

                      </div>
                    
                      <div align="center" style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <a onClick={this.prevStep} className="btn btn-outline-primary">Back</a>
                    <a id="sign-in-btn" onClick={this.nextStep} className="sign-in-btn2">Next</a>
                  </div>

                  </div>

                  

                  || (step === 5) &&

                  <div>
                      <h3>Are you scouting for talents?</h3>
                        <br/>
                      <div>
                        <label className="radio">
                            
                        <input type="radio" className="radio-b" name="scout" value={true} onClick={this.scouting} />
                        <span>Yes, I am scouting for talents</span>
                            
                        </label>

                        <label className="radio">
                        <input type="radio" style={{marginRight: "0px"}} className="radio-b" name="scout" value={false} onClick={this.scouting} />
                        <span>No, I am not</span>

                        </label>

                      </div>
                    
                      <div align="center" style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <a onClick={this.prevStep} className="btn btn-outline-primary">Back</a>
                    <button id="sign-in-btn" className="sign-in-btn2">Submit</button>
                  </div>

                  </div>
                  

                || (step === 6) &&
                <div>
                  <h3>Looking good?</h3>
                  <h4 className="lead">Confirm your inputs</h4>

                  <div>



                  </div>

                   <div align="center" style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <a onClick={this.prevStep} className="btn btn-outline-primary">Back</a>
                    <button id="sign-in-btn" className="sign-in-btn2">Submit</button>
                  </div>

                </div>
              }


            </form>
          </div>
       
        <ToastContainer />
      </div>
      </div>
    );
  }
}

export default SignUp;

