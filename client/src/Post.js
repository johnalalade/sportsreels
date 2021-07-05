import React, {Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress
} from 'reactstrap'

import axios from 'axios';

export default class Post extends Component {
    constructor(){
        super();
        this.state = {
            modal: true,
            product: "",
            description: "",
            img: null,
            src: null,
            price: ""
        }
    }

    product = (ev) => {
        this.setState({ product: ev.target.value})
    }

    description = (ev) => {
        this.setState({ description: ev.target.value})
    }

    price = (ev) => {
        this.setState({ price: ev.target.value})
    }

    filer = (ev) => {
          this.setState({
            img: ev.target.files[0],
            src: window.URL.createObjectURL(ev.target.files[0]),
            checkerImage: true
          })
        }
    submit = () => {
        let data = new FormData()
        data.append('productImage', this.state.img)
        data.append('filename', this.state.img.name)
        data.append("product", this.state.product)
        data.append("description", this.state.description)
        data.append("price", this.state.price.toString())

        if (this.state.product === "" || this.state.description === "" || this.state.price === "" || this.state.img === null) {
            toast.warning("Please all field are required, (Image, Product, Description")
            return
          }
        else{
            toast.info("Posting...")
            axios.post('/products/add', data, {
                onUploadProgress: ProgressEvent => {
                  this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                  })
                }
              })
              .then((res) => {
                  if(res.data.response)window.location = '/'
                  else toast.error("Product Upload failed, please try again...")
              })
              .catch(err => {
                toast.error('Failed to add Quote. please check your network...')
              })
        }
    }
    render() {
        return(
            <div>
                <Modal isOpen={true} fade={false}>
                <ModalHeader>Add Product</ModalHeader>
                <ModalBody>
                  <h6>Image</h6>
                  <input type="file" accept="image/*" className="form-control" onChange={this.filer} />
                  <br />
                  {this.state.src && <img width="100%" src={this.state.src} />}
                  <br />
                  <h6>Product Name:</h6>
                  <input type="name" placeholder="Enter Product Name" className="form-control" onChange={this.product} />
                  <br />
                  <h6>Description:</h6>
                  <textarea placeholder="Enter Prouct Description" className="form-control" onChange={this.description}></textarea>
                  <br/>
                  <h6>Price:</h6>
                  <input type="number" placeholder="Enter Price" className="form-control" onChange={this.price}/>

                  {this.state.loaded != 0 &&
                    <Progress max="100" color="success" value={this.state.loaded}>{Math.round(this.state.loaded, 2)}%</Progress>
                  }
                </ModalBody>
                <ModalFooter>
                  <Button color="primary form-control" onClick={this.submit}>Add Product</Button>
                </ModalFooter>

              </Modal>
              <ToastContainer/>
            </div>
        )
    }

}