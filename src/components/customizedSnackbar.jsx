import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Notice how our Alert is actually a custom component. we have renamed the MUI provided Alert component to MuiAlert and then used it.
// The custom Alert component we created uses an MuiAlert inside itself
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbar({ snackbarContent , triggerSnackbar}) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    triggerSnackbar({displayMessage : null , severity : null});
  };

  return (
      <Snackbar open={ (snackbarContent.severity === null) ? false : true } autoHideDuration={2000}  onClose={handleClose}>
        <Alert onClose={handleClose} severity={ snackbarContent.severity }  sx={{ width: '100%' }}>
          { snackbarContent.displayMessage }
        </Alert>
      </Snackbar>
  );
}
