import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/material"

// this seems to create problems ( crash the app ) once the snackbar autoHides or is closed by user. 
// Couldnt debug it. hence didnt use it. 
export default function SimpleSnackbar({  snackbarStatus , setSnackbarStatus }) {

  let { open  , color , message } = snackbarStatus; // destructuring 

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarStatus({ open : false, color : null , message : "" });
  };

  const action = (
    <React.Fragment >
        <IconButton
          size="small"
          aria-label="close"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        action={action}
        message={message}
      />
    </div>
  );
}
