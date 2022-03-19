import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from "@mui/lab/DesktopDatePicker"
import MobileDatePicker from "@mui/lab/MobileDatePicker"


const LearningDatePickers = () => {
    const [value, setValue] = React.useState(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Basic example"
            value={value}
            onChange={(newValue) => {
            console.log(newValue);
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      );
}
 
export default LearningDatePickers;