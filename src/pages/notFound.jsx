import {
Container,
Typography,
Button,
Box
} from "@mui/material"
import { useHistory } from "react-router-dom";

import  Navbar  from "../components/navbar"

const NotFound = () => {

    let history = useHistory();
    
    return (<> 
            {/* <Navbar/>  */}
            <Container  maxWidth="xl" sx={{ mx:"clamp(8px , auto , auto )" , height : "100vh" ,  display : "flex" , justifyContent : "center" , alignItems : "center"   }}>
                <Box sx={{ p : 3 , borderColor : "primary.main" , borderWidth : "1px" , borderStyle : "solid" , borderRadius : "5px" }}>
                    <Typography variant="h1" color="primary.main" sx={{ mb : 3 , fontWeight:"700"}}> 
                        Page does not exist
                    </Typography>
                    <Button 
                    variant="outlined"  
                    sx={{ ml : "auto" , mr : "auto" }}
                    onClick={ () => { history.push("/")}}> 
                        Back to Home
                    </Button> 
                </Box> 
            </Container> 
    </>  );
}
 
export default NotFound;