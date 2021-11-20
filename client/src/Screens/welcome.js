import React, { useState, Component } from "react";
import logo from '../Images/logo.png'
import { Progress } from "reactstrap";
import "./login.css";
import axios from "./axios";

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
    width: "60%",
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

class Welcome extends Component {
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
      
      sport: "Basketball",
      sports: ["Basketball", "Football", "Lawn Tenis", "Table Tenis"],
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
              window.location = `/`
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
              window.location = `/`
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
      <div style={{height: "100vh"}}>
        {/* <div className="container-fluid login-con"> */}

        <div ref={this.body} className="body noSelect" style={(localStorage.getItem("mode") === "light") ? { backgroundColor: "#f9f9f9", color: "#0f1429" } : null}>
          <div class="slider-container">
          <div ref={this.slides} className="slide"></div>
            <div ref={this.slides} className="slide active"></div>
            <div ref={this.slides} className="slide"></div>
            <div ref={this.slides} className="slide"></div>

            <div ref={this.slides} className="slide"></div>
            <div className="slides-content">
              <div className="logo" style={(localStorage.getItem("mode") === "light") ? { color: "white" } : null}>
                <img src={logo} alt="logo" className="log-logo"/>
                <span
                  class="iconify"
                  data-icon="mdi:food-apple"
                  data-inline="false"
                ></span>
              </div>
              <h2  className="type-writer" style={(localStorage.getItem("mode") === "light") ? { color: "white" } : null}>
                  <h3>Hello {localStorage.getItem("firstname")}</h3>
               <h4>Welcome To Sportreels</h4>
              </h2>
              <p style={(localStorage.getItem("mode") === "light") ? { color: "white" } : null}>
                {" "}
                An Online platform which gives opportunity to unexpected but talented sport persons to showcase their talent to the world for <b><i>free</i></b>
              </p>
            </div>

            {/* <div onClick={() => {
              localStorage.setItem("mode", (localStorage.getItem("mode") === "light") ? "dark" : "light");

            }} className="light-mode">
              <a href="#">
                <span
                  class="iconify"
                  data-icon="emojione-monotone:bright-button"
                  data-inline="false"
                ></span>
              </a>
            </div> */}
            
          </div>
          
        </div>
        
        <ToastContainer />
      </div>
    );
  }
}

export default Welcome;

