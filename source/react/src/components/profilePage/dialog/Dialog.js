import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import "./Dialog.css";
import md5 from 'md5';
import axios from 'axios';

const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%&?@]).{8,20}/;

export default class FormDialog extends React.Component {
  state = {
    open: false,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    oldPasswordError: false,
    newPasswordError: false,
    confirmPasswordError: false,
    success: false
  };

  componentWillMount() {

  }

  oldPassword = password => event => {
    this.setState({oldPassword: event.target.value, oldPasswordError: false, success: false});
  }

  newPassword = password => event => {
    this.setState({newPassword: event.target.value, newPasswordError: false, success: false});
    if(event.target.value.match(passwordRegex)) {
      this.setState({newPassword: event.target.value, newPasswordError: false});
    } else {
      this.setState({newPasswordError: true});
    }

    if(event.target.value !== this.state.newPassword){
        this.setState({confirmPasswordError: true});
    }
    else {
        this.setState({confirmPasswordError: false});
    }
  }

  confirmPassword = password => event => {
    this.setState({confirmPassword: event.target.value, success:false})
    if(event.target.value !== this.state.newPassword){
        this.setState({confirmPasswordError: true});
    }
    else {
        this.setState({confirmPasswordError: false});
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

  handleSubmit = (e) => {
    this.setState({success: false});
    e.preventDefault();
    console.log(this.state.oldPassword)
    let reqData = {
        'old_password': md5(this.state.oldPassword),
        'new_password': md5(this.state.newPassword),
    };
    console.log(reqData);
    const token = localStorage.getItem('usertoken');
    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/user/change_password',
      withCredentials: false,
      crossdomain: true,
      data: reqData,
      responseType: 'json',
      headers: {
          //"Content-Type": "application/x-www-form-urlencoded",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Authorization": `Bearer ${token}`
      }
    })
    .then((response) => {
        let code = response.data.status;
        if (code === 200) {
          this.setState({success: true});
        } else if (code === 313){
          this.setState({oldPasswordError: true});
        }
    })
    .catch((error) => {
        console.log("post error: " + error);
    });
  };

  handleCancel = () => {
    this.setState({open: false});
  }

  render() {
    const check = "far fa-check-circle";
    const times = "far fa-times-circle";
    return (
      <div>
        <div className="dialog">
          <a onClick={this.handleClickOpen}>Reset Password</a>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth="true"
            maxWidth='xs'
          >
            <DialogTitle id="form-dialog-title">Reset your password</DialogTitle>
            <DialogContent>

              <div className = "passwordInputField">
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
                {
                    this.state.oldPasswordError
                    ?
                    <FormHelperText error={true}>Old password is incorrect. Try again. <i className={times}></i></FormHelperText>
                    :
                    <div></div>
                }
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
                {
                    this.state.success
                    ?
                    <FormHelperText error={false}>New password is already saved! <i className={check}></i></FormHelperText>
                    :
                    <div></div>
                }
            </div>
            </DialogContent>
            <DialogActions>
              <div className="buttons">
                <button onClick={this.handleCancel}>Back</button>
                { this.buttonStatus() ?
                  <Button disabled={true} onClick={this.handleSubmit} color="primary">Save</Button> :
                  <button onClick={this.handleSubmit} >Save</button>
                }
              </div>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}
