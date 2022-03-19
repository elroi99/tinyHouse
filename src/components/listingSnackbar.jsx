import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/material"

// simple snackbar to be used the listing page. ie. success or failure of a booking attempt. 
export default function ListingSnackbar({  snackbarContent , triggerSnackbar }) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    triggerSnackbar({ displayMessage  : null , severity : null });
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
        open={ (snackbarContent.severity === null) ? false : true }
        autoHideDuration={2000}
        onClose={handleClose}
        action={action}
        message={ snackbarContent.displayMessage }
      />
    </div>
  );
}