import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import $ from 'jquery';

const nameRegex = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#\$%&\?]).{8,20}/;

/**
 * TODO:
 * Hash
 * Helper text and error helper text
 * Validation happens onBlur
 * Forget passowrd
 * Remember me
 */

// const errorText = {
//     invalidName: 'The Username format is invalid.',
//     invalidEmail: 'The Email Address format is invalid.',
//     invalidPassword: 'The Password format is invalid',
//     inconsistentPassords: 'The passwords you entered are not consistent'
// }

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    button: {
        margin: theme.spacing.unit,
      },
    // menu: {
    //   width: 200,
    // },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
      },
  });

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
            address: '',
            open: false, 
            errorMsg: ''
        };
    }

    handleNameInput = name => event => {
        this.setState({username: event.target.value});
        if(event.target.value.match(nameRegex)) {
            this.setState({username: event.target.value, nameError: false});
        }
        else {
            this.setState({nameError: true});
        }
    }

    handleEmailInput = email => event => {
        this.setState({email: event.target.value});
        if(event.target.value.match(emailRegex)) {
            this.setState({email: event.target.value, emailError: false});
        }
        else {
            this.setState({emailError: true});
        }
    }

    handlePasswordInput = password => event => {
        this.setState({password: event.target.value, passwordError: false});
        if(event.target.value.match(passwordRegex)) {
            console.log('here');
            this.setState({password: event.target.value, passwordError: false});
        }
        else {
            this.setState({passwordError: true});
        }
    }

    handlePasswordConfirm = confirmPassword => event => {
        this.setState({confirmPassword: event.target.value})
        if(event.target.value !== this.state.password){
            // console.log("not same");
            this.setState({confirmPasswordError: true});
        }
        else {
            this.setState({confirmPasswordError: false});
        }
    }

    handleAddressInput = address => event => {
        this.setState({address: event.target.value})
    }

    // returm true if any of inputs are invalid
    checkButtonStatus = () => {
        let status = this.state.nameError || this.state.passwordError || this.state.confirmPasswordError || this.state.emailError;
        console.log("status ", status)
        return status;
    }
     
    // close modal 
    handleClose = () => {
        this.setState({open: false});
    }

    // Post request
    handleSubmit = (e) => {
        e.preventDefault();
        let reqData = {
            'username': this.state.username,
            'email': this.state.email,
            'address': this.state.address,
            'password': this.state.password,
        };
        console.log(reqData);
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/auth/register',
            // TODO: fix bug when change withCredentials to true
            withCredentials: false,
            crossdomain: true,
            data: reqData,
            responseType: 'json',
            headers: {
                //"Content-Type": "application/x-www-form-urlencoded",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            }
        })
        // handle success 
        .then((response)=>{
            console.log(response.data);
            let status = response.data.status;
            if(status === 200) {
                // successfully register and login 
                // TODO: redirect 
                
            }
            else{
               this.setState({errorMsg: response.data.msg, open: true});
            }
        })
        // handle error 
        .catch((error)=>{
           console.log("post error: " + error);
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <div className="register-container">
                <div className="register-title">Create Your Furnitrade Account</div>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField
                        id="name-input"
                        label="Username"
                        className={classes.textField}
                        value={this.state.username}
                        onChange={this.handleNameInput('username')}
                        margin="normal"
                        variant="outlined"
                        required={true}
                        error={this.state.nameError}
                    />
                    <TextField
                        id="email-input"
                        label="Email Address"
                        className={classes.textField}
                        type="email"
                        name="email"
                        // autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        required={true}
                        value={this.state.email}
                        onChange={this.handleEmailInput('email')}
                        error={this.state.emailError}
                    />
                    <TextField
                        id="address-input"
                        label="Address"
                        className={classes.textField}
                        value={this.state.address}
                        onChange={this.handleAddressInput('address')}
                        margin="normal"
                        variant="outlined"
                        required={true}
                        error={this.state.addressError}
                    />
                    <TextField
                        id="password-input"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="outlined"
                        required={true}
                        value={this.state.password}
                        onChange={this.handlePasswordInput('password')}
                        error={this.state.passwordError}
                    />
                     <TextField
                        id="confirm-password-input"
                        label="Confirm Password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="outlined"
                        required={true}
                        value={this.state.confirmPassword}
                        onChange={this.handlePasswordConfirm('confirmPassword')}
                        error={this.state.confirmPasswordError}
                    />
                    <Button disabled={this.checkButtonStatus()} type="submit" variant="contained" color="primary" className={classes.button}>
                        Create Account
                    </Button>
                </form> 
                <Modal open={this.state.open} onClose={this.handleClose}>
                    <div style={getModalStyle()} className={classes.paper}>{this.state.errorMsg}</div>
                </Modal>
            </div>
        );
    }
}
Register.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Register);
