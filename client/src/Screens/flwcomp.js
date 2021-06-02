import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FlutterwaveHook2(prop) {
  const config = {
    public_key: 'FLWPUBK_TEST-820f2c03c668714a10264efb6ec8ef60-X',
    tx_ref: `${prop.id + Date.now()}`,
    amount: prop.amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: prop.email,
      phonenumber: prop.phone,
      name: prop.name,
    },
    customizations: {
      title: 'Trove Loan',
      description: 'Payment For Loan',
      logo: 'https://www.troveapp.co',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <button className="btn btn-success form-control"
        onClick={() => {
            if(prop.name === ""){
                toast.error("Please add a your name")
            }
            else if (prop.email === "") {
              toast.error("Please add a your email")
            }
            else if (prop.phone === "") {
              toast.error("Please add a your phone number")
            }
               else{
          handleFlutterPayment({
            callback: (response) => {
                prop.submit(response)
             
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }
        
        }}
      >
        Pay Loan
      </button>
      <ToastContainer/>
    </div>
  );
}