import React, { Component } from 'react';
import './home.css';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Spinner
} from 'reactstrap';
import axios from './axios'
import FlutterwaveHook2 from './flwcomp';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            account: '',
            durations: [6, 7, 8, 9, 10, 11, 12],
            duration: 6,
            bank: '',
            modal2: '',
            modal: false,
            charge: 1000,
            charges: [1000, 2000, 3000, 4000, 5000],
            name: '',
            email: '',
            phone: '',
            balance: 10000,
            err: "",
            portfolio: null
        }
    }

    modal = () => {
        this.setState({ modal: !this.state.modal })
    }
    chargeHandler = (ev) => {
        let charge = ev.target.value
        this.setState({ charge })
    }
    nameHandler = (ev) => {
        let name = ev.target.value
        this.setState({ name })
    }
    emailHandler = (ev) => {
        let email = ev.target.value
        this.setState({ email })
    }
    phoneHandler = (ev) => {
        let phone = ev.target.value
        this.setState({ phone })
    }

    submit = (ev) => {
        //ev.preventDefault()
        toast.success('Loading, please wait... ')
        let money = parseInt(this.state.charge)
        let loan = this.state.charge / 3
        let charge = this.state.charge
        
        let data = {
            charge,
            loan,
            userID: localStorage.getItem('id')
        }
        axios.post('/payment', data)
            .then((res) => {
                this.setState((prev) => {
                    return {
                        portfolio: prev.portfolio.map((position) => {
                            let newValue = position.equityValue + loan
                            position.equityValue = newValue
                             return position
                         }),
                        balance: prev.balance + money
                    }
                })
            })
            .then((res) => {
                this.modal()
            })
            .then((res) => {
               toast.success('Payment Successful')
               window.location.reload()
            })
            .catch((err) => {
                toast.error("An Error Occured, please try again.")
            })
    }

    // Loaning
    modal2 = () => {
        this.setState({ modal2: !this.state.modal2 })
    }
    accountHandler = (ev) => {
        let account = ev.target.value
        this.setState({ account })
    }
    bankHandler = (ev) => {
        let bank = ev.target.value
        this.setState({ bank })
    }
    durationHandler = (ev) => {
        let duration = ev.target.value
        this.setState({ duration })
    }

    submit2 = (ev) => {
        ev.preventDefault()
        toast.success('Loading, please wait... ')
        let loan = this.state.charge / 3
        let charge = this.state.charge
        let data = {
            charge,
            loan,
            duration: this.state.duration,
            bank: this.state.bank,
            account: this.state.account,
            userID: localStorage.getItem('id')
        }
        axios.post('/loan', data)
            .then((res) => {
                this.setState({
                    portfolio: this.state.portfolio.map((position) => {
                       let newValue = position.equityValue - loan
                       position.equityValue = newValue
                        return position
                    }),
                    balance: this.state.balance - this.state.charge
                })
                
            })
            .then((res) => {
                this.modal2()
            })
            .then((res) => {
                toast.success('Loan Successful, Check your bank account')
             })
            .catch((err) => {
                toast.error("An Error Occured, please try again.")
            })
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.replace(`/`);
        }
        axios.post('/users/showone', { userID: localStorage.getItem('id') })
            .then((res) => {
                this.setState({
                    name: res.data.response.name,
                    email: res.data.response.email,
                    phone: res.data.response.phone,
                    balance: res.data.response.balance,
                    portfolio: res.data.response.portfolio,
                    loaded: true
                })
            })
            .catch((err) => {
                toast.error('Error getting data');
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.loaded === false && <div className="spin">
                        
                            <Spinner color="success"/>
                        
                    </div>
                    ||

                    <div>
                        <Header name={this.state.name} phone={this.state.phone} email={this.state.email} />
                        <div className="outter-container">
                            <div className="contain">
                                {/* Top Box */}
                                <div className="box-container">
                                    <span className="user-icon">
                                        <FontAwesomeIcon color="white" icon={faUser} size="5x"></FontAwesomeIcon>
                                    </span>
                                    <h5 className="text" >{this.state.name}'s Portfolio</h5>
                                    <h6 className="text">Balance: {this.state.balance}</h6>
                                </div>

                                {/* Buttons */}
                                <br />
                                <div className="buttons">
                                    <button className="btn btn-success" onClick={this.modal}>Pay</button>
                                    <button className="btn btn-outline-success" onClick={this.modal2}>Loan</button>
                                </div>

                                {/* Recent Activity */}
                                <div className="recent-bg">
                                    <p className="recent">Porfolio Positon</p>
                                </div>
                                {/* lists */}
                                <div className="lists">
                                    <div className="list">
                                        <p className="list-text">Symbol</p>
                                        <p className="list-text">Quantity</p>
                                        <p className="list-text">Value</p>
                                    </div>
                                    {this.state.portfolio.map((position) =>
                                        <div className="list">
                                            <p className="list-text">{position.symbol}</p>
                                            <p className="list-text">{position.totalQuantity}</p>
                                            <p className="list-text">{position.equityValue}</p>
                                        </div>
                                    )}

                                </div>

                                {/* Last Bar */}
                                <div className="last-bar"></div>

                                <br />
                            </div>
                        </div>
                        
                        {/* Payment */}
                        <Modal isOpen={this.state.modal} toggle={this.modal} fade={false}>
                            <ModalHeader toggle={this.modal}>Pay Loans</ModalHeader>
                            <ModalBody className="login-form">

                                <Form id="login" >
                                    <label>Name
                        <input type="name" name="name" placeholder="Enter your name" onChange={this.nameHandler} value={this.state.name} className="form-control" id="search" />
                                    </label>

                                    <label>Email
                        <input type="email" name="email" placeholder="enter your email" onChange={this.emailHandler} value={this.state.email} className="form-control" id="search" />
                                    </label>

                                    <label>Phone
                        <input type="text" name="phone" placeholder="Enter your phone" onChange={this.phoneHandler} value={this.state.phone} className="form-control" id="search" />
                                    </label>

                                    <label>Amount
                            <select value={this.state.charge} name="department" onChange={this.chargeHandler} className="form-control">
                                            {this.state.charges.map((charge) =>
                                                <option value={charge}>{charge}</option>
                                            )}

                                        </select>
                                    </label>

                                </Form>

                            </ModalBody>
                            <ModalFooter>
                                <FlutterwaveHook2 name={this.state.name} email={this.state.email} phone={this.state.phone} amount={this.state.charge} submit={this.submit} id={localStorage.getItem('id')} />
                            </ModalFooter>

                        </Modal>

                        {/* Loaning */}
                        <Modal isOpen={this.state.modal2} toggle={this.modal2} fade={false}>
                            <ModalHeader toggle={this.modal2}>Take Loans</ModalHeader>
                            <ModalBody className="login-form">

                                <Form id="login" >
                                    <label>Name
                        <input type="name" name="name" placeholder="Enter your name" onChange={this.nameHandler} value={this.state.name} className="form-control" id="search" />
                                    </label>

                                    <label>Email
                        <input type="email" name="email" placeholder="enter your email" onChange={this.emailHandler} value={this.state.email} className="form-control" id="search" />
                                    </label>

                                    <label>Phone
                        <input type="text" name="phone" placeholder="Enter your phone" onChange={this.phoneHandler} value={this.state.phone} className="form-control" id="search" />
                                    </label>

                                    <label>Account
                        <input type="text" name="Account" placeholder="Enter your Account Number" onChange={this.accountHandler} value={this.state.account} className="form-control" id="search" />
                                    </label>

                                    <label>Bank
                        <input type="text" name="bank" placeholder="Enter your Bank Full Name" onChange={this.bankHandler} value={this.state.bank} className="form-control" id="search" />
                                    </label>

                                    <label>Amount
                            <select value={this.state.charge} name="department" onChange={this.chargeHandler} className="form-control">
                                            {this.state.charges.map((charge) =>
                                                <option value={charge}>{charge}</option>
                                            )}

                                        </select>
                                    </label>

                                    <label>Duration
                            <select value={this.state.duration} name="department" onChange={this.durationHandler} className="form-control">
                                            {this.state.durations.map((duration) =>
                                                <option value={duration}>{duration} months</option>
                                            )}

                                        </select>
                                    </label>

                                </Form>

                            </ModalBody>
                            <ModalFooter>
                                <button className="btn btn-success" onClick={this.submit2}>Accept</button>
                            </ModalFooter>

                        </Modal>

                        <ToastContainer/>
                    </div>
                    }
            </div>
                                    
        )
}
}

export default Home