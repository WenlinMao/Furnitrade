import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Reset Password</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Reset your password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You probably cannot reset your password from this page since I DONT WRITE DAT SHIT
            </DialogContentText>

            {// TODO: 1: Need logic behind: check password state, change password state, error notification,
             //       tooltips, etc.
             //       2: style needed to add
            }
            <TextField
                id="password-input"
                label="Old Password"
                type="password"
                margin="normal"
                variant="outlined"
                required={true}
            />
            <TextField
                id="password-input"
                label="New Password"
                type="password"
                margin="normal"
                variant="outlined"
                required={true}
            />
            <TextField
                id="password-input"
                label="Confirm New Password"
                type="password"
                margin="normal"
                variant="outlined"
                required={true}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
