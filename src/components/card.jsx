import { useHistory } from "react-router-dom";
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
} from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import beachHouse from "../assets/images/beachHouse.jpg";


const Card = ( { cardDetails  } ) => {
    // the way the listings page is currently rendering the cards, undefined will never be passed to the Card.
    //ie. Card will not be rendered when the listings data state ( of listings ) is an empty array.
    let propertyUid = cardDetails.propertyUid;
    let propertyDetails = cardDetails.propertyDetails; // contains fields homeType , description etc etc
    let {  homeType , maxGuests , title , listingDescription , address , city , state , zipCode, image , pricesPerDay  } = propertyDetails;
    
    let history = useHistory();
    
    return (
    <>
        <Box sx={{boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"}}> 
        <Link 
        href= { `/listing/${propertyUid}` } 
        sx={{ textDecoration : "none" , color : "initial" }}
        onClick={ (e) => { 
            // we only have to handle the left click ( cause we dont want LHS click to )
            e.preventDefault(); // stop the clicks default behavior
            history.push(`/listing/${propertyUid}`)
            }}
        > 
            <Box> 
                <img height="195px" src={ image } width="100%" style={{ objectFit : "cover" }} /> 
            </Box>
            <Box sx={{ p : 3 }}>
                <Typography variant="body1" noWrap="true" gutterBottom  sx={{ color : "#1D226C" , display : "inlineBlock"  }}> { `$${pricesPerDay}`} <Typography component={"span"} display="inline" sx={{ color : "#D1D1D1"}}>/day</Typography> </Typography>
                <Typography noWrap="true" textDecoratoin="none" sx={{ textDecoration : "none" }} > { title } </Typography>
                <Typography gutterBottom noWrap={ true } sx={{ mb:1 , color : "grey.medium" }}> { address } </Typography>
                <Box display="flex"> 
                    <Box > 
                        <HomeOutlinedIcon fontSize="1.4rem" sx={{ color:"primary.main" }}  />
                    </Box>
                    <Box ml="auto" minWidth="maxContent"> 
                        <PersonOutlineOutlinedIcon fontSize="1.4rem" sx={{ color:"primary.main" }} />
                        <Typography variant="body2" display="inline" position="relative" bottom="3px" color="grey.light "> {  `${maxGuests} guests` }</Typography>
                    </Box>
                </Box> 
            </Box> 
            </Link>
        </Box> 
    </>);
}
 
export default Card;