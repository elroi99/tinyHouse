import { React , useContext } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import KeyIcon from '@mui/icons-material/Key';
import { Box , Typography , Divider , Button } from "@mui/material"
import StripeContainer from './StripeContainer';
import { listingContext } from "../pages/listing";
import { signInWithFirebase } from "../firebase/firebaseAuth";
import { authContext } from "../contexts/authContext";
import { Booking , bookingConverter } from "../firebase/firestore";
import { db } from "../firebase/firebase";
import { addDoc , collection , updateDoc , doc , arrayUnion  } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

export default function SubtotalModal({ selectedBookingDetails : { checkInDate , checkOutDate , pricesPerDay , stayDurationInDays } }) {

  let {  closeModal , propertyUid , triggerSnackbar  } = useContext(listingContext);

  let user = useContext(authContext);

  console.log(` ${checkInDate} ${checkOutDate} ${pricesPerDay} ${stayDurationInDays} `);
  let total = pricesPerDay * stayDurationInDays; // does not include Tiny house commission
  let tinyHouseFee = total * 0.05;  // tinyHouseFee 5% of total 
  let grandTotal = (total + tinyHouseFee).toFixed();  // total amount that the user has to pay !!


      // adds a booking to the user in firebase. //  copied and pasted (more of less) it from checkoutComponent
      async function createBooking(){
        // will get the checkindate and checkoutdate from the state
        let checkindate = checkInDate;
        let checkoutdate = checkOutDate;

        let bookingUid = uuidv4();
        let bookingObj = new Booking( user.userUid , bookingUid , propertyUid , checkindate.toISOString() , checkoutdate.toISOString() );

        try{
            // add the booking object to the bookings collection
            await addDoc( collection(db , "bookings").withConverter(bookingConverter) , bookingObj );
            // add the booking id to bookingsArr of the user who made the booking. 
            await updateDoc( doc( db , `users/${user.userUid}`) , {
                bookingsArr : arrayUnion(`${bookingUid}`)
            }) 

            // if control passes this point, the booking was a success 
            // display success snackbar
            closeModal(true);
            triggerSnackbar({displayMessage : "Booking Successful !!" , severity : "success" })
    
        }
        catch(error){
            console.log(error);
            // display error snackbar
            triggerSnackbar({displayMessage : "Booking Failed -- Database error!!" , severity : "error " })
            closeModal(true);
        }
    }

      // for the order summary that has to be shown in the this component ( subtotal modal )
  // the output format will be a string like "dd mm yyy"
 function getFormattedDate(dateObj){
  let isoString = dateObj.toISOString();
  let dateComponents = isoString.split(":")[0].split("T")[0].split("-");
  let formattedDate = `${dateComponents[2]} ${dateComponents[1]} ${dateComponents[0]}`
  return formattedDate;
}


    console.log("the formatted date <----------------->")
    console.log(getFormattedDate(checkInDate));

  return (
    <>
        <Box sx={{ width : "520px", height : "630px" , p : 2 , border : "1px solid grey" , backgroundColor : "white" , borderRadius : "5px" ,  display : "flex" , alignItems : "center" , justifyContext : "center"}}> 
          

          {/* if the user is logged in, s(he) will be shown the summary page else s(he) will asked to sign up ( within the modal itself) */}
          
          {
            ( user != null )
            ? 
            <Box>
              <ClearIcon onClick={ closeModal } fontSize="small" sx={{ marginLeft : "auto" , display : "block" , color : "grey.dark" , pb : 1}}/>
              <KeyIcon sx={{ marginLeft : "auto" , marginRight : "auto" ,  display : "block" , fontSize : "6rem" , pb : 4}} /> 
              <Typography variant="h3" color="grey." sx={{ pb : 3 , textAlign : "center"}}> Book Your Trip </Typography>
              <Typography sx={{ pb : 2 , textAlign : "center" , color : "grey.dark" }}> Enter your payment information to book the listing from the dates between <Typography component={"span"} display="inline" sx={{ fontWeight : 500 , backgroundColor:"#FFE58F" }}>  { getFormattedDate(checkInDate) } </Typography> to <Typography component={"span"} display="inline" sx={{ fontWeight : 500 , backgroundColor:"#FFE58F" }}> { getFormattedDate(checkOutDate) } </Typography> inclusive </Typography> 
              <Divider sx={{ pb : 2 }} />
              <Typography sx={{ textAlign : "center" , pt : 2 , pb : 2}}> {` $${pricesPerDay} x ${stayDurationInDays} days = $${total}`}  </Typography> 
              <Typography sx={{ textAlign : "center" , pb : 2}}> {`TinyHouse fee = $${tinyHouseFee}`} </Typography> 
              <Typography sx={{ textAlign : "center" , pb : 2}}> Total =  <Typography component={"span"} display="inline" sx={{ color : "#D1D1D1"}}> {`$${grandTotal}`} </Typography> </Typography> 
              <Divider/>
              <Box sx={{ pt : 4 , pb : 2 , display : "flex" , jusifyContext : "center"}}>
                  {/* commenting out the stripe container ( credit card details ) temporarily */}
                  {/* <StripeContainer /> */}


                  {/* confirm booking button only creates a booking in firestore */}
                  <Button
                  onClick={ createBooking }
                  variant="outlined"
                  sx={{ mx : "auto"}}
                  > 
                    Confirm Booking
                  </Button>
                  
              </Box>

              {/* <Typography sx={{ textAlign : "center" , color : "grey.medium"}}> Test using the credit card number: 4242 4242 4242 4242, a future expiry date, any 3 digits for the CVC code and any 5 digits for the postcode. </Typography> */}
            </Box>
            :
            <Box > 
              <Typography variant="h3" gutterBottom sx={{ fontWeight : 500 , color : "primary.dark" , textAlign : "center" , ml : "auto" , mr : "auto"}} > Sign in to book your listing </Typography>
              <Button variant="contained" onClick={ signInWithFirebase } size="small" sx={{ ml : "auto" , mr : "auto"  }}> Sign In </Button>
            </Box>

          }

        </Box>


    </>
  )
}
