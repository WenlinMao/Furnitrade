import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#\$%&\?]).{8,20}/;

export default class FormDialog extends React.Component {
  state = {
    open: false,
    oldPassword: this.props.password,
    newPassword: '',
    confirmPassword: '',
    oldPasswordError: true, 
    newPasswordError: false,
    confirmPasswordError: false 
  };

  oldPassword = password => event => {
    if(event.target.value !== this.state.oldPassword) {
      this.setState({oldPasswordError: true, });
      console.log("The old password that you entered is not correct.")
    } 
    else {
      this.setState({oldPasswordError: false});
      console.log("The old password that you entered is correct.")
    }
  } 

  newPassword = password => event => {
    this.setState({newPassword: event.target.value, newPasswordError: false});
    if(event.target.value.match(passwordRegex)) {
      this.setState({newPassword: event.target.value, newPasswordError: false});
    }else {
      this.setState({newPasswordError: true});
    }
  }

  confirmPassword = password => event => {
    this.setState({confirmPassword: event.target.value})
    if(event.target.value !== this.state.newPassword){
        this.setState({confirmPasswordError: true});
    }
    else {
        this.setState({confirmPasswordError: false});
        console.log("yeah same passwords!")
    }
  }

  buttonStatus = () => {
    let emptyStatus = this.state.newPassword === "" || this.state.confirmPassword === "";
    let errorStatus = this.state.oldPasswordError || this.state.newPasswordError || this.state.confirmPasswordError;
  
    return emptyStatus || errorStatus;
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = () => {
    this.setState({ open: false });
    this.props.onConfirm(this.state.newPassword);
  };

  handleCancel = () => {
    this.setState({open: false});
  }

  render() {
    console.log(this.state.oldPassword);
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
                onChange={this.oldPassword('password')}
                error={this.state.oldPasswordError}
            />
            <TextField
                id="password-input"
                label="New Password"
                type="password"
                margin="normal"
                variant="outlined"
                required={true}
                onChange={this.newPassword('password')}
                error={this.state.newPasswordError}
            />
            <TextField
                id="password-input"
                label="Confirm New Password"
                type="password"
                margin="normal"
                variant="outlined"
                required={true}
                onChange={this.confirmPassword('password')}
                error={this.state.confirmPasswordError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="secondary">
              Cancel 
            </Button> 
            <Button disabled={this.buttonStatus()} onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
