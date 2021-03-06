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

class Logins extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      err: "",
      loaded: null,
      modal: false,
      firstName: "",
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
      sport: "Basketball",
      sports: ["Badminton", "Basketball", "Cricket", "Esport", "Football", "Golf", "Gymnastics", "Hockey", "Lawn Tenis", "Squash", "Swimming", "Table Tenis", "Taekwondo"],
      src: "",
      signed: "false",
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
      userName: this.state.email,
      password: this.state.password,
    };
    if (
      user.userName.trim() == ""
    ) {
      toast.error(
        "Please input a correct email..."
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
            localStorage.setItem("fullname", res.data.response.fullname);
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
              window.location = `/home`
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
  firstN = (ev) => {
    let name = ev.target.value;
    this.setState({ firstName: name, err: "" });
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
    let level = ev.target.value;
    this.setState({ sport: level, err: "" });
  };
  country = (ev) => {
    let school = ev.target.value
    this.setState({ county: school, err: '' })
  }
  role = (ev) => {
      let role = ev.target.value
      this.setState({ role })
  }
  isSigned = (ev) => {
    let signed = ev.target.value
    this.setState({ signed })
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
    data.append("firstname", this.state.firstName);
    data.append("lastname", this.state.lastName);
    data.append("dob", this.state.dob);
    data.append("email", this.state.email);
    data.append("phone", this.state.phone);
    data.append("country", this.state.country);
    data.append("sport", this.state.sport);
    data.append("role", this.state.role);
    data.append("signed", this.state.signed);
    data.append("password", this.state.password);
    let user = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      phone: this.state.phone,
      department: this.state.department,
      level: this.state.level,
      password: this.state.password,
      school: this.state.university
    };
    if (
      user.firstname.trim() == "" ||
      user.lastname.trim() == "" ||
      user.email.trim() == "" ||
      user.phone.trim() == "" ||
      user.password.trim() == "" ||
      this.state.cpassword.trim() == ""
    ) {
      toast.error("Please All Fields Are Required");
      this.setState({ err: "Please All Fields Are Required" });
      return false;
    } else if (user.password.trim() !== this.state.cpassword.trim()) {
      this.setState({ err: "Password does not match" });
      toast.error("Password does not match");
      return false;
    } else if (user.password.trim().length < 8) {
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
        .post("/register", data, {
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
            localStorage.setItem("firstname", res.data.firstname);
            localStorage.setItem("src", res.data.src);
            localStorage.setItem("department", res.data.department);
            localStorage.setItem("level", res.data.level);
            localStorage.setItem("phone", res.data.phone);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("email", this.state.firstName);
            localStorage.setItem("isVerified", "true");
            localStorage.setItem("notification", "false");
            localStorage.setItem("messages", "0");
            localStorage.setItem("PathToSearch", "")
            toast.success("Sign up successful, please wait...")
            if (localStorage.getItem('redirect') !== null) {
              window.location = `/${localStorage.getItem('redirect')}?oau=true`
            }
            else {
              window.location = `/welcome`
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

        <div>
          <div className="login-form row">

            <div className="col-md-6 d-none d-md-block">
                <div style={{align: "center"}}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "50px"}}>
                <h3>Welcome Back</h3>
                <h4 className="lead" >Home Of Sport Talents</h4>
                </div>
                </div>
            
            <img src={player} alt="" className="player-image"/>
            </div>
            <form onSubmit={this.submit1} id="login" className="col-md-6">
            <div className="container-2-header-su">

            <h2>Let's Get Started In!</h2>
                <p>
                <b>
                    Don't have an account?
                </b>
                </p>

                <p>
                <a className="sign-up-link" href="/signup">
                    SignUp
                </a>
                </p>
            </div>
              
                <div>
                  
                 
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

                  <br/>

                  <span>
                      <h4 className="form-names">Password</h4>
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

                    <br/>
                    <button id="sign-in-btn" className="sign-in-btn2">Login</button>
                </div>
                  

              </form>
          </div>
       
        <ToastContainer />
      </div>
      </div>
    );
  }
}

export default Logins;

