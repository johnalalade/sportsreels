import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Logo from '../Images/TroveLogo.png';
import './header.css';
import axios from './axios';
import { Progress } from 'reactstrap';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'


function Header(prop) {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState(prop.name)
  const [phone, setPhone] = useState(prop.phone)
  const [email, setEmail] = useState(prop.email)
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirm_Password] = useState('')
  const [loaded, setLoaded] = useState(0)
  const [err, setErr] = useState('')

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const modalToggle = () => setModalOpen(prevState => !prevState);

  const nameHandler = (ev) => {
    let name = ev.target.value
    setName(name)
  }
  const phoneHandler = (ev) => {
    let phone = ev.target.value
    setPhone(phone)
  }
  const emailHandler = (ev) => {
    let email = ev.target.value
    setEmail(email)
  }


  const submit = (ev) => {
    ev.preventDefault()
    // toast.success('Loading, please wait... ')
    let data = {
      name: name,
      phone: phone,
      email: email,
      userID: localStorage.getItem('id'),
      password: password
    }
    if (data.name.trim() === "" || data.phone.trim() === "" || data.email.trim() === "") {
      toast.error('Please All Fields Are Required');
      
      return false
    }
    else if (data.password.trim() !== confirm_password.trim()) {
     
      toast.error('Password does not match')
      return false
    }
    else if (data.password.trim().length > 0 && data.password.trim().length < 8) {
      
      toast.error('Password must be atleast 8 characters')
      return false
    }
    else {
      toast.success('Loading, please wait')
      axios.post('/users/update', data, {
        onUploadProgress: ProgressEvent => {

          setLoaded((ProgressEvent.loaded / ProgressEvent.total * 100))
        }
      })
        .then((res) => {
          if (res.data.response) {
            modalToggle()
            window.location.reload()
          }
          else { return }
        })
        .catch((err) => {
          toast.error("Signup Failed!, Please try again")
        })
    }
  }
  return (
    <div>
      <nav className="header">

        <div className="brand">
          <img src={Logo} alt="Logo" />
        </div>


        <div className="user-div">
          <p className="navlink" to={`/home?oau=true`}>

            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle color="white" className="dropdown">
                <div className="dropdown-div">
                <span className="user">
                  <FontAwesomeIcon color="white" icon={faUser} size="lg"></FontAwesomeIcon>
                </span>
                <FontAwesomeIcon icon={faCaretDown} size="lg"></FontAwesomeIcon>
                </div>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <span align="center" className="user">
                    <FontAwesomeIcon color="white" icon={faUser} size="lg"></FontAwesomeIcon>
                  </span>
                </DropdownItem>
                <DropdownItem header>{prop.name}</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={
                  modalToggle
                }>Update Profile</DropdownItem>
                <DropdownItem onClick={() => {
                  localStorage.clear();
                  window.location = '/login'
                }}>Log Out</DropdownItem>

              </DropdownMenu>
            </Dropdown>


          </p>

        </div>

      </nav>
      <ToastContainer />

      <Modal isOpen={modalOpen} toggle={modalToggle} fade={false}>
        <ModalHeader toggle={modalToggle}>Update Profile</ModalHeader>
        <ModalBody>
          <div className="login-form">
            <form onSubmit={submit} id="login">
              {/* Name */}
              <span>
                <label>Name</label>

                <input type="text" name="name" placeholder="Enter Your Name..." onChange={nameHandler} value={name} className="form-control" id="search" />

              </span>
              {/* Phone */}
              <span>
                <label>Phone</label>

                <input type="text" name="name" placeholder="Enter Your Phone Number..." onChange={phoneHandler} value={phone} className="form-control" id="search" />

              </span>
              {/* Email */}
              <span>
                <label>Email</label>

                <input type="text" name="email" placeholder="Enter Email or Phone..." onChange={emailHandler} value={email} className="form-control" id="search" />

              </span>
              
              <button id="sign-in-btn">Update</button>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>

      </Modal>
    </div>
  );
}

export default Header;

