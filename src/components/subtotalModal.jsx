import { React , useContext } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import KeyIcon from '@mui/icons-material/Key';
import { Box , Typography , Divider } from "@mui/material"
import StripeContainer from './StripeContainer';
import { listingContext } from "../pages/listing";


export default function SubtotalModal({ selectedBookingDetails : { checkInDate , checkOutDate , pricesPerDay , stayDurationInDays } }) {

  let {  closeModal , triggerErrorSnackbar } = useContext(listingContext);

  console.log(` ${checkInDate} ${checkOutDate} ${pricesPerDay} ${stayDurationInDays} `);
  let total = pricesPerDay * stayDurationInDays; // does not include Tiny house commission
  let tinyHouseFee = total * 0.05;  // tinyHouseFee 5% of total 
  let grandTotal = (total + tinyHouseFee).toFixed();  // total amount that the user has to pay !!

  
  return (
    <>
        <Box sx={{ width : "520px", height : "630px" , p : 2 , border : "1px solid grey" , backgroundColor : "white" , borderRadius : "5px"}}> 
            <ClearIcon onClick={ closeModal } fontSize="small" sx={{ marginLeft : "auto" , display : "block" , color : "grey.dark" , pb : 1}}/>
            <KeyIcon sx={{ marginLeft : "auto" , marginRight : "auto" ,  display : "block" , fontSize : "6rem" , pb : 4}} /> 
            <Typography variant="h3" color="grey." sx={{ pb : 3 , textAlign : "center"}}> Book Your Trip </Typography>
            <Typography sx={{ pb : 2 , textAlign : "center" , color : "grey.dark" }}> Enter your payment information to book the listing from the dates between <Typography component={"span"} display="inline" sx={{ fontWeight : 500 , backgroundColor:"#FFE58F" }}>  March 16th 2022 </Typography> to <Typography component={"span"} display="inline" sx={{ fontWeight : 500 , backgroundColor:"#FFE58F" }}> March 21th 2022 </Typography> inclusive </Typography> 
            <Divider sx={{ pb : 2 }} />
            <Typography sx={{ textAlign : "center" , pt : 2 , pb : 2}}> {` $${pricesPerDay} x ${stayDurationInDays} days = $${total}`}  </Typography> 
            <Typography sx={{ textAlign : "center" , pb : 2}}> {`TinyHouse fee = $${tinyHouseFee}`} </Typography> 
            <Typography sx={{ textAlign : "center" , pb : 2}}> Total =  <Typography component={"span"} display="inline" sx={{ color : "#D1D1D1"}}> {`$${grandTotal}`} </Typography> </Typography> 
            <Divider/>
            <Box sx={{ pt : 4 , pb : 2}}>
                <StripeContainer />
            </Box>

            <Typography sx={{ textAlign : "center" , color : "grey.medium"}}> Test using the credit card number: 4242 4242 4242 4242, a future expiry date, and any 3 digits for the CVC code. </Typography>
        </Box>
    </>
  )
}
