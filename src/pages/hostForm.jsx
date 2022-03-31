import { useState , useEffect , useContext } from "react";
import { useHistory } from "react-router-dom"
import { v4 as uuidv4 } from "uuid";
import { storage , db } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { doc , setDoc , withConverter , arrayUnion , updateDoc , } from "firebase/firestore"

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
    Backdrop,
    CircularProgress,
} from "@mui/material";
// custom components
import Navbar from "../components/navbar";

// assets
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

// functions 
import { signInWithFirebase } from "../firebase/firebaseAuth";
import { onAuthStateChanged } from "firebase/auth";

import { User , userConverter , Booking , bookingConverter , Property , propertyConverter } from "../firebase/firestore"
import { auth } from "../firebase/firebase"

// contexts
import { authContext } from "../contexts/authContext";

const HostForm = () => {

    let [ formFieldValues , setFormFieldValues ] = useState({ homeType : "villa" , }); 
    let [ errors , setErrors ] = useState( { } );
    let [ spinnerVisibility , setSpinnerVisibility ] = useState(false);
    // getting data from context
    let userData = useContext(authContext);
    let history = useHistory();

    // temporary -- just to see if things are working as they should
    useEffect( () => {        
        console.log(formFieldValues)
    } , [ formFieldValues ])
    // will use later
    useEffect( () => {
        console.log(errors);
    } , [ errors ])
    
    // looking out for a change in auth Status. redirect user to profile once the user has logged in ( user can connect to Stripe there)
    // useEffect( () => {
    //     let unsub = onAuthStateChanged(auth , async(userDetails) => {
    //         // when the user logs in, redirect him to the profile page. he will be able to connect to stripe there
    //         // TODO -- add a second condition " && stripeConnected"
    //         if(userDetails){
    //             history.push("/userProfile")
    //         }
    //     })

    //     return () => {
    //         unsub();
    //     }
    // } , [] )
    
    // the app does not give the use an option to edit a preexisting property listing
    // only a new property listing can be made ie. by pressing the "host" button from the navbar
    // thus there is no need to pull initial values from firebase 

    // by form group, I am referring to an input label + an input
    // each object contins props unique to each field ( different values) 
    let uniqueFormGroupProps = [
        {
            id : 1,
            name: "homeType",
            groupLabel : "Home Type",
            helperText: "select your home type",
            select : true,
            selectOptions : [ "appartment" , "villa" ],

        },
        {
            id : 2,
            name : "maxGuests",
            groupLabel : "Max number of guests",
            // placeholder : "4",
            error : false,
            type : "number",
        },
        {
            id : 3,
            name : "title",
            groupLabel : "Title",
            placeholder : "The iconic and luxurious Bel-Air mansion",
            helperText : "max character count of 45",
            type : "text",
            error : false,
            required : true,
            fullWidth : true,
        },
        {
            id : 4,
            name : "listingDescription",
            groupLabel : "Description of listing",
            placeholder : "Modern, clean and iconic home of the Fresh Prince. Situated in the heart of Bel-Air, Los Angeles",
            helperText : "max character count of 400",
            type : "text",
            error : false,
            multiline  : true,
            fullWidth : true,
            maxWidth : "45ch",

        },
        {
            id : 5,
            name : "address",
            groupLabel : "Address",
            placeholder : "251, North Brisol Avenue",
            type : "text",
            error : false,
            fullWidth : true,

        },
        {
            id : 6,
            name : "city",
            groupLabel : "City/Town",
            placeholder : "Los Angeles",
            type : "text",
            error : false,
            fullWidth : true,

        },
        {
            id : 7,
            name : "state",
            groupLabel : "State/Province",
            placeholder : "Califorina",
            type : "text",
            error : false,
            fullWidth : true,
        },
        {
            id : 8,
            name : "zipCode",
            groupLabel : "Zip/Postal Code",
            placeholder : "Please enter a zip code for your listing",
            type : "number",
            error : false,
        },
        {
            id : 9,
            name : "image",
            groupLabel : "Image",
            helperText : "images have to be under 1MB in size of type JPG or PNG",
            input : "fileUpload",
            error : false,
        },
        {
            id : 10,
            name : "pricePerDay",
            groupLabel : "Price",
            placeholder : "120",
            helperText : "all prices in $USD/day",
            type : "number",
            error : false,
        },

    ] 
    
    // in addition to updating the fields, will run validation on fields that need it ( ones that have the validationRegex key in their prop objects)
    function handleChange(e){
        let fieldName = e.target.name;
        let value = e.target.value;
        // html does not have a concept of data types. everything in html is a string
        // thus, we will have to convert the values of fields that should actually be a number; from string into a number ( using parseInt )
        if(fieldName === "maxGuests" || fieldName === "pricePerDay"){
            value = parseInt(value);
        }

        // enforce the maxLength = 45 condition
        if(fieldName === "title"){
            value = value.slice(0 , 46);
            console.log("enforcing the maxlength");
            console.log(value);
        }
        // enforce the maxLength = 400 condition
        if(fieldName === "description"){
            value = value.slice(0 , 400);
            console.log("enforcing the maxlength");
            console.log(value);
        }
        // enforcing max length
        console.log(`maxlength is ${e.target.maxlength}`)
        console.log(fieldName);
        console.log(value);
        setFormFieldValues({ ...formFieldValues , [fieldName] : value });
    }

    // handling image upload button click only ( not uploading the img, just adding it to state )
    let handleUploadClick = (e) => {
        let file = e.target.files[0];
        setFormFieldValues( { ...formFieldValues , [e.target.name] : file})
}

    // uses fieldName to get the current value from state; gets the validation regex from fieldPropsObject ( from the .map ) , validates the value and sets the error accordingly
    // does not return anything, changes errors state insted 

    async function handleSubmit(e){
        // in this app, the user cannot update ( ie. update ) a listing. Everytime this form is filled and submitted, a new property listing is created !!.

        setSpinnerVisibility(true); // since this is an async task , show user the spinner while the upload is being attempted
        // printing for visibility
        console.log("printing out the values of the form");
        console.log(formFieldValues);
        
        let propertyUid = uuidv4(); // create a uid for this property
        
        (async ( ) => {
            try{
                // add the propertyUid to the "propertiesArr" in the User object
                await updateDoc( doc( db , `users/${userData.userUid}`) , {
                    propertiesArr : arrayUnion(`${propertyUid}`)
                }) 

                // uploading image and getting storage ref
                let fileRef = ref( storage , `${propertyUid}.jpg`);
                let imageStorageRef = (await uploadBytes(fileRef , formFieldValues.image)).ref;
                let imageDownloadURL = await getDownloadURL(imageStorageRef);

                // create a property object to be uploaded
                let subObject = { ...formFieldValues , image : imageDownloadURL};
                let propertyListingObj = new Property( propertyUid , userData.userUid , subObject  );
                console.log(propertyListingObj);
                // set the property into the listings collection
                await setDoc( doc( db , `userGeneratedListings/${propertyUid}`).withConverter(propertyConverter) , propertyListingObj );

                // we are uploading user-generated listings into a dedicated collection called "userGeneratedListings" because we want these listings to be separated from the dummy data listings
                // the reson being that, currently, our listings page code is not set up to differentiate user generated listings from dummy lisintgs ( it is pretty simple actually. just filter out the listings created by the logged in user )
                // we only want dummy listings to be displayed on the listings page
                // and we want the user-generated listings to only be displayed on the userProfile page 

                // if control has reached here, it means that the upload was successful, stop the spinner
                setSpinnerVisibility(false);

                // send user to the userProfile and ask the userProfile to show success snackbar ( the success param tells the userProfile to display success snackbar)
                history.push("/userProfile/success");
                
                // creating object and setting to 
                }
                catch(error){
                    console.log(error.message);
                    if(spinnerVisibility === true){
                        setSpinnerVisibility(false) ; // if an error occurs, control will directly jump from the try block to here ( possibly skipping the line that deactivates the spinner on success, thus we have to make sure that the spinner is deactivated)
                    }

                    // send user to the userProfile and ask the userProfile to show failure snackbar ( failure param does this)
                    history.push("userProfile/failure");
                }
         })();



    }

    return (<>
    <Navbar/> 
    <Container  maxWidth="md" sx={{ mx:"clamp(8px , auto , auto )" }}> 

    {   
        // TODO -- add a condition here -- ie. stripe logged in too
        (userData == null)
        ?
        // when user not signed in or stipe not connected
        // you have to sign in and connect to stripe to host a listing
        <Box sx={{ pt : "40vh" }}> 
            <Typography variant="h3" gutterBottom sx={{ fontWeight : 500 , color : "primary.dark"}} > You'll have to be signed in to host a listing! </Typography>
            <Typography variant="body1" color="grey.dark"> We only allows users who've signed in to our application to host new listings. Sign in to create a new Listing.</Typography>

            <Button variant="contained" onClick={ signInWithFirebase } size="small" sx={{ ml : "auto"  }}> Sign In </Button>
        </Box>
        :

            <Box sx={{  pt : 7  }}>
                
                <Box sx={{ mb : 3}}> 
                    <Typography variant="h2" sx={{ color : "primary.dark" , fontWeight : 500 }} > 
                        Hi !! Lets get started listing your place.
                    </Typography>
                    <Typography variant="body2" sx={{ color : "grey.medium" , mb : 2}}>
                    In this form, we'll collect some basic and additional information about your listing
                    </Typography>
                </Box>

                {
                uniqueFormGroupProps.map((fieldPropsObject) => {
                    let currName = fieldPropsObject.name;
                    return(
                    <Box sx={{ mb : 3}} > 
                        <Typography display="inline" color="red"> * </Typography> 
                        <Typography variant="body1" display="inline"> { fieldPropsObject.groupLabel} </Typography>
                                            
                            { 

                                (fieldPropsObject.input != "fileUpload")
                                && 
                                <TextField 
                                sx= { { display : "block" , mt : 1} } 
                                value= { 
                                    formFieldValues[fieldPropsObject.name] || ""
                                }
                                onChange = { handleChange }
                                size="small"
                                { ...fieldPropsObject }
                                >
                                {/* if the field is a select, render it */}
                                {
                                fieldPropsObject.select && fieldPropsObject.selectOptions.map( (option) => {
                                        return(
                                            <MenuItem key={ option } value={ option }>
                                                {option}
                                            </MenuItem>
                                        )
                                    })
                                }

                                </TextField> 
                            }

                            {
                            fieldPropsObject.input === "fileUpload" 
                            && 
                            <Paper variant="outlined" sx={{ width : "min-content" , p : 3}}> 
                                <input
                                    accept="image/*"
                                    // className={fieldPropsObject.input}
                                    id= {fieldPropsObject.input} 
                                    type="file"
                                    onChange={handleUploadClick}
                                    style = {{display : "none"}}
                                    name = { fieldPropsObject.name }
                                />
                                <label htmlFor={ fieldPropsObject.input} >
                                    <Box component="span" >
                                        <AddOutlinedIcon variant="outlined"/>
                                    </Box>
                                </label>
                            </Paper>
                            }
                        </Box>
                        )

                    })

                    }

                <Button variant="contained" onClick={ handleSubmit } sx={{ mb : 3}}> Submit </Button>  
                <Box>
                    <Typography component="span" variant="body1" color="grey.dark" sx={{ backgroundColor:"#FFE58F" }}> Though you're able to fill this form - upon submission, we autogenerate the creation of a random listing since we don't vet submissions!</Typography>
                </Box>
 

            </Box> 

    }

    {/* Backdrop ( blur page overlay ) + Spinner to indicate that the form data is being uploaded */}
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={ spinnerVisibility }
    >
        <CircularProgress color="inherit" />
    </Backdrop>

    </Container>  
    </>  );
}
 
export default HostForm;



 