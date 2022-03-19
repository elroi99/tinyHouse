import * as React from 'react';
import { useState } from "react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from "@mui/lab/DesktopDatePicker"
import MobileDatePicker from "@mui/lab/MobileDatePicker"

// imp CONVENTION -- checkoutdate will be considered as part of the stay. ie. guests can stay on the checkout date too.

// this is a controlled component. state has been lifted up. 
const DatePickers = ({ dateState , setDateState , pickerDataType }) => {

    // will handle date validation too before setting the dates in the state.
    const handleChange = (newValue) => {
        // newValue ie. value provided by the picker seems to be of the js Date object.

        if(pickerDataType === "checkin"){
          console.log(`checkin date ${newValue}`) // newValue is of type Date ( vanilla js date)
          // check if checkdate is valid ( checkindate is tomorrow or later) , only then set it to state.
          if( isCheckInDateValid(newValue) ){
            // if valid, set the date to state
            setDateState({ ...dateState , checkInDate : newValue });
          } 
          else{
            // error (tell the user about it)
            console.log("Invalid check in date")
          }
        }
        else if(pickerDataType === "checkout"){
          console.log(`checkin date ${newValue}`)
          // check if the checkoutdate is valid ie. after checkindate , only them set it to state. 
          if( isCheckOutDateValid(dateState.checkInDate , newValue) ){
            setDateState({ ...dateState , checkOutDate : newValue });
          }
          else{
            // error ( tell the user about it) , reset the picked date.
            console.log("Invalid check out date")

          }
        }

      };

      // checks if the date selected by user is in the past ie. you cannot book for a date in the past.
      let isCheckInDateValid = (checkindate) => {
        let todayWithoutTime = new Date().toISOString().split("T")[0];  // this is a string. not a Date object. we have picked up only non time info
        let todayObj = new Date( todayWithoutTime); // this is the date object of today. ( will have T00:00.00.000Z instead of the proper timestamp)
    
        let checkindateWithoutTime = checkindate.toISOString().split("T")[0];  // this is a string. not a Date object. we have picked up only non time info
        let checkindateObj = new Date(checkindateWithoutTime); // date object of the checkInDate. ( will have T00:00.00.000Z instead of the proper timestamp)
    
        // user cannot check in today or in the past
        console.log( `today ${todayObj.toISOString()}` )
        console.log( `check in date ${checkindateObj.toISOString()}` )
        if(checkindateObj > todayObj){
            return true;
        }
        else{
            return false;
        }
    }

      // checks 2 things. 1. checkout date in not in the past , 2. checkout date is after the checkin date ( guest must stay for at least one day)
      let isCheckOutDateValid = (checkindate , checkoutdate) => {
        // our assumption is that the checkindate in the state is valid ( cause it will uploaded only after "isCheckInDateValid" gives it the green flag);
    
        let checkindateWithoutTime = checkindate.toISOString().split("T")[0];  // this is a string. not a Date object. we have picked up only non time info
        let checkindateObj = new Date(checkindateWithoutTime); // date object of the checkInDate. ( will have T00:00.00.000Z instead of the proper timestamp)
    
        let checkoutdateWithoutTime = checkoutdate.toISOString().split("T")[0];  // this is a string. not a Date object. we have picked up only non time info
        let checkoutdateObj = new Date(checkoutdateWithoutTime); // date object of the checkInDate. ( will have T00:00.00.000Z instead of the proper timestamp)
        // now, check if checkoutdate > checkindate ie. guest must stay for at least one day. ie. 14th in , 15th out.
    
        console.log( `check in date ${checkindate.toISOString()}` )
        console.log( `check out date ${checkoutdateObj.toISOString()}` )
        if(checkoutdateObj > checkindateObj){
        return true;
        }else{
        return false;
        }
    }
  
      function isMobileDevice() {
          var check = false;
          (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
          return check;
      };

    return (

        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>

          {/* render mobilePicker if mobile device else desktopPicker if not */}
          {
            isMobileDevice() 
            ?
            (
              <MobileDatePicker
              value={pickerDataType === "checkin" ? dateState.checkInDate : dateState.checkOutDate}
              onChange={ (newValue) => { handleChange(newValue) } } 
              renderInput={(params) => <TextField {...params} />}
              size="small"
              disabled = { ( pickerDataType === "checkout" && dateState.checkInDate === null ) ? true : false }

            />
            )
            :
            (
              <DesktopDatePicker
              value={pickerDataType === "checkin" ? dateState.checkInDate : dateState.checkOutDate}
              onChange={ (newValue) => { handleChange(newValue) } } 
              renderInput={(params) => <TextField {...params} />}
              disabled = { ( pickerDataType === "checkout" && dateState.checkInDate === null ) ? true : false }

            />
            )
          }
        </Stack>
      </LocalizationProvider>


      
      );
}
 
export default DatePickers;






// let today = new Date().toISOString().split("T")[0];    // non time info of today ( not a date obj ) ( ie. T00:00.00.000Z instead of the correct time)
// let newToday = new Date(today);  // creating a date object using the above
// let minBookingDate = new Date(newToday.setDate( newToday.getDate() + 1)).toISOString();

//  let futureDate = new Date(2022 , 03 , 07  , 0 , 0 , 0);

//  let findDaysDifference = ( initialDate , finalDate ) => {
//      let microSecondsDiff = Math.abs( finalDate.getTime() - initialDate.getTime());
//      let diffInDays = Math.round( microSecondsDiff / (1000 * 60 * 60  * 24) );
//      return diffInDays;
//  }

// findDaysDifference()