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
import Navbar from "../components/navbar";
import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/card";
import { getDocs , collection , query , where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Listings = () => {
    const [ listingsData , setListingsData ] = useState([])  // initially blank array. will contain all the listings once we pull it from firebase
    // we will only dump data once into this. after that, we will not use it to rerender the component
    // its only purpose it to persist the data between rerenders ( we would not be able to do that with a variable ) 

    const [ sortOrder , setSortOrder ] = useState("ascending");
    const [ currentPaginationPage , setCurrentPaginationPage] = useState(1); // the pagination page number. each page contains 8 cards at max.

    let { cityName } = useParams();

    // get listings data from firebase
    useEffect( async () => {
        let finalQuery;
        if(cityName === "unitedStates"){
            finalQuery = query( collection(db , "listings") , where( `propertyDetails.city` , "in" , [ "losAngeles" , "sanFrancisco" ] ) );
        }else{
            finalQuery = query( collection(db , "listings") , where( `propertyDetails.city` , "==" , cityName ) );
        }
 
        let listingsQueryDocumentSnapshot = (await getDocs( finalQuery )).docs;
        let allListings = listingsQueryDocumentSnapshot.map( (listingDocumentSnapshot) => { 
            return listingDocumentSnapshot.data();
        })
        // allListings -- an array of listings ( Property object )
        console.log("pulled down all listings from firebase.");
        console.log(allListings);
        setListingsData(allListings);   
    } , []);

    // for testing. 
    useEffect( () => {
        console.log(listingsData);
    } , [ listingsData ] )

    function handleSelectChange(e){
        // e.target.value will be either "ascendiing" or "desending"
        console.log(`sort cards in ${e.target.value} order `) 
        setSortOrder(e.target.value)
    }

    function handlePaginationChange(e , value){
        console.log(`changing pagination page to ${value}`)
        setCurrentPaginationPage(value);
    }

    // ascending or descending according to the perDayPrice ( when user clicks on sort from hight to low price or low to high price)
    // no return an array in acending / descending sorted array

    function sortListings(arr , order){
        // order can be "ascending" or "descending"

        // private function ( sorts according to ascending )
        function dumbaFunction(a , b){
            if( parseInt(a.propertyDetails.pricesPerDay) < parseInt(b.propertyDetails.pricesPerDay) ){
                // ascending order // sort a before b
                return -1;
            }
            else{
                // descending order // sort b before a
                return 1;
            }
        }

        let tempArr = []; // an empty arr ( will contain the answer eventually)
        if(order === "ascending"){
            tempArr = arr;  // copy the input arr into tempArr. 
            tempArr.sort(dumbaFunction);  // sort arr in ascending order0[;]
        }else if(order === "descending"){
            arr.sort(dumbaFunction);  // in place sort. arr will now be sorted in ascending order. 
            arr.forEach( (element ,index) => { tempArr[arr.length - index - 1] = element } )    // populating the temp arr. by the end, temp will be the revese of the arr sorted arr it will be descending. 
        }

        console.log("sorted array");
        console.log(tempArr);

        return tempArr;
    }

    // depending upon the pagination page selected, it will tell you which cards to pick to display.
    // the sorted array ( input ) can be sorted in ascending or descending order ( no probs )
    function getDisplayCards(){
        let end = ( currentPaginationPage * 8 ) - 1;
        let start = end - 7;

        let listToDisplay = this.slice(start , end + 1);    // the this is bount at call time. look at the code where it is called ( inside the jsx )
        return listToDisplay;
    }

    return (
    <> 
    <Navbar/> 
    <Container  maxWidth="xl" sx={{ mx:"clamp(8px , auto , auto )" }}> 
        <Box sx={{ mt: 10 }}>
            <Typography variant="h3" color="primary.dark" fontWeight="500" sx={{ mt : 5 , mb : 3}}> Results for "Toronto , Ontario, Canada"</Typography>
            
            {/* filter and pagination components */}
            <Box sx={{ 
                display:"flex" , 
                // flexDirection : { xs : "rowReverse" , md : "column" } ,  
                flexDirection : {  xs : "column"  , sm : "row-reverse"  }  , 
                justifyContent : { xs : "space-between" } , 
                pb : 2,
             }}> 

                <Box>
                    <Pagination 
                    count={ (listingsData.length > 0) ?  Math.ceil( listingsData.length / 8 ) : 0 } 
                    variant="outlined" 
                    shape="rounded" 
                    sx={{ pb : 2 }} 
                    page={ currentPaginationPage }
                    onChange={ handlePaginationChange }
                    />
                </Box>

                <Box sx={{ ml : 1}}>                     
                    <Typography component="span" > Filter by</Typography> 
                    <Box component="span"sx={{ ml : 2}}>
                        <FormControl >
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ sortOrder }
                            label="filterBy"
                            size="small"
                            onChange={ handleSelectChange }
                        >
                            <MenuItem value="ascending">Price : Low to High</MenuItem>
                            <MenuItem value="descending">Price : High to Low </MenuItem>

                        </Select>
                        </FormControl>
                    </Box> 
                </Box>

            </Box> 

            {/* Listings */}
            <Box sx={{ display : "grid" , gridTemplateColumns : { xs : "1fr" , sm : "1fr 1fr" , md : "1fr 1fr 1fr 1fr" , } , gridRowGap : 13 , gridColumnGap : 10, mb : 10 }} > 
                {
                    // we will render the cards if listingsData is not empty
                    ( listingsData.length > 1 )  
                    &&
                    // getDisplayCards will be called on the return value of sortListings function ie. on the sorted array.
                    getDisplayCards.call( sortListings(listingsData , sortOrder) )  // will contain all the cards that are to be displayed. ( in this particluar pagination page ! )
                    .map( (cardDetails) => {
                        // console.log(cardDetails.propertyDetails.preDayPrice)    //for testing only
                        return <Card cardDetails = { cardDetails } />
                    })  
                }
            </Box>
            
        
        </Box>
    </Container>
    </>);
}
 
export default Listings;