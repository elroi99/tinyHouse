import { React , useContext } from 'react'
import "../App.css"
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe} from "@stripe/stripe-js";
import CheckoutComponent from './checkoutComponent';
import { listingContext } from '../pages/listing';


const PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY;
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  let { triggerErrorSnackbar } = useContext(listingContext);

  
  return (
    <Elements stripe={ stripeTestPromise }> 
        <CheckoutComponent triggerErrorSnackbar={triggerErrorSnackbar} />
    </Elements>
  )
}
