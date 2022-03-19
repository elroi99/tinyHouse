import { useState , useEffect , useRef } from "react";
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
} from "@mui/material";
import { pink } from "@mui/material/colors";
import Navbar from "../components/navbar";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchBar from "../components/searchBar";
import dubai from "../assets/images/dubai.jpg";
import toronto from "../assets/images/toronto.jpg";
import londonAspectChanged from "../assets/images/londonAspectChanged.jpg";
import losAngeles from "../assets/images/losAngeles.jpg";
import beachHouse from "../assets/images/beachHouse.jpg";
import houseWithPool from "../assets/images/houseWithPool.jpg";
import diningRoom from "../assets/images/diningRoom.jpg";
import brownCottage from "../assets/images/brownCottage.jpg";
import cancunPosterAspectChanged from "../assets/images/cancunPosterAspectChanged.jpg";
import goldenGatePoster from "../assets/images/goldenGatePoster.jpg";
import { a } from "../firebase/firestore";  // triggering the script only !!
import { getDocs , collection , query , startAt , orderBy,  endAt } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Card from "../components/card";


const FrontPage = () => {

    let dubaiImgRef = useRef();    // dubai img ref
    let lowCancunRef = useRef();     // for the cancun banner ( lower one)

    let history = useHistory(); 

    let [ sampleListingCards , setSampleListingCards ] = useState([]);

    // get 4 cards from firebase 
    useEffect( async () => {
        console.log("attempting yo !!")
        let sampleListingCardsQuery = query( collection( db , "listings") , orderBy("propertyUid") );
        try{
            let pulledCardsQueryDocumentSnapshotArr = (await getDocs(sampleListingCardsQuery)).docs; 
            console.log(pulledCardsQueryDocumentSnapshotArr)
            let listings = pulledCardsQueryDocumentSnapshotArr.map( (cardQDS) => { 
                return cardQDS.data()
            })
            setSampleListingCards(listings.slice(0 , 4))
        }
        catch(error){
            console.log(error)
        }

    } , [])

    //  static cities ( upper ones )
    let citiesUpper = [
        {
            name : "Toronto",
            cityUid : 1,    // change these
            imgURL : toronto,
            cityName : "toronto", // camel cased for use in url params
        },
        {
            name : "Dubai",
            cityUid : 2,  // change these
            imgURL : dubai,
            cityName : "dubai", // camel cased for use in url params

        },
        {
            name : "Los Angeles",
            cityUid : 3,  // change these
            imgURL : losAngeles,
            cityName : "losAngeles", // camel cased for use in url params

        },
        {
            name : "London",
            cityUid : 4,  // change these
            imgURL : londonAspectChanged,
            cityName : "london", // camel cased for use in url params

        },
    ]

    let citiesLower = [
        {
            text : "A weekend getaway to the \n Golden Gate Bridge? ",
            cityUid : 4,  // change these
            imgURL : goldenGatePoster,
            cityName : "sanFrancisco", // camel cased for use in url params


        },        
        {
            text : "Or a two-week trip to visit Cancun, Mexico?",
            cityUid : 4,  // change these
            imgURL : cancunPosterAspectChanged,
            cityName : "cancun", // camel cased for use in url params

        },
    ]

    // the data for the 4 listing cards will be pulled from firebase



    console.log("Inside FrontPage");
    return (
    <> 
    <Navbar/> 
    <Container  maxWidth="xl" sx={{ mx:"clamp(8px , auto , auto )" }}> 
        <Box sx={{ minHeight : "200vh" , mt: 10 }}>
            <Box >
                <Typography 
                gutterBottom 
                variant="h1" 
                color="primary.dark" 
                fontWeight="500" >
                    Find a place you'll love to stay
                </Typography>
                <SearchBar/>
            </Box> 

            <Box 
                sx={{ 
                    display : "grid" , 
                    gridTemplateColumns : { xs : "1fr 1fr" ,  md : "1fr 1fr 1fr 1fr" }, 
                    gridRowGap : 13 , 
                    gridColumnGap : 10 ,
                    width : "100%" , 
                    mt : 10,
                    mb : 10,
                    }}>

                    {
                        citiesUpper.map( (city) => {
                            return(
                                <Link 
                                href= { `/listing/${city.cityName}` } 
                                sx={{ textDecoration : "none" , color : "initial" }}
                                onClick={ (e) => { 
                                    // we only have to handle the left click ( cause we dont want LHS click to )
                                    e.preventDefault(); // stop the clicks default behavior
                                    history.push(`/listings/${city.cityName}`)
                                    }}
                                > 

                                    <Box sx={{ position : "relative" }}>
                                        <img style={{ width : "100%" , height : "auto" }} alt={ city.name} src={ city.imgURL } />      
                                        <Box 
                                                sx={{ 
                                                    backgroundColor : "rgba(51, 101, 126, 0.3)",
                                                    height : "98.7%",
                                                    width : "100%",
                                                    position : "absolute",
                                                    top : "0px",
                                                    left : "0px",

                                                    ":hover" : {
                                                        backgroundColor : "rgba(51, 101, 126, 0.05)",
                                                    }
                            
                                                }}> 
                                            <Typography sx={{ position : "absolute" , bottom : "20px" , left : "20px" , color : "white" , fontWeight : 500}}>
                                                { city.name }
                                            </Typography> 
                                        </Box>           
                                    </Box>

                                </Link>

                            )
                        })  
                    }

            </Box>

            <Box sx={{ mb : 10}}>
                
                    <Typography 
                    variant="h2" 
                    color="primary.dark" 
                    fontWeight="500"
                    sx={{ mb : 2 , width : "auto" , textAlign : "center"}}
                    > 
                        Your guide for all things rental
                    </Typography >
                    <Typography variant="body1" sx={{ mb : 4 , width : "auto" , textAlign : "center"}}> Helping you make the best decisions in buying, selling, & renting your last minute locations. </Typography>
                    <Button 
                    sx={{ display: "block" , backgroundColor : "primary.light" ,  color : "white" , fontWeight : "300" , mx : "auto" }}
                    onClick={ () => history.push("/listings/unitedStates")}
                    > Popular listings in the United States </Button>
                
            </Box> 
            
            <Box sx={{ mb : 10}}>
                    
                    {/* cards container title  */}
                    <Typography gutterBottom variant="h3" color="primary.dark" fontWeight="500"> Premium Listings  </Typography>
                    
                    {/* cards container */}
                    <Box 
                        sx= {{ 
                            width : "100%" ,  
                            backgroundColor : "grey" , 
                            // border : "1px solid black" , 
                            display : "grid",
                            gridGap : 7,
                            gridTemplateColumns : { xs : "1fr 1fr" , md : "1fr 1fr 1fr 1fr"} ,
                        }} >

                            {
                                sampleListingCards 
                                && 
                                sampleListingCards.map(( listing) => {
                                        let { propertyUid , propertyDetails : { address , title , pricesPerDay , maxGuests , image }  } = listing;

                                    return(
                                    <Card cardDetails = { listing } />
                                    )
                                })
                            }



                    </Box> 
            
            </Box>

            <Box sx={{ mb : 10 }} >
                <Typography gutterBottom variant="h3" color="primary.dark" fontWeight="500"> Listings of any kind </Typography> 
                
                {/* the two overlay posters */}
                <Box sx={{ display : "grid" , gridTemplateColumns : { xs : "1fr" , md : "1fr 1fr"} , gridGap : 7 }}>

                    {
                        citiesLower.map( (city) => {
                            return(
                                <Link 
                                href= { `/listing/${city.cityName}` } 
                                sx={{ textDecoration : "none" , color : "initial" }}
                                onClick={ (e) => { 
                                    // we only have to handle the left click ( cause we dont want LHS click to )
                                    e.preventDefault(); // stop the clicks default behavior
                                    history.push(`/listings/${city.cityName}`)
                                    }}
                                > 
                                    <Box sx={{ position : "relative" }}>
                                            <img src={ city.imgURL } style={{ width : "100%" , height : "auto" ,  objectFit : "cover" , backgroundColor : "blue" , opacity : 0.8  }} />
                                            <Box sx={{ backgroundColor : "rgba(49, 83, 142, 0.6)" , width : "100%" , height : "98%"  , position : "absolute" , top : "0px"}}>
                                                <Typography  variant="h3" sx={{ color : "white" , position : "absolute" ,  width : "100%" , fontWeight : 700 , top : "50%" , textAlign : "center"    }}> { city.text } </Typography>
                                            </Box> 
                                    </Box> 
                                </Link>
                            )
                        })
                    }

                </Box> 
            </Box>

            <Box sx={{ mb : 10 }}>
                <Typography variant="h2" fontWeight="500" color="primary.dark" textAlign="center" sx={{ mb : 5 }} > 
                    This app was cloned from <Link href="https://www.tinyhouse.app/" sx={{ fontStyle : "italic"  }}> Tiny House </Link> 
                </Typography>
                <Box display="flex" justifyContent="center" > 
                    <Button variant="outlined" display="inline" width="auto" 
                        onClick={ () => { window.open("https://www.tinyhouse.app/", "_blank")} } >
                        visit the original app 
                    </Button>
                </Box>
            </Box>



            {/* <Box 
            sx={{
                
                 }}> 
                <Typography sx ={{ color : "white" , background : "#C04848" , }}> Dubai !! </Typography>
            </Box>  */}

            {/* <a href="https://css-tricks.com/snippets/jquery/make-entire-div-clickable/" > 
                </Box>
                        <img sx={{ }} /> 
                        <Box sx={{ p : 3 , backgroundColor : "pink" , height : "200px"}}>    
                </Box> 
            </Link> */}
            
            {/* <Box> 
                <a href="#" onClick={ (e) => { e.preventDefault() }} > 
                    <Box sx={{ height : "100px" , width : "100px" , backgroundColor : "red"}}> </Box> 
                </a> 
            </Box> */}

            {/* <a 
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a" 
            onClick={ (e) => { 
                console.log("see the e event "); 
                console.log(e); 
                 }} 
            > 
            Check the event obj of a tag 
            </a> */}


        </Box>
    </Container>
    </>  );
}
 
export default FrontPage;