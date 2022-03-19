import { 
    AppBar , 
    Toolbar , 
    Typography , 
    Box , 
    TextField , 
    Button , 
    Paper , 
    Stack , 
    Avatar, 
    Fade , 
    Link,

} from "@mui/material";
import { useContext , useState , useEffect  } from "react"
import { useHistory } from "react-router-dom"
import { authContext } from "../contexts/authContext";
// Navbar component includes the spacer that will make sure that page content does not slide under the navbar.
// functions 
import { signInWithFirebase , signout } from "../firebase/firebaseAuth";
// assets
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


const Navbar = () => {

    let userData = useContext( authContext );
    console.log(userData);
    let history = useHistory();

    return ( 
        <> 
        <AppBar sx={{ backgroundColor : "white" }} > 
            <Toolbar>

                {/* search bar */}
                <Box display="flex" flexDirectin="row" >
                    <Box sx={{ mt : 1}} >
                        <TextField 
                        variant="outlined" 
                        size="small" 
                        placeholder="Search 'San francisco' " 
                        sx={{ 
                            borderTopRightRaduis : 0,
                            borderBottonRightRadius : 0,
                            borderBottomLeftRadius : 1,
                            borderTopLeftRadius : 1,
                            border : 0,
                        }} 
                        
                        />
                        <Button 
                        size="small" 
                        sx={{ 
                            backgroundColor : "primary.light"  , 
                            height : "100%",
                            borderTopRightRaduis : 1,
                            borderBottonRightRadius : 1,
                            borderBottomLeftRadius : 0,
                            borderTopLeftRadius : 0,
                            "&:hover , &:focus , &:active" : {
                                backgroundColor : "lightgreen",
                            }
                            }} >
                                {/* <SearchOutlinedIcon color="#FFFFFF"/> */}
                        </Button>
                    </Box>

                {/* <Box>

                    <Button 
                    size="small" 
                    sx={{ 
                        backgroundColor : "primary.light"  , 
                        height : "100%",
                        borderTopRightRaduis : 1,
                        borderBottonRightRadius : 1,
                        borderBottomLeftRadius : 0,
                        borderTopLeftRadius : 0,
                        "&:hover , &:focus , &:active" : {
                            backgroundColor : "lightgreen",
                        }
                        }} >
                            
                    </Button>

                </Box> */}
           </Box>

           

            {/* RHS part of the navbar */}
            <Box sx={{ ml : "auto" , }}> 
            
                {/* hostForm icon ( hostForm page) */}
                <Box display="inline-block" sx={{ mr : 2 , width : "auto" , height : "100%"  }} onClick={ () => { history.push("/hostForm") } } >
                        <HomeOutlinedIcon sx={{  fontSize : "1.2rem" , position : "relative" , top : "4px" , fontWeight : 500 , color : "grey.dark"  }} />
                        <Typography variant="button" sx={{ fontSize : "1rem" , color : "grey.dark" , fontWeight : "300" , pl : 0 ,  }}> Host </Typography>                             
                </Box>


                {/* signin or signout at any point of time */}
                {
                    (userData != null) 
                    ?
                        // if user is signed in, show the avatar. It will give the user the profile and Log out options.
                        <LoggedInOptions/>
                        :
                        // if user is signed out
                        <Button variant="outlined" onClick={ signInWithFirebase } > sign in  </Button>
                }
            </Box>

            {/* <LoggedInOptions/> */}

            </Toolbar>
        </AppBar>
        {/* Appbar is just a paper. it does not have a minHeight.... toolbar does ( from theme.mixins.toolbar.minHeight) */}
        <Toolbar/>
        </>
     );
}
 
export default Navbar;



const LoggedInOptions = () => {
    // contexts
    let userData = useContext( authContext );
    let history = useHistory();

    let [ checked , setChecked] = useState(false)
    useEffect( () => {
        console.log(checked);
    } , [ checked])

    return (
        <> 
        <Box 
        sx={{ backgroundColor : "black" , display : "relative"}}>
            
            <Avatar 
                onClick= { () => { setChecked(!checked)}}
                sx={{ backgroundColor : "warning"}}> 
                {/* { userData.displayName.charAt(0).toUpperCase() }  */}
            </Avatar>

            <Fade in={ checked } >
                <Paper sx={{ display : "absolute" , top : "200px"}} > 
                        <Stack sx={{ px : 2 , }}> 
                                <Box onClick={ () => { history.push("/userProfile") } }>
                                    <PersonOutlinedIcon sx={{ fontSize : "body1" , fontSize : "1rem" , position : "relative" , top : "3px" , mr : 1 }} />
                                    <Button variant="button" sx={{ fontSize : "1rem" , color : "grey.medium" }}> Profile </Button>                             
                                </Box>
                                <Box onClick ={ signout }>
                                    <LogoutOutlinedIcon sx={{ fontSize : "body1" , fontSize : "1rem" , position : "relative" , top : "3px" , mr : 1 }} />
                                    <Button variant="text" sx={{ fontSize : "1rem" , color : "grey.medium" }}> Log out </Button>                             
                                </Box>
                        </Stack>
                </Paper>
            </Fade> 

        </Box>







        </>
      );
}
 



