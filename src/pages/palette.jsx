import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const Palette = () => {
    console.log("yomama so fat !!")
    return (
    <> 
        <Typography variant="h1"> A visual type scale h1 </Typography> 
        <Typography variant="h2"> A visual type scale h2 </Typography> 
        <Typography variant="h3"> A visual type scale h3 </Typography> 
        <Typography variant="body1"> A visual type scale body1 </Typography> 
        <Typography variant="body2"> A visual type scale body2 </Typography> 
        <Typography variant="button"> A visual type scale button </Typography> 

        <Box  border="1px solid black" >
            <Box backgroundColor="#1D226C " sx={{  height : "40px"}}> #1D226C Dark blue </Box>
            <Box backgroundColor="#1890FF"  sx={{  height : "40px"}}>#1890FF Brand</Box>
            <Box backgroundColor="#000000A6"  sx={{  height : "40px"}}>  #000000A6 spacious 2 story beach house , 100 Punta Nizuc </Box>
            <Box backgroundColor="#BFBFBF " sx={{  height : "40px"}}> #BFBFBF day , 4 guests </Box>
            <Box backgroundColor="#F5F5F5" sx={{  height : "40px"}}> #F5F5F5 select date trigger backround </Box>
            <Box backgroundColor="#EB2F96" sx={{  height : "40px"}}> #EB2F96 pink tag outline </Box>
            <Box backgroundColor="#FFF0F6" sx={{  height : "40px"}}> #FFF0F6 pink tag background </Box>
        </Box>

        <Typography variant="h1" gutterBottom sx={{ color : "primary.dark" , fontWeight : "500" }}> Find a place you'll love to stay at  </Typography>
        <Typography variant="h2" color="primary.dark" fontWeight="500"> Your guide to all things rental  </Typography> 
        <Typography variant="h3" color="grey.medium"> Premium Listings  </Typography> 

        <Typography variant="body1" sx={{ color : "#1D226C" }}> $128<Typography component={"span"} display="inline" sx={{ color : "#D1D1D1"}}>/day</Typography> </Typography>
        

    </>  );
}
 
export default Palette;

// only use the typography variants that we defined in the Theme.js file
// the others are the default typography



// colors pulled out from the tinyHouse app !!
// keep them handy.
// #1D226C     // dark blue (title)
// #1890FF     // light blue (brand)
// #000000A6   // spacious 2 story beach house , 100 Punta Nizuc
// #BFBFBF     // day , 4 guests
// #EB2F96     // pink tag
// #FFF0F6     // pink tag background
// #F5F5F5     // select date 

