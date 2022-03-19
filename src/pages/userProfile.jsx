import { useState , useEffect } from "react";
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



const UserProfile = () => {
    
    // app user flow -- once a user fills and submits a host form ( to list his property) , once it is successful or failed , the user is redirected to the userProfile
    // a success or failure snackbar is shown on this page ( userProfile )
    let { acknowlegement } = useParams();   // optional params. contains "success" "failure" or undefined. when first two , show snackbar with suitable message. when undefined , dont show snackbar
    let [ snackbarStatus , setSnackbarStatus ] = useState({ open : false , color : "" , message : "" });


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

    return (
        <> 
    <Navbar/> 
    <Container  maxWidth="xl" sx={{ mx:"clamp(8px , auto , auto )" }}> 
    <Box sx={{ minHeight : "200vh" , mt: 10  }}>
            {/* user profile card */}
            <Paper variant="outlined" elevation="0" sx={{ width : "400px" , p : 3 , mx : "auto" , mb : 10}}> 
                <Avatar sx={{ height : "100px" , width : "100px" , mb : 2 , mx : "auto"}} > </Avatar>
                <Divider sx={{ mb : 3}} />
                <Typography variant="h3" color="primary.dark" sx={{ mb : 1}}> Details </Typography>
                <Typography component="div" variant="body1" color="grey.dark" sx={{ mb : 1 }}>  Name <Typography component="div" display="inline" variant="body2" color="black"> : Elroi Noronha </Typography> </Typography>
                <Typography component="div" variant="body1" color="grey.dark" sx={{ mb : 3}}> Contact Details <Typography component="div" display="inline" variant="body2" color="black"> : elroinoronha2@gmail.com </Typography> </Typography>
                <Divider sx={{ mb : 3}} />
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
            </Paper>

            <Box sx={{ mb : 7}}> 
                <Typography variant="h3" fontWeight="500" color="primary.dark" sx={{ mb : 2}}> Listings </Typography>
                <Typography variant="body1" color="grey.medium" sx={{ mb : 5}}> This section highlights the listings this user currently hosts and has made available for bookings. </Typography>
                <Box> 
                    {/* will contain the users listings or the "no listings" statement. + a "create a listing" button ? */}
                    <Typography component="div" variant="body3" textAlign="center" color="grey.medium"> Your own custom listings can't be created in this demo version of the TinyHouse application! </Typography>  
                </Box>
            </Box>

            < Box > 
                <Typography variant="h3" fontWeight="500" color="primary.dark" sx={{ mb : 2}}> Bookings </Typography>
                <Typography variant="body1" color="grey.medium" sx={{ mb : 5}}> This section highlights the bookings you've made, and the check-in/check-out dates associated with said bookings. Here, you're able to rate a booking once you've made a successful payment. </Typography>
                
                <Box sx={{  display : "grid" , gridTemplateColumns : { xs : "1fr" , sm : "1fr 1fr" , md : "1fr 1fr 1fr 1fr" , } , gridRowGap : 13 , gridColumnGap : 10, mb : 10 , pt : 3}} > 
                    
                    {/* contains the full card ie. checkin , checkout dates + listing card */}
                    <Box> 
                        
                        <Box sx={{ mb : 3}}> 
                            {/* checkin date */}
                            <Typography variant="body1" component="div" display="inline" color="grey.medium" sx={{ mb : 3}}>
                                Check in &nbsp;
                                <Typography variant="body1" component="div" display="inline" sx={{ fontWeight : 500 }}>  
                                : 2020-09-12 
                                </Typography>  
                            </Typography> 

                            <br/>

                            {/* checkout date */}
                            <Typography variant="body1" component="div" display="inline" color="grey.medium" sx={{ mb : 2}}>
                                Check out &nbsp;
                                <Typography variant="body1" component="div" display="inline" sx={{ fontWeight : 500 }}>  
                                    : 2020-09-15
                                </Typography> 
                            </Typography>
                        </Box>


                        {/* listing card ( listing only without dates) */}
                        <Box sx={{boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"}}> 
                            <Box> 
                                <img height="195px" src={ beachHouse } width="100%" style={{ objectFit : "cover" }} /> 
                            </Box>
                            <Box sx={{ p : 3 }}>
                                <Typography variant="body1" noWrap="true" gutterBottom  sx={{ color : "#1D226C" , display : "inlineBlock" }}> $128<Typography component={"span"} display="inline" sx={{ color : "#D1D1D1"}}>/day</Typography> </Typography>
                                <Typography noWrap="true" > Spacious 2 story beach house </Typography>
                                <Typography gutterBottom noWrap="true" sx={{ mb:1 }}> 100 Punta Nizuc Road , Cancun </Typography>
                                <Box display="flex"> 
                                    <Box > 
                                        <HomeOutlinedIcon fontSize="1.4rem" sx={{ color:"primary.main" }}  />
                                    </Box>
                                    <Box ml="auto" minWidth="maxContent"> 
                                        <PersonOutlineOutlinedIcon fontSize="1.4rem" sx={{ color:"primary.main" }} />
                                        <Typography variant="body2" display="inline" position="relative" bottom="3px" color="grey.light "> 4 guests </Typography>
                                    </Box>
                                </Box> 
                            </Box> 
                        </Box>

                        {/* listing card ( listing only without dates) */}
                        <Box sx={{boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"}}> 
                            <Box> 
                                <img height="195px" src={ "../" } width="100%" style={{ objectFit : "cover" }} /> 
                            </Box>
                            <Box sx={{ p : 3 }}>
                                <Typography variant="body1" noWrap="true" gutterBottom  sx={{ color : "#1D226C" , display : "inlineBlock" }}> $128<Typography component={"span"} display="inline" sx={{ color : "#D1D1D1"}}>/day</Typography> </Typography>
                                <Typography noWrap="true" > Spacious 2 story beach house </Typography>
                                <Typography gutterBottom noWrap="true" sx={{ mb:1 }}> 100 Punta Nizuc Road , Cancun </Typography>
                                <Box display="flex"> 
                                    <Box > 
                                        <HomeOutlinedIcon fontSize="1.4rem" sx={{ color:"primary.main" }}  />
                                    </Box>
                                    <Box ml="auto" minWidth="maxContent"> 
                                        <PersonOutlineOutlinedIcon fontSize="1.4rem" sx={{ color:"primary.main" }} />
                                        <Typography variant="body2" display="inline" position="relative" bottom="3px" color="grey.light "> 4 guests </Typography>
                                    </Box>
                                </Box> 
                            </Box> 
                        </Box>
                    </Box>


                    {/* card2 */}
                    {/* contains the full card ie. checkin , checkout dates + listing card */}
                    <Box> 
                        
                        <Box sx={{ mb : 3}}> 
                            {/* checkin date */}
                            <Typography variant="body1" component="div" display="inline" color="grey.medium" sx={{ mb : 3}}>
                                Check in &nbsp;
                                <Typography variant="body1" component="div" display="inline" sx={{ fontWeight : 500 }}>  
                                : 2020-09-12 
                                </Typography>  
                            </Typography> 

                            <br/>

                            {/* checkout date */}
                            <Typography variant="body1" component="div" display="inline" color="grey.medium" sx={{ mb : 2}}>
                                Check out &nbsp;
                                <Typography variant="body1" component="div" display="inline" sx={{ fontWeight : 500 }}>  
                                    : 2020-09-15
                                </Typography> 
                            </Typography>
                        </Box>


                        {/* listing card ( listing only without dates) */}
                        <Box sx={{boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"}}> 
                            <Box> 
                                <img height="195px" src={ beachHouse } width="100%" style={{ objectFit : "cover" }} /> 
                            </Box>
                            <Box sx={{ p : 3 }}>
                                <Typography variant="body1" noWrap="true" gutterBottom  sx={{ color : "#1D226C" , display : "inlineBlock" }}> $128<Typography component={"span"} display="inline" sx={{ color : "#D1D1D1"}}>/day</Typography> </Typography>
                                <Typography noWrap="true" > Spacious 2 story beach house </Typography>
                                <Typography gutterBottom noWrap="true" sx={{ mb:1 }}> 100 Punta Nizuc Road , Cancun </Typography>
                                <Box display="flex"> 
                                    <Box > 
                                        <HomeOutlinedIcon fontSize="1.4rem" sx={{ color:"primary.main" }}  />
                                    </Box>
                                    <Box ml="auto" minWidth="maxContent"> 
                                        <PersonOutlineOutlinedIcon fontSize="1.4rem" sx={{ color:"primary.main" }} />
                                        <Typography variant="body2" display="inline" position="relative" bottom="3px" color="grey.light "> 4 guests </Typography>
                                    </Box>
                                </Box> 
                            </Box> 
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Box>
        
        {/* rendered according to its state */}
        <SimpleSnackbar snackbarStatus={ snackbarStatus } setSnackbarStatus={ setSnackbarStatus } />  


    </Container>      
    </>
    );
}
 
export default UserProfile;