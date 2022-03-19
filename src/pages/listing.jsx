import { useState , useEffect , useContext , createContext  } from "react";
import { v4 as uuidv4 } from 'uuid';
// mui components
import { 
    Box , 
    Paper , 
    Container , 
    AppBar , 
    Toolbar , 
    Button , 
    Typography , 
    TextField , 
    IconButton ,
    Link,
    Pagination,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    Avatar,
    Stack,
    Skeleton,
    Modal,
} from "@mui/material";
import LearningDatePickers from "../components/learningDatePicker";
import DatePickers from "../components/datePickers";

// custom components
import Navbar from "../components/navbar";
import SubtotalModal from "../components/subtotalModal";
// assets
import bedroomInterior from "../assets/images/bedroomInterior.jpg"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import lexAvatar from "../assets/images/lexAvatar.jpg"
import CheckoutComponent from "../components/checkoutComponent";

import { Booking , bookingConverter } from "../firebase/firestore";

// firebase
import { getDocs , doc , query , collection , where , getDoc } from "firebase/firestore";
import { getBytes , ref  } from "firebase/storage";
import { db , storage } from "../firebase/firebase";

// react router dom
import { useParams } from "react-router-dom";
// auth context
import { authContext } from "../contexts/authContext";
import { randomNames } from "../assets/staticData/propertyDescriptions";
import StripeContainer from "../components/StripeContainer";
import CustomizedSnackbar from "../components/customizedSnackbar";
import ListingSnackbar from "../components/listingSnackbar";

export const listingContext = createContext();

// imp CONVENTION -- checkoutdate will not be considered as part of the stay. ie. guests will check out early morning on the checkout date

const Listing = () => {

    let [ dateState , setDateState ] = useState( { checkInDate : null , checkOutDate : null} ); // initial values yo!!
    let [ propertyDetails , setpropertyDetails ] = useState();  // the details that need to be populated in the listing component
    let [ hostUid , setHostUid ] = useState();
    let [ hostName , setHostName ] = useState();
    let [ modalVisibility , setModalVisibility ] = useState(false); 
    let [ snackbarContent , triggerSnackbar ] = useState({ displayMessage  : null , severity : null });   // contains the contents that will be displayed in a error snackbar. ( triggered when there is a stripe error or a firebase error etc etc )


    let openModal = () => { setModalVisibility(true) };
    let closeModal = () => { setModalVisibility(false) };

    let { propertyUid } = useParams();

    // for testing
    useEffect( () => {
        console.log(dateState);
    } , [ dateState ])
    useEffect( () => {
        console.log(propertyDetails);
    } , [propertyDetails])

    // getting the property listings details from Firestore after first render.
    useEffect( async () => {
        let propertyQuery = query( collection( db , "listings") , where("propertyUid" , "==" , propertyUid) );
        let querySnapshot = await getDocs(propertyQuery);
        // let propertyRef = doc( db , `listings/${propertyUid}`);
        // let propertyDetails = (await getDoc( propertyRef )).data().propertyDetails;
        let queryData = querySnapshot.docs[0].data();   // subset of property object
        let propertyDetails = queryData.propertyDetails;
        let hostUid = queryData.hostUid;
        setpropertyDetails(propertyDetails);
        setHostUid(hostUid);
    } , [])



    // function createBooking(){
    //     // will get the checkindate and checkoutdate from the state
    //     let checkindate = dateState.checkInDate;
    //     let checkoutdate = dateState.checkOutDate;

    //     let bookingUid = uuidv4();
    //     let bookingObj = new Booking( bookingUid , propertyUid , checkindate.toISOString() , checkoutdate.toISOString() );
        
    //     // add the booking id to bookingsArr of the user who booked it

    // }

    let stayDurationInDays = ( checkindate , checkoutdate ) => {
        // expects js date objects
        // assumes that the checkdate and checkout dates are correct ie. not in the past + ( checkout > checkin )
   
       let checkindateWithoutTime = checkindate.toISOString().split("T")[0];  // this is a string. not a Date object. we have picked up only non time info
       let checkindateObj = new Date(checkindateWithoutTime); // date object of the checkInDate. ( will have T00:00.00.000Z instead of the proper timestamp)
   
       let checkoutdateWithoutTime = checkoutdate.toISOString().split("T")[0];  // this is a string. not a Date object. we have picked up only non time info
       let checkoutdateObj = new Date(checkoutdateWithoutTime); // date object of the checkInDate. ( will have T00:00.00.000Z instead of the proper timestamp)
   
       // checkout date is part of the stay.
        let microSecondsDiff = Math.abs( checkoutdateObj.getTime() - checkindateObj.getTime());
        let diffInDays = Math.round( microSecondsDiff / (1000 * 60 * 60  * 24) );
        diffInDays++;   // makes sure that the checkout date too is part of the stay. ie 3rd to 5th = 3 days stay. NOT 5-3 ie 2 days stay. 
        
        if(diffInDays > 0 ){
           return diffInDays;
        }
        else{
            console.log("invalid inputs -- the checkoutdate is before checkindate")
            return null;
        }
    }

    useEffect( () => {
        setHostName(getRandomHostName());
    } , [ ] )

    function getRandomHostName(){
        return randomNames[Math.floor( Math.random() * (randomNames.length - 1) )]
    }

    return (
    <>
    <Navbar/> 
    <Container  maxWidth="xl" sx={{ mx:"clamp(8px , auto , auto )" }}> 
        <Box sx={{ mt: 10 }}>


            <Box  sx={{ display:"grid" , gridTemplateColumns : { xs : "100%" , md : "60% 40%"} ,  gridGap : 10 }} > 
                
                {/* img + description section */}
                <Box >
                    {/* image */}
                    <Box 
                    component="img" 
                    // src={ bedroomInterior }
                    src={ (propertyDetails && propertyDetails.image) || "" }
                    sx={{ 
                            // backgroundColor : "lightgreen" ,                        
                            width : "100%" , 
                            height : { xs : "380px" , lg : "570px" } , 
                            objectFit : "cover" , 
                            mb : 2, 
                            background : "1px solid black" }}
                    /> 

                    {/* description + details start here  ---------------- */}

                    <Box sx={{ mb : 1}}> 
                        
                        <Box 
                        component = "span" 
                        sx={{ display : "inline" , }}> 
                                <LocationOnOutlinedIcon fontSize="1.4rem" sx={{ position : "relative" , top : "3px" , color : "primary.main" ,  }} /> 
                                {/* <Link variant="body2"  src="https://mui.com/api/link/" sx={{ color : "primary.main"  }} underline="never">  </Link> */}
                        </Box>

                        <Typography variant="body1" display="inline" color="grey.medium">  { ( propertyDetails && propertyDetails.address ) || "" }   </Typography> 

                    </Box>

                    <Typography variant="h3" sx={{ color:"primary.dark" , fontWeight : 500 , mb : 3 }} > { ( propertyDetails && propertyDetails.listingDescription ) || "" }    </Typography>

                    <Divider sx={{ mb : 3 }} />
                    <Box display="flex" flexDirection="row" sx={{ mb : 3}} > 
                            <Avatar sx={{ height : "64px" , width : "64px"}} 
                            // src={ async () =>  await import(`../assets/images/hosts/${hostUid}.png`)  } 
                            /> 
                            <Typography component="span" display="inline" sx={{ fontFamily : "Sacramento, cursive" , fontSize : "2.5rem" , pl : 2 , position : "relative" , top : "5px" }} > { hostName } </Typography>
                    </Box> 
                    <Divider sx={{ mb : 4 }} />
                    <Typography variant="h3" color="primary.dark" sx={{ mb : 1}} > About this space </Typography>
                    
                    <Stack
                    spacing={ 1 }
                    direction="row" 
                    sx={{ mb : 2 }}
                    >  
                        <Box 
                        sx={{ 
                            backgroundColor : "pink.light" , 
                            display : "inline",
                            px : 0.6 , py : 0.1 ,  border : "1px" , borderColor : "pink.dark" , borderStyle : "solid"  }} elevation="0"> 
                            <Typography component="span" color="pink.dark"> { (propertyDetails && propertyDetails.homeType) || "" }  </Typography> 
                        </Box>

                        <Box 
                        sx={{ 
                            backgroundColor : "pink.light" , 
                            display : "inline",
                            px : 0.6 , py : 0.1 ,  border : "1px" , borderColor : "pink.dark" , borderStyle : "solid"  }} elevation="0"> 
                            <Typography component="span" color="pink.dark"> { (propertyDetails && propertyDetails.maxGuests) ? `${propertyDetails.maxGuests} guests` : "" } </Typography> 
                        </Box>

                    </Stack>

                    <Typography variant="body2" color="grey.medium" sx={{ mb : 10}} > { propertyDetails && propertyDetails.listingsDescription } </Typography>

                </Box> 
                
                {/* booking section */}
                <Box sx={{ width : "100%" }}>
                    <Paper variant="outlined" elevation="0" sx={{ maxWidth : "400px" , height : "431px" , p : 3 , mx : "auto" , mb : 5}}> 
                        
                        <Typography variant="h2" color="primary.dark" sx={{ fontWeight : "500" , textAlign : "center" , mb : 2 }} > 
                                { `$${ (propertyDetails && propertyDetails.pricesPerDay) || "" } ` }  
                                {/* we have nested this in such a way so that we can easily textAlign center the parent */}
                                {/* such nesting isnt really allowed, the console warns us */}
                                <Typography variant="h2" display="inline" color="grey.medium"> /day </Typography>
                        </Typography>
                        
                        <Divider sx={{ mb : 2 }} />
                        
                        <Typography variant="body1" sx={{ mb : 1 , textAlign : "center" , color : "grey.dark" }}> Check in </Typography>
                            <DatePickers  pickerDataType="checkin"  dateState= { dateState } setDateState = { setDateState } />
                        
                        <Typography variant="body1" sx={{ mb : 1 , textAlign : "center" , color : "grey.dark"}}> Check out </Typography>
                            <DatePickers  pickerDataType="checkout" dateState= { dateState } setDateState = { setDateState } />

                        <Divider sx={{ mb : 2 }} />
                        <Button 
                            variant="outlined" 
                            sx={{ color:"grey.dark" , display : "block" , mx : "auto" , borderColor : "grey.dark"  }}
                            onClick={ openModal }
                            disabled = { (dateState.checkInDate && dateState.checkOutDate) ? false : true }
                            > 
                                Request to Book 
                            </Button>  

                    </Paper>
                </Box> 

            </Box>

        </Box>
        
        {/* the subtotal modal ( one that will be opened when the user "Requests to book") */}
        <Modal open={modalVisibility} onClose={ closeModal } sx={{ width : "auto" , display: "flex" , alignItems : "center" , justifyContent : "center" }}>
            
            {
                modalVisibility
                && 
                <listingContext.Provider value={{ closeModal , propertyUid , dateState , triggerSnackbar}}>
                    <SubtotalModal 
                    selectedBookingDetails = {{ 
                        checkInDate : dateState.checkInDate , 
                        checkOutDate : dateState.checkOutDate , 
                        pricesPerDay : propertyDetails.pricesPerDay,
                        stayDurationInDays :  stayDurationInDays(dateState.checkInDate , dateState.checkOutDate),
                    }}
                    />
                </listingContext.Provider>
            }

        </Modal>

        {/* <CustomizedSnackbar snackbarContent={ snackbarContent } triggerSnackbar={ triggerSnackbar}  />  */}
        <ListingSnackbar snackbarContent={ snackbarContent } triggerSnackbar={ triggerSnackbar} />

    </Container>
    </>  
    );


}
 
export default Listing;