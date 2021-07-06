import React, { Component, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'reactstrap';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Progress
} from 'reactstrap'


import axios from 'axios';

function Structure(prop) {
    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(!modal)
    }
    const del = () => {
        prop.del(prop.id)
    }

    return (
        <div>
            <div className="card">
                <img className="card-img-top" src={prop.img}></img>

                <div className="card-body">

                    <h5 className="card-title">{prop.product}</h5>
                    <p className="card-text">Price: &#8358; {prop.price}</p>
                    <p className="card-text">Description: {prop.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <span className="enq btn btn-danger" onClick={del}>Delete</span>
                    </div>
                </div>
            </div>
            <br />

            <Modal toggle={toggle} fade={false} isOpen={modal}>
                <ModalHeader toggle={toggle}>{prop.product}</ModalHeader>
                <ModalBody>

                </ModalBody>
            </Modal>
        </div>
    )
}


class Delete extends Component {
    constructor() {
        super();
        this.state = {
            products: null,
            isOpen: false,
            modal: false,
            img: null,
            src: null,
            checkerImage: null,
            loaded: 0,
            author: '',
            quotation: ''
        }
    }

    // dateChecker
    dateChecker = (c) => {

        var date1 = new Date(c.createdAt);
        var date2 = new Date();

        var difference_In_Time = date2.getTime() - date1.getTime();

        var difference_In_Days = difference_In_Time / (1000 * 3600 * 24)

        if (difference_In_Days >= 10) {
            let todele = { id: c._id }
            axios.post('https://john-a.herokuapp.com/quotes/delete', todele)
            return c = { owner: "delete" }

        }
        else {
            return c
        }
    }

    datefilter = (k) => {
        return k.owner !== "delete"
    }

    componentDidMount() {
        axios.post('/products')
            .then((res) => res.data.response)
            .then((info) => this.setState({
                products: info.reverse()
            }))
    }
    filer = (ev) => {
        //console.log(ev.target)
        this.setState({
            checkerImg: "loading"
        })
        // toast.info("Loading,please wait for preview before clicking 'Update' button...")
        let file = ev.target.files[0]
        if (file.size > 5000 * 5000 * 5) {
            this.setState({ err: "Image Size Too Large" })
        } else {
            this.setState({
                img: ev.target.files[0],
                src: window.URL.createObjectURL(ev.target.files[0]),
                checkerImage: true
            })
            this.setState({ checker: true })

        }
    }
    author = (ev) => {
        let author = ev.target.value;
        this.setState({ author: author });
    }
    quote = (ev) => {
        let quote = ev.target.value;
        this.setState({ quotation: quote });
    }
    add = (ev) => {
        ev.preventDefault();
        toast.success('Loading,  please wait');
        let data = new FormData()
        if (this.state.img) {
            data.append('authorImage', this.state.img)
            data.append('filename', this.state.img.name)
        }
        data.append('quote', this.state.quotation)
        data.append('author', this.state.author)
        if (this.state.quotation == "" || this.state.author == "") {
            toast.warning("Please Add an author and a quote!")
            return
        }
        else {
            axios.post('https://john-a.herokuapp.com/quotes/add', data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                }
            })
                .then((res) => {
                    this.modal()
                    window.location.reload()
                })
                .then(() => {
                    this.setState((prev) => {
                        prev.quote.unshift({
                            author: this.state.author,
                            quote: this.state.quotation,
                            avatar: this.state.src
                        })

                        return {
                            quote: prev.quote.slice(1, 1000)
                        }
                    })
                })
                .then(() => {
                    this.setState({
                        loaded: 0,
                        quotation: null,
                        author: null,
                        src: null,
                        img: null
                    })
                })
                .catch(err => {
                    toast.error('Failed to add Quote. Try again..')
                })
        }
    }

    toggler = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    modal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    del = (id) => {
        toast.info("Deleting...")
        let data = { id }
        axios.post('/products/delete', data)
            .then(res => {
                if (res.data.response) window.location.reload()
                else toast.error("Product Deletion failed, please try again...")
            })
            .catch(err => {
                toast.error('Failed to delete Product. please check your network...')
            })
    }
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Vincent Luxury &copy; 2021 </NavbarBrand>
                        <NavbarToggler onClick={this.toggler} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className='ml-auto' navbar>
                                <NavItem>
                                    <NavLink href="tel:09044054188">Phone</NavLink>
                                    <NavLink href="https://wa.me/+2348069965604">WhatsApp</NavLink>
                                    <NavLink href="mailto:vincentluxurydryfish@gmail.com">G-Mail</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
                {/* modal */}
                <Container className="col-md-6">
                    {this.state.products === null && <div className="spin">  <Spinner color="primary" className="spinner" size="lg" /> </div> ||
                        <div>
                            <br />
                            <br />
                            {
                                this.state.products && this.state.products.map((product) =>
                                    <Structure img={product.img} description={product.description} product={product.product} id={product._id} del={this.del} price={product.price}/>
                                )
                            }
                        </div>}
                </Container>
                <ToastContainer />
            </div>
        )
    }
}

export default Delete;

