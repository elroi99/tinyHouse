import { useState , useContext , useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement , useElements , useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { Button } from "@mui/material";
import { listingContext } from "../pages/listing";
import { Booking , bookingConverter } from "../firebase/firestore";
import { db } from "../firebase/firebase";
import { addDoc , collection , updateDoc , doc , arrayUnion  } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { authContext } from "../contexts/authContext";

// styling for the stripe element.
const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

const CheckoutComponent = () => {
    let { userUid } = useContext(authContext);

    // triggerErrorAlert will let us display a 
    const [ success , setSuccess ]= useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const { closeModal , triggerSnackbar ,  propertyUid , dateState } = useContext(listingContext);

    // testing this. get rid of it once the bahavior is confirmed !! ie. modal works.

    // adds a booking to the user in firebase.
    async function createBooking(){
        // will get the checkindate and checkoutdate from the state
        let checkindate = dateState.checkInDate;
        let checkoutdate = dateState.checkOutDate;

        let bookingUid = uuidv4();
        let bookingObj = new Booking( userUid , bookingUid , propertyUid , checkindate.toISOString() , checkoutdate.toISOString() );
        
            // add the booking object to the bookings collection
            await addDoc( collection(db , "bookings").withConverter(bookingConverter) , bookingObj );
            // add the booking id to bookingsArr of the user who made the booking. 
            await updateDoc( doc( db , `users/${userUid}`) , {
                bookingsArr : arrayUnion(`${bookingUid}`)
            }) 

            // we havent used a try catch block cause we dont want errors to be caught and eaten up by the function itself.

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Handle submit triggered");
        const { error , paymentMethod } = await stripe.createPaymentMethod({
            type : "card",
            card : elements.getElement(CardElement)
        })

        if(!error){
                try{
                    // complete the payment ( Stripe part)
                    const { id } = paymentMethod;
                    // in case you use traditional node + hosting
                    const response =  await axios.post("http://localhost:4000/payment" , {
                        amount : 1000,  // cause stripe takes input in cents. ie. this will be 10 dollars.
                        id
                    })

                    if(response.data.success){
                        console.log("Successful payment");
                        setSuccess(true);
                    }

                    // the firebase part
                    await createBooking();    // updates firebase 
                    console.log("booking created yo!!");
                    // the booking is a success : display the snackbar with a success message
                    triggerSnackbar({displayMessage : "Booking Successful !!" , severity : "error" })
                    closeModal(true);


                }catch(error){
                    console.log(error);
                    triggerSnackbar({displayMessage : "Booking Failed -- Database error" , severity : "error" });
                    closeModal(true);
                    
                } 
        }
        else{
            console.log(error.message);
            // stripe error, show the error snackbar on the listing page
            triggerSnackbar({displayMessage : "Booking Failed -- Payment Failed" , severity : "error" })
            closeModal(true);

        }

    }

    return (<>
    {
        !success 
        ?
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup StripeFormGroup">
                <div className="FormRow StripeFormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className="stripeButton"> Book </button>
        </form>
        :
        <div>
            <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
        </div> 
    }
     
    </>  
    );
}
 
export default CheckoutComponent;