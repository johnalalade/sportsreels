import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FlutterwaveHook(prop) {
  const config = {
    public_key: 'FLWPUBK-d28aff6708c024c24b0cd247f586f4ff-X',
    tx_ref: prop.email + Date.now(),
    amount: prop.amount,
    currency: 'NGN',
    payment_options: 'card',
    customer: {
      email: prop.email,
      phonenumber: prop.phone,
      name: prop.username,
    },
    customizations: {
      title: 'Pay For '+ prop.product,
      description: 'Payment For '+ prop.product,
      logo: 'https://www.uniconne.com/uploads/pes.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <button className="btn btn-warning form-control"
        onClick={() => {
            // if (prop.img4 === null && prop.adwords === "") {
            //     toast.error("Please add a post (image/video or posts)")
            // }
            // else if(prop.username === ""){
            //     toast.error("Please add a bussiness name or your username")
            // }
            // else if(prop.url && prop.url.indexOf('https://') == -1 || prop.url.indexOf('https://') > 1){toast.warning("Please add a valid url starting with 'https://")}
            //else{
              if(prop.username === ''){
                toast.error('Please add a username')
              }
             if(prop.email === ''){
                toast.error('Please add your email')
              }
              if(prop.phone === ''){
                toast.error('Please add your Whatsapp phone')
              } else{
          handleFlutterPayment({
            callback: (response) => {
                //prop.submit(response)
                toast.success("Order sent. You can Contact Mr. Victor on WhatsApp")
              //  console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }
        //}
        }}
      >
        Order
      </button>
      <ToastContainer/>
    </div>
  );
}