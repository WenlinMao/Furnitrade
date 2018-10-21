import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import $ from 'jquery';


const nameRegex = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#\$%&\?]).{8,20}/;

/**TODO:
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
  });

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false
        };
    }

    handleNameInput = name => event => {
        this.setState({name: event.target.value});
        if(event.target.value.match(nameRegex)) {
            this.setState({name: event.target.value, nameError: false});
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
            console.log("not same");
            this.setState({confirmPasswordError: true});
        }
        else {
            this.setState({confirmPasswordError: false});
        }
    }

    // Post request 
    handleSubmit = (e) => {
        e.preventDefault();
        let reqData = {
            "username": this.state.name,
            "email": this.state.email,
            "password": this.state.password,
        };
        
        axios({
            method: 'post',
            url: '/auth/register/',
            withCredentials: true,
            crossdomain: true,
            data: $.param(reqData),    
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control": "no-cache", 
            }
        }).then(function(response){
            console.log("header with authentication :" + response)
        })
        .catch(function(error){
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
                        value={this.state.name}
                        onChange={this.handleNameInput('name')}
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
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Create Account
                    </Button>
                </form>
            </div>

        );
    }
}
Register.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Register);



