import React, { Component } from 'react';
import Typewriter from 'react-simple-typewriter';
import 'react-simple-typewriter/dist/index.css';
import './signup.css';
//import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Progress } from 'reactstrap';
import axios from './axios';
import logo from '../Images/trove.jpg';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            loaded: null,
            name: '',
            phone: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    }

    nameHandler = (ev) => {
        let name = ev.target.value
        this.setState({name})
    }
    phoneHandler = (ev) => {
        let phone = ev.target.value
        this.setState({phone})
    }
    emailHandler = (ev) => {
        let email = ev.target.value
        this.setState({email})
    }
    passwordHandler = (ev) => {
        let password = ev.target.value
        this.setState({password})
    }
    confirmHandler = (ev) => {
        let confirm_password = ev.target.value
        this.setState({confirm_password})
    }

    submit = (ev) => {
        ev.preventDefault()

        let data = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password
        }
        if (data.name.trim() === "" || data.phone.trim() === "" || data.email.trim() === "" || data.password.trim() === "" || this.state.confirm_password.trim() === "") {
            toast.error('Please All Fields Are Required');
            this.setState({ err: 'Please All Fields Are Required' })
            return false
        }
        else if (data.password.trim() !== this.state.confirm_password.trim()) {
            this.setState({ err: 'Password does not match' })
            toast.error('Password does not match')
            return false
        }
        else if (data.password.trim().length < 8) {
            this.setState({ err: 'Password must be atleast 8 characters' })
            toast.error('Password must be atleast 8 characters')
            return false
        }
        else{
            toast.success('Loading, please wait')
            axios.post('/register', data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                }
            })
            .then((res) => {
                if(res.data.id){
                    localStorage.setItem('id', res.data.id);
                    localStorage.setItem('token', res.data.token);
                    this.props.history.replace(`/home`);
                }
                else{ return }
            })
            .then(() => {
                toast.error('Error Signinng Up!')
            })
            .catch((err) => {
                toast.error("Signup Failed!, Please try again")
            })
        }
    }

    render() {
        return (
            <div>

                <div ref={this.body} className="body noSelect">
                    <div class="slider-container">
                        <div ref={this.slides} className="slide active" >
                        </div>

                        <div className="slides-content">
                            <h2>Welcome To Trove Shares</h2>
                            <div className="logo">
                                <div className="logo-inner">
                                <img src={logo} alt="logo" className="logo-img" /> 
                                <h3 className="name">Trove Shares</h3>
                                
                                <Typewriter
                                    loop
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                    words={['Get Shares', 'Manage Your Shares', 'Best Way To Monitor Your Shares', 'Trove Shares', 'Trove Inc']}
                                />

                                </div>
                            </div>
                            
                        </div>

                    </div>
                    <div className="container-2">
                        <div className="container-2-header">
                            <h2>Let's Get Started!</h2>
                            <p> <b> Already have an account? <a className="sign-up-link" href="/login">sign In</a> </b> </p>
                        </div>
                        <div className="login-form">
                            <form onSubmit={this.submit} id="login">
                                {/* Name */}
                                <span>
                                    <label>Name</label>

                                    <input type="text" name="name" placeholder="Enter Your Name..." onChange={this.nameHandler} value={this.state.name} className="form-control" id="search" />

                                </span>
                                {/* Phone */}
                                <span>
                                    <label>Phone</label>

                                    <input type="text" name="name" placeholder="Enter Your Phone Number..." onChange={this.phoneHandler} value={this.state.phone} className="form-control" id="search" />

                                </span>
                                {/* Email */}
                                <span>
                                    <label>Email</label>

                                    <input type="text" name="email" placeholder="Enter Email or Phone..." onChange={this.emailHandler} value={this.state.email} className="form-control" id="search" />

                                </span>
                                {/* Password */}
                                <span>
                                    <label>Password</label>
                                    <input type="password" name="password" placeholder="Enter password..." onChange={this.passwordHandler} value={this.state.password} className="form-control" id="search" />
                                    
                                </span>
                                {/* Confirm Password */}
                                
                                <span>
                                    <label>Confirm Password</label>
                                    <input type="password" name="confirm-password" placeholder="Re-Enter password..." onChange={this.confirmHandler} value={this.state.confirm_password} className="form-control" id="search" />
                                    
                                </span>

                                {this.state.loaded &&
                                    <Progress max="100" color="success" value={this.state.loaded}>{Math.round(this.state.loaded, 2)}%</Progress>
                                }
                               

                                <button id="sign-in-btn">Sign In</button>
                            </form>
                        </div>
                        
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}

export default Signup