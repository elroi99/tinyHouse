import { useState , useEffect , useContext } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
// custom components
import Navbar from "../components/navbar";
import SimpleSnackbar from "../components/simpleSnackbar";
// assets
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import beachHouse from "../assets/images/beachHouse.jpg";

// contexts
import { authContext } from "../contexts/authContext";
import { getDocs , collection , query , where } from "firebase/firestore";
import { db } from "../firebase/firebase";


const UserProfile = () => {
    
    // app user flow -- once a user fills and submits a host form ( to list his property) , once it is successful or failed , the user is redirected to the userProfile
    // a success or failure snackbar is shown on this page ( userProfile )
    let { acknowlegement } = useParams();   // optional params. contains "success" "failure" or undefined. when first two , show snackbar with suitable message. when undefined , dont show snackbar
    let [ snackbarStatus , setSnackbarStatus ] = useState({ open : false , color : "" , message : "" });
    let [ userListingsState , setUserListingsState ] = useState([]);  // the properties listed by the current user
    let [ userBookingsState , setUserBookingsState ] = useState([]);  // the booking objects of a user ( does not contain property details, contains property uid , check in and check out dates etc)
    let [ bookingPropertiesState , setUserBookingPropertiesState ] = useState([]);    // all the properties that have been booked by the logged in user.  ( contains the property details ie. title , address etc etc)       


    let { userUid , displayName } = useContext( authContext );

    // get all the listings and the bookings of a user.
    useEffect( async () => {
        // get all the listings put up by the user
        let listingsQuery = query( collection(db , "listings") , where("userUid" , "==" , userUid ));
        let userListings = (await getDocs( listingsQuery ))
        console.log(userListings.size); // the number of listings set by our user.
        // .docs.map((queryDocumentSnapshot) => queryDocumentSnapshot.data());
        setUserListingsState(userListings);
        
        // get all the bookings of the user
        let bookingsQuery = query( collection(db , "bookings") , where("userUid" , "==" , userUid ));
        let userBookings = (await getDocs( bookingsQuery )).docs.map((queryDocumentSnapshot) => queryDocumentSnapshot.data())
        console.log(userBookings);
        setUserBookingsState(userBookings);

        let bookingsPropertiesUidArr = [];  // after the forEach runs, it will contian all the propertyUids that are needed on this page.
        userBookings.forEach( (booking) => {
                // adds a propertyUid to the array if it isnt already in there. 
                if( !(bookingsPropertiesUidArr.includes(booking.propertyUid)) ){
                    bookingsPropertiesUidArr.push(booking.propertyUid); 
                }
            })
        console.log(bookingsPropertiesUidArr)
        // the bookingsPropertiesUidArr will now contain all the property Objects that we need on this page.

        // next, we will fetch the propertyObjects ie listings based on the propertyUid's from firebase
        // the firebase the "in" operator of firestore query supports a max of 10 entries.
        // I could have written a workaround for this eg. suppose there were 100 entries, I could have split them into 10 arrays of 10 each 
        // and then run many queries with Promise.all / await in a loop. then merge all of it. 
        // below, i simply do not  support more than 10 unique entries. ( the balance is discarded )
        if(bookingsPropertiesUidArr.length  > 10){
            bookingsPropertiesUidArr =  bookingsPropertiesUidArr.slice(0  , 10);    // 10th index isnt included
        }
        console.log(bookingsPropertiesUidArr)
        let bookingsPropertyDetailsQuery = query( collection( db , "listings") , where("propertyUid" , "in" , bookingsPropertiesUidArr ));
        let uniqueBookingsProperties = (await getDocs( bookingsPropertyDetailsQuery )).docs.map((queryDocumentSnapshot) => queryDocumentSnapshot.data())
        console.log(uniqueBookingsProperties);
        setUserBookingPropertiesState(uniqueBookingsProperties);
    } , [] )

    // testing the previous useEffect
    useEffect(() => {
        console.log(userListingsState);
        console.log(userBookingsState);
        console.log(bookingPropertiesState)
    } , [ userListingsState , userBookingsState , bookingPropertiesState])

    // the params received will indicate if the snackbar is supposed to be shown or not. this useEffect changes the state in order to implement that desire
    // checking if success or failure snackbar has to be shown ( when user is redirected from form)
    useEffect( ()=> {
        if(acknowlegement){
            // if acknowlegement is not undefined, it can only be "success" or 'failure'
            acknowlegement === "success" 
            ? 
            setSnackbarStatus({ open : true , color : "green" , message : "Listing uploaded successfully"}) 
            :
            setSnackbarStatus({ open : true , color : "red" , message : "Oops ! Listings failed"})
        }
    } , [])


     function getFormattedDate(isoString){
        let dateComponents = isoString.split(":")[0].split("T")[0].split("-");
        let formattedDate = `${dateComponents[2]} ${dateComponents[1]} ${dateComponents[0]}`
        return formattedDate;
    }


    return (
        <> 
    <Navbar/> 
    <Container  maxWidth="xl" sx={{ mx:"clamp(8px , auto , auto )" }}> 
    <Box sx={{ minHeight : "200vh" , mt: 15  }}>
            {/* user profile card */}
            <Paper variant="outlined" elevation="0" sx={{ width : "400px" , p : 3 , mx : "auto" , mb : 10}}> 
                <Avatar sx={{ height : "100px" , width : "100px" , mt : 3 ,  mb : 4 , mx : "auto" , backgroundColor : "#FF5722"}} > { displayName.charAt(0).toUpperCase().toString() }  </Avatar>
                <Divider sx={{ mb : 3}} />
                <Typography variant="h3" color="primary.dark" sx={{ mb : 2}}> Details </Typography>
                <Typography component="div" variant="body1" color="grey.dark" sx={{ mb : 1.4 }}>  Name <Typography component="div" display="inline" variant="body2" color="black"> : Elroi Noronha </Typography> </Typography>
                <Typography component="div" variant="body1" color="grey.dark" sx={{ mb : 8}}> Contact Details <Typography component="div" display="inline" variant="body2" color="black"> : elroinoronha2@gmail.com </Typography> </Typography>
                {/* <Divider sx={{ mb : 3}} /> */}

                {/* the section relevant to stripe ( commenting it out for now) */}
                {/* <Box>
                    <Typography variant="h3" color="primary.dark" sx={{ mb : 1}}> Additional Details </Typography>
                    <Box 
                        sx={{ 
                            backgroundColor : "success.ultralight", 
                            display : "inline",
                            px : 0.6 , py : 0.1 ,  border : "1px" , borderRadius : 1 ,  borderColor : "success.main" , borderStyle : "solid" ,   }} elevation="0"> 
                            <Typography component="span" color="success.main" variant="body2"> Stripe Registered </Typography> 
                    </Box>
                    <Typography component="div" variant="body1" color="grey.dark"  sx={{ mt : 2 , mb : 2}}> Income Earned : <Typography component="div" display="inline" variant="body2" color="black"> $0 </Typography> </Typography>
                    <Button variant="contained" color="primary" disableElevation="true" sx={{ mb : 4}}> Disconnect Stripe </Button> 
                    <Typography color="grey.dark" gutterBottom> By disconnecting, you won't be able to receive <span style={{ fontWeight : "500"}}> any further payments. </span>  This will prevent users from booking listings that you might have already created. </Typography>
                </Box> */}

            </Paper>

            <Box sx={{ mb : 7}}> 
                <Typography variant="h3" fontWeight="500" color="primary.dark" sx={{ mb : 2}}> Listings </Typography>
                <Typography variant="body1" fontWeight="300" sx={{ mb : 6}}> This section highlights the listings this user currently hosts and has made available for bookings. </Typography>

                {/* if you plan on displaying the user-generated listings, get them from the "userGeneratedListings" collection  */}
                <Box> 
                    {/* will contain the users listings or the "no listings" statement. + a "create a listing" button ? */}
                    <Typography component="div" variant="body3" textAlign="center" color="grey.medium"> Your own custom listings can't be created in this demo version of the TinyHouse application! </Typography>  
                </Box>
            </Box>

            < Box > 
                <Typography variant="h3" fontWeight="500" color="primary.dark" sx={{ mb : 2}}> Bookings </Typography>
                <Typography variant="body1" fontWeight="300"  sx={{ mb : 6}}> This section highlights the bookings you've made, and the check-in/check-out dates associated with said bookings. Here, you're able to rate a booking once you've made a successful payment. </Typography>
                
                <Box sx={{  display : "grid" , gridTemplateColumns : { xs : "1fr" , sm : "1fr 1fr" , md : "1fr 1fr 1fr 1fr" , } , gridRowGap : 13 , gridColumnGap : 10, mb : 10 , pt : 3}} > 
                    
                    {/* render all bookings of the user using map */}
                    {   
                        (userBookingsState.length > 0)
                        && 
                        userBookingsState.map((booking) => {
                            // get the correct propertyDetails for the current entry.
                            let currentPropertyDetails = (bookingPropertiesState.find(( property ) => (property.propertyUid === booking.propertyUid) ))
                            console.log("Current property details");
                            // console.log(currentPropertyDetails.propertyDetails.address)
                            
                            // TODO -- actually use the current property details below.

                            return(<>
                                    {/* contains the full card ie. checkin , checkout dates + listing card */}
                                    <Box> 
                                        
                                        <Box sx={{ mb : 3}}> 
                                            {/* checkin date */}
                                            <Typography variant="body1" component="div" display="inline" fontWeight="300"  sx={{ mb : 3}}>
                                                Check in &nbsp;
                                                <Typography variant="body1" component="div" display="inline" sx={{ fontWeight : 300 }}>  
                                                : { getFormattedDate(booking.checkInDate)}
                                                </Typography>  
                                            </Typography> 

                                            <br/>

                                            {/* checkout date */}
                                            <Typography variant="body1" component="div" display="inline" fontWeight="300"  sx={{ mb : 2}}>
                                                Check out &nbsp;
                                                <Typography variant="body1" component="div" display="inline" sx={{ fontWeight : 300 }}>  
                                                    : { getFormattedDate(booking.checkOutDate)}
                                                </Typography> 
                                            </Typography>
                                        </Box>


                                        {/* listing card ( listing only without dates) */}
                                        <Box sx={{boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"}}> 
                                            <Box> 
                                                <img height="195px" src={ currentPropertyDetails && currentPropertyDetails.propertyDetails.image } width="100%" style={{ objectFit : "cover" }} /> 
                                            </Box>
                                            <Box sx={{ p : 3 }}>
                                                <Typography variant="body1" noWrap="true" gutterBottom  sx={{ color : "#1D226C" , display : "inlineBlock" }}> { `$${currentPropertyDetails && currentPropertyDetails.propertyDetails.pricesPerDay}` } <Typography component={"span"} display="inline" sx={{ color : "#D1D1D1"}}>/day</Typography> </Typography>
                                                <Typography sx={{  fontWeight : 300 , color : "grey.dark" }} > { currentPropertyDetails && currentPropertyDetails.propertyDetails.title } </Typography>
                                                <Typography gutterBottom sx={{ mb:1  , color : "grey.medium" }}> { currentPropertyDetails && currentPropertyDetails.propertyDetails.address } </Typography>
                                                <Box display="flex"> 
                                                    <Box > 
                                                        <HomeOutlinedIcon fontSize="1.4rem" sx={{ color:"primary.main" }}  />
                                                    </Box>
                                                    <Box ml="auto" minWidth="maxContent"> 
                                                        <PersonOutlineOutlinedIcon fontSize="1.4rem" sx={{ color:"primary.main" }} />
                                                        <Typography variant="body2" display="inline" position="relative" bottom="3px" color="grey.light"> { `${ currentPropertyDetails && ( (currentPropertyDetails.propertyDetails.maxGuests === 0) ? 0 : currentPropertyDetails.propertyDetails.maxGuests ) } guests` } </Typography>
                                                    </Box>
                                                </Box> 
                                            </Box> 
                                        </Box>

                                    </Box>
                            </>)
                        })
                    }



                </Box>

                    {/* in case there are no bookings yet */}
                    {   
                        (userBookingsState && userBookingsState.length === 0)
                        &&
                        <Box sx={{ display: "flex" , justifyContent : "center"}}>
                            <Typography variant="body1" color="grey.medium" sx={{ mb : 5}}> You currently do not have any bookings </Typography>
                        </Box>
                    }
                    
            </Box>
        </Box>
        
        {/* rendered (opened or closed ) according to its state */}
        <SimpleSnackbar snackbarStatus={ snackbarStatus } setSnackbarStatus={ setSnackbarStatus } />  


    </Container>      
    </>
    );
}
 
export default UserProfile;