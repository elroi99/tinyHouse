import { createTheme } from '@mui/material/styles';

// theme file

const customTheme = createTheme({
        typography : {
            fontSize : 16,
            margin: "3rem 0 1.38rem",
            fontFamily: ['Roboto', "sans-serif" ].join(","),
            fontWeight: 400,
            lineHeight: 1.3,
            h1 : {
                marginTop: "0",
                fontSize: "2.375rem",   // largest title
            },
            h2 : {
                fontSize : "1.875rem"   // smaller title
            },
            h3 : {
                fontSize : "1.25rem"   // smallest title
            },
            button : {      
                fontSize : "1.067rem",   // blue buttons
                textTransform : "capitalize"
            },
            body1:{
                fontSize : "0.938rem"  // body 1 
            },
            body2:{
                fontSize : "0.875rem"   // body 2
            },
            body3 : {
                fontSize : "0.823rem"   // not used anywhere in TinyHouse. .. created if needed arises in the future.
            }
            
    }, 
    breakpoints : {
        values : {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1280,
            xl: 1536,
        }
    },
    palette : {
        primary : {
            main : "#1890FF",
            dark : "#1D226C",
            contrastText : "#fff",
        },
        grey : {
            dark : "#000000A6",
            medium : "#BFBFBF",
            light : "#bfbfbf",
        },
        pink : {
            dark : "#EB2F96",
            light : "#FFF0F6"
        },
        success : {
            main : "#2e7d32",
            ultralight : "#defadf",
        }
    }
})

 
export default customTheme;


// colors pulled out from the tinyHouse app !!
// keep them handy.
// #1D226C     // dark blue (title)
// #1890FF     // light blue (brand)
// #000000A6   // spacious 2 story beach house , 100 Punta Nizuc
// #BFBFBF     // day , 4 guests
// #EB2F96     // pink tag
// #FFF0F6     // pink tag background
// #F5F5F5     // select date 



// ### initial type scale ( kept a copy as a backup)
// h1 : {
//     marginTop: "0",
//     fontSize: "2.323rem",   // largest title
// },
// h2 : {
//     fontSize : "1.913rem"   // smaller title
// },
// h3 : {
//     fontSize : "1.296rem"   // smallest title
// },
// button : {      
//     fontSize : "1.067rem",   // blue buttons
//     textTransform : "capitalize"
// },
// body1:{
//     fontSize : "0.875rem"  // body 1 
// },
// body2:{
//     fontSize : "0.823rem"   // body 2
// },
// body3 : {
//     fontSize : "0.8rem"
// }