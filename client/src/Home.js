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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {faPaperPlane, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import FlutterwaveHook from './flutterwavehooks';

function Structure(prop) {
  const [modal, setModal] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [uname, setUname] = useState("")
  const [comment, setComment] = useState("")
  const [visibility, setVisibility] = useState("collaps")

  const toggle = () => {
    setModal(!modal)
  }
  const emailH = (ev) => {
    setEmail(ev.target.value)
  }
  const phoneH = (ev) => {
    setPhone(ev.target.value)
  }
  const nameH = (ev) => {
    setName(ev.target.value)
  }

  const commenter = () => {
    if (comment.trim() === "") {
      return;
    } else {
      prop.comm(comment,uname, prop.id);
      prop.comments.unshift({
        comment: comment,
        username: uname,
      });
      setComment("");
      setUname("");
    }
  };

  return (
    <div>
      <div className="card">
        <img className="card-img-top" src={prop.img}></img>

        <div className="card-body">

          <h5 className="card-title">{prop.product}</h5>
          <p className="card-text">Price: &#8358; {prop.price}</p>
          <p className="card-text"> Description: {prop.description}</p>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <a className="enq btn btn-success" target="_blank" href={`https://wa.me/+2348069965604`} ><FontAwesomeIcon icon={faWhatsapp} size="lg" ></FontAwesomeIcon> Whatsapp</a>

            <span className="enq btn btn-primary" onClick={toggle} ><FontAwesomeIcon icon={faShoppingCart} size="lg" ></FontAwesomeIcon> Order</span>
          </div>
          <br/>
          <div style={{display: "flex"}}>
          <input
              type="name"
              name="comment"
              placeholder="Name..."
              onChange={(ev) => {
                let comment = ev.target.value;
                setUname(comment);
              }}
              value={uname}
              className="form-control"
            />
          <input
              type="text"
              name="comment"
              placeholder="Comment..."
              onChange={(ev) => {
                let comment = ev.target.value;
                setComment(comment);
              }}
              value={comment}
              className="form-control"
            />
            <button className="btn btn-primary" onClick={commenter}>
              <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
            </button>
            </div>
            {(prop.comments[0] && (
                  <div>

                    <div className="comments">
                    {prop.comments.length > 0 && <p className="comment-posters-handle" style={(localStorage.getItem("mode") === "light") ? {color: "black" } : null}>{`${prop.comments.length} comments`}</p>}

                    </div>
                  </div>
                ))}
        </div>
        
        <p className="comment-posters-handle" style={(localStorage.getItem("mode") === "light") ? {color: "black", marginRight: "4px" } : {marginRight: "4px"}}>@{prop.comments[0].username}: {prop.comments[0].comment}</p>
        {prop.comments.length > 1 && visibility !== "visible" && <p style={{color: "blue", textDecoration: "underline"}} onClick={() => setVisibility("visible")}>Read more</p>}
        {visibility === "visible" &&
        <div>
            {prop.comments.map((com) => <p>@{com.username}: {com.comment}</p>)}
            <p style={{color: "blue", textDecoration: "underline"}} onClick={() => setVisibility("none")}>Show less</p>
        </div>
        }
      </div>
      <br />

      <Modal toggle={toggle} fade={false} isOpen={modal}>
        <ModalHeader toggle={toggle}>{prop.product}</ModalHeader>
        <ModalBody>

          <h6>Name:</h6>
          <input type="text" className="form-control" onChange={nameH} />
          <br />
          <h6>Email:</h6>
          <input type="email" className="form-control" onChange={emailH} />
          <br />
          <h6>Phone:</h6>
          <input type="tel" className="form-control" onChange={phoneH} />

        </ModalBody>
        <ModalFooter>
          <FlutterwaveHook username={name} email={email} phone={phone} amount={prop.price} product={prop.product} />
        </ModalFooter>
      </Modal>
    </div>
  )
}


class Home extends Component {
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
  render() {

    const comm = (comment, uname, id) => {
      let comm = {
        postID: id,
        comment: { username: uname, comment },
      };
      if (this.state.src !== "undefined") {
        comm.comment.src = this.state.src;
      }
      axios
        .post("/products/comment", comm)
        .then(() => toast.success("Comment added"))
        .catch((err) => toast.error("Couldn't add comment to post."));
    };

    return ( 
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/"><b>Vincent Luxury</b></NavbarBrand>
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
                  <Structure img={product.img} description={product.description} product={product.product} price={product.price} comm={comm} id={product._id} comments={product.comments}/>
                )
              }
            </div>}
        </Container>
        <ToastContainer />
      </div>
    )
  }
}

export default Home;

// [{
//   author: 'John',
//   quote: 'You are not chosen because you are holy, You are Holy because you are Chosen'
// }],


{/* <p>Quotes will be deleted after 10 days</p>
              <Button color="danger" onClick={this.modal}>Add Quote</Button>
              <Modal isOpen={this.state.modal} toggle={this.modal} fade={false}>
                <ModalHeader toggle={this.modal}>Add Quote</ModalHeader>
                <ModalBody>
                  <h6>Author's Image:</h6>
                  <input type="file" accept="image/*" className="form-control" onChange={this.filer} />
                  <br />
                  {this.state.src && <img className="img" src={this.state.src} />}
                  <br />
                  <h6>Author's Name:</h6>
                  <input type="name" placeholder="Enter author's Name" className="form-control" onChange={this.author} />
                  <br />
                  <h6>Quote:</h6>
                  <textarea placeholder="Enter Quote" className="form-control" onChange={this.quote}></textarea>

                  {this.state.loaded != 0 &&
                    <Progress max="100" color="success" value={this.state.loaded}>{Math.round(this.state.loaded, 2)}%</Progress>
                  }
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.add}>Add Quote</Button>{' '}
                  <Button color="secondary" onClick={this.modal}>Cancel</Button>
                </ModalFooter>

              </Modal> */}