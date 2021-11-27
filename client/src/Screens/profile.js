import axios from 'axios';
import React, { Component } from 'react'
import './profile.css';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            profile: {}
        }
    }

    componentDidMount(){
        let params = {
            userID: localStorage.getItem("id"),
            token: localStorage.getItem("token")
        }
        axios.post('/users/showone', params)
        .then((data) => {
            this.setState({
                profile: data.data.response
            })
        })
    }

    filer = (ev) => {

    }
    name = (ev) => {

    }

    email= (ev) => {

    }
    about = (ev) => {

    }
    check = (ev) => {

    }

    render(){
        return(
            <div>
                <div className="p-cont">
                    <div>
                        <input type="file" className="file-in" onChange={this.filer} ></input>
                    </div>

                    <div>
                        <input type="text" onChange={this.name} className="profile-field" value={this.state.profile.fullname} />

                        <input type="email" onChange={this.email} className="profile-field" value={this.state.profile.email} />

                        <textarea onChange={this.about} value={this.state.profile.about} className="profile-field txt" />

                        <span>
                            {
                                <input type="checkbox" name="sport" value="hello" onClick={this.check} />
                            }
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile