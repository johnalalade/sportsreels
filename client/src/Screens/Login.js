import React, { Component } from 'react';
import 'react-simple-typewriter/dist/index.css';
import './signup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Progress } from 'reactstrap';
import axios from './axios';
import logo from '../Images/trove.jpg'


class Login extends Component {
    constructor() {
        super();
        this.state = {
            loaded: null,
            username: '',
            password: '',
            
        }
    }

    usernameHandler = (ev) => {
        let username = ev.target.value
        this.setState({username})
    }
    
    passwordHandler = (ev) => {
        let password = ev.target.value
        this.setState({password})
    }
    

    submit = (ev) => {
        ev.preventDefault()

        let data = {
            username: this.state.username,
            password: this.state.password
        }
        if (data.username.trim() === "" || data.password.trim() === "") {
            toast.error('Please All Fields Are Required');
            this.setState({ err: 'Please All Fields Are Required' })
            return false
        }
        else if (data.password.trim().length < 8) {
            this.setState({ err: 'Password is atleast 8 characters' })
            toast.error('Password is atleast 8 characters')
            return false
        }
        else{
            toast.success('Loading, please wait')
            axios.post('/login', data, {
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
                toast.error('Error Logging In!')
            })
            .catch((err) => {
                toast.error("Login Failed!, Please try again")
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
                            <h2>Welcome To Back</h2>
                            <div className="logo">
                                <div className="logo-inner">
                                <img src={logo} alt="logo" className="logo-img" /> 
                                <h3 className="name">Trove Shares</h3>
                                

                                </div>
                            </div>
                            
                        </div>

                    </div>
                    <div className="container-2">
                        <div className="container-2-header">
                            <h2>Let's Get In!</h2>
                            <p> <b> Don't have an account? <a className="sign-up-link" href="/">sign up</a> </b> </p>
                        </div>
                        <div className="login-form">
                            <form onSubmit={this.submit} id="login">
                                {/* Name */}
                            <span>
                                    <label>Email or Phone</label>

                                    <input type="text" name="name" placeholder="Enter email or phone..." onChange={this.usernameHandler} value={this.state.username} className="form-control" id="search" />

                                </span>
                                
                                {/* Password */}
                                <span>
                                    <label>Password</label>
                                    <input type="password" name="password" placeholder="Enter password..." onChange={this.passwordHandler} value={this.state.password} className="form-control" id="search" />
                                    
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

export default Login