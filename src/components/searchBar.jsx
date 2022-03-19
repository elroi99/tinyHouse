import { Box , TextField , Button } from "@mui/material";

const Navbar = () => {
    return (
        <> 
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
        </>
      );
}
 
export default Navbar;