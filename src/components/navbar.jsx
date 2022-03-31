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
    Popover,

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
// images ( from assets )
import tinyHouseLogo from "../assets/images/tinyHouseLogo.png"


const Navbar = () => {

    let userData = useContext( authContext );
    console.log(userData);
    let history = useHistory();

    // --- for the popover
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    // --- for the popover

    return ( 
        <> 
        <AppBar sx={{ backgroundColor : "white" }} > 
            <Toolbar>

            {/* LHS part ( the tinyhouse logo) */}
            <Link 
                    href= { `/` } 
                    sx={{ textDecoration : "none" , color : "initial" }}
                    onClick={ (e) => { 
                        // we only have to handle the left click ( cause we dont want LHS click to )
                        e.preventDefault(); // stop the clicks default behavior
                        history.push(`/`)
                        }}
                    > 

                    <Box sx={{ marginTop : "auto" , marginBottom : "auto" , position : "relative" , top : "5px"}}>
                        <img style={{ width : "35px" , height : "auto" ,  }} alt="tiny house logo" src={ tinyHouseLogo } />                
                    </Box>

            </Link>

            {/* RHS part of the navbar */}
            <Box sx={{ ml : "auto" , display : "flex" , flexDirection : "row" }}> 
            
                {/* hostForm icon ( hostForm page) */}
                <Box component="span" sx={{ display : "inline" , mr : 2 , width : "auto" , height : "100%" ,  my : "auto"  }} onClick={ () => { history.push("/hostForm") } } >
                        <HomeOutlinedIcon sx={{  fontSize : "1.2rem" , position : "relative" , top : "4px" , fontWeight : 500 , color : "grey.dark"  }} />
                        <Typography variant="button" sx={{ fontSize : "1rem" , color : "grey.dark" , fontWeight : "300" , pl : 0 ,  }}> Host </Typography>                             
                </Box>
                
                {
                    (userData != null) 
                    ?
                    // if user is signed in, show the avatar. It will give the user the profile and Log out options.
                    <Box sx={{ display : "relative"}}>
                        <Avatar 
                            onClick={ handleClick }
                            aria-describedby={id}
                            sx={{ backgroundColor:"#FF5722" }} 
                            > 
                            
                            { userData.displayName.charAt(0).toUpperCase() } 
                            
                        </Avatar>

                        <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        >
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
                        </Popover>


                    </Box>

                    :
                    // if user is signed out
                    <Button variant="outlined" onClick={ signInWithFirebase } > sign in  </Button>

                }


            </Box>

            </Toolbar>
        </AppBar>
        {/* Appbar is just a paper. it does not have a minHeight.... toolbar does ( from theme.mixins.toolbar.minHeight) */}
        </>
     );
}
 
export default Navbar;

 



