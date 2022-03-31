import { react , useContext } from 'react'
import "../App.css"
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe} from "@stripe/stripe-js";
import CheckoutComponent from './checkoutComponent';
import { listingContext } from '../pages/listing';


// const PUBLIC_KEY = `${process.env.STRIPE_PUBLIC_KEY}`;
const PUBLIC_KEY = "pk_test_51JZZZwSF1WAFqKIwRbPbQgOzZux6B19NkHtqG2Ru3OAIdKp1sbsgxSZN8u1Lcu8OV7BDgnnGHcZpIMQw6aYUMBRK00KyWCMBWF"
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {

  return (
    <Elements stripe={ stripeTestPromise }> 
        <CheckoutComponent  />
    </Elements>
  )
}
