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
import dubaiDimensionsReduced from "../assets/images/dubaiDimensionsReduced.jpg";
import torontoDimensionsReduced from "../assets/images/torontoDimensionsReduced.jpg";
import londonAspectChangedDimensionsReduced from "../assets/images/londonAspectChangedDimensionsReduced.jpg";
import losAngelesDimensionsReduced from "../assets/images/losAngelesDimensionsReduced.jpg";
import beachHouse from "../assets/images/beachHouse.jpg";
import houseWithPool from "../assets/images/houseWithPool.jpg";
import diningRoom from "../assets/images/diningRoom.jpg";
import brownCottage from "../assets/images/brownCottage.jpg";
import cancunPosterAspectChangedDimensionsReduced from "../assets/images/cancunPosterAspectChangedDimensionsReduced.jpg";
import goldenGatePoster from "../assets/images/goldenGatePoster.jpg";
import githubLogo from "../assets/images/githubLogo.png"
import linkedinLogo from "../assets/images/linkedinLogo.png"
import twitterLogo from "../assets/images/twitterLogo.png"
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
            imgURL : torontoDimensionsReduced,
            cityName : "toronto", // camel cased for use in url params
        },
        {
            name : "Dubai",
            cityUid : 2,  // change these
            imgURL : dubaiDimensionsReduced,
            cityName : "dubai", // camel cased for use in url params

        },
        {
            name : "Los Angeles",
            cityUid : 3,  // change these
            imgURL : losAngelesDimensionsReduced,
            cityName : "losAngeles", // camel cased for use in url params

        },
        {
            name : "London",
            cityUid : 4,  // change these
            imgURL : londonAspectChangedDimensionsReduced,
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
            imgURL : cancunPosterAspectChangedDimensionsReduced,
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
            <Box sx={{ mt : 15 }}>
                <Typography 
                gutterBottom 
                variant="h1" 
                color="primary.dark" 
                fontWeight="500" >
                    Find a place you'll love to stay
                </Typography>
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
                        citiesUpper.map( (city , index) => {
                            return(
                                <Link 
                                key={ index }
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
                    <Typography variant="body1" sx={{ mb : 4 , width : "auto" , textAlign : "center" , fontWeight : 300 }}> Helping you make the best decisions in buying, selling, & renting your last minute locations. </Typography>
                    <Button 
                    sx={{ 
                        display: "block" , 
                        backgroundColor : "primary.light" ,  
                        color : "white" , 
                        fontWeight : "300" , 
                        mx : "auto" , 
                        ":hover" : { backgroundColor : "#61b3ff" } 
                    }}
                    onClick={ () => history.push("/listings/unitedStates")}
                    > 
                        Popular listings in the United States 
                    </Button>
                
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
                                sampleListingCards.map(( listing , index) => {
                                        let { propertyUid , propertyDetails : { address , title , pricesPerDay , maxGuests , image }  } = listing;

                                    return(
                                    <Card cardDetails = { listing } key={index} />
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
                {/* <Box display="flex" justifyContent="center" > 
                    <Button variant="outlined" display="inline" width="auto" 
                        onClick={ () => { window.open("https://www.tinyhouse.app/", "_blank")} } >
                        visit the original app 
                    </Button>
                </Box> */}
            </Box>

        </Box>

        {/* footer with socials + links */}
        <Box sx={{ display : "flex" , alignItems : "center" , height : "75px" , mt : "5rem" , borderTop : "4px solid #1D226C" }}>
            <Typography variant="h3" sx={{ ml : "auto" , mr : "2rem"}}> Made with <span> ❤️ </span> by Elroi Noronha</Typography> 
            <Box>
                <Link href="https://github.com/elroi99"> 
                    <img style={{ width : "35px" , height : "auto" , marginLeft : "1rem" }} alt="github logo" src={ githubLogo } />  
                </Link>
            </Box>
            <Box>
                <Link href="https://www.linkedin.com/in/elroinoronha/"> 
                    <img style={{ width : "35px" , height : "auto" , marginLeft : "1rem" }} alt="linkedin logo" src={ linkedinLogo } />  
                </Link>
            </Box>
            <Box> 
              <Link href="https://twitter.com/ElroiNoronha"> 
                      <img style={{ width : "35px" , height : "auto" , marginLeft : "1rem" }} alt="twitter logo" src={ twitterLogo } />  
              </Link>
            </Box>
        </Box>

    </Container>
    </>  );
}
 
export default FrontPage;