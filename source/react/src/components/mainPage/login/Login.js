import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles, MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
// * import navbar
import NavigationBar from '../../common/NavigationBar';
import axios from 'axios';
import {setLocal, getLocal} from '../../../utils/util';
import "./Login.css";

// TODO: apply CORRECT navibar theme
// TODO: Temporary styles
// TODO: Background re-design

/**
 * DONE:
 * Send request
 * Error message based on response status code by helper text
 * Local storage and redirect to homepage
 */

const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    /*
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    /*
    button: {
        margin: theme.spacing.unit,
      },*/
    // menu: {
    //   width: 200,
    // },
  };

  // apply main theme to login
  const MainTheme = createMuiTheme({
      palette: {
          primary: {
              light: '#42668f',
              main: '#134074',
              dark: '#0d2c51',
          },
          secondary: {
              light: '#61a5c5',
              main: '#3A8FB7',
              dark: '#286480',
          },
          inherit: {
              light: '#f7ca7f',
              main: '#F6BD60',
              dark: '#ac8443',
          },
      },
      typography: {
          fontFamily: '"Righteous", sans-serif',
      },
  });


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMsg: '',
            usernameError: false,
            passwordError: false
        };
    }

    handleNameInput = name => event => {
        this.setState({username: event.target.value});
    }

    handlePasswordInput = password => event => {
        this.setState({password: event.target.value});
    }

    // send post request
    handleSubmit = (e) => {
        e.preventDefault();
        let reqData = {
            'username': this.state.username,
            'password': this.state.password,
        };
        console.log(reqData);
        const token = localStorage.getItem('usertoken');
        // TODO: check what should happen if token is Null
        axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/auth/login',
                // TODO: fix bug when change withCredentials to true
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
                console.log(response);
                console.log(response.data);
                let code = response.data.status;
                if (code === 200) {
                    // successfully login
                    setLocal("username", reqData.username);
                    localStorage.setItem('usertoken', response.data.token);
                    // console.log("localStorage", localStorage.getItem('usertoken'));
                    console.log("response.data.token = ", response.data.token);
                    // redirect to hompage
                    this.props.history.push("/");
                } else {
                    // username error
                    if (code === 310 || code === 312 || code === 315 || code === 318) {
                        console.log("username error");
                        this.setState({
                            usernameError: true,
                            passwordError: false,
                            errorMsg: response.data.msg
                        })
                    }
                    // password error
                    else if (code === 311 || code === 313) {
                        console.log("password error");
                        this.setState({
                            usernameError: false,
                            passwordError: true,
                            errorMsg: response.data.msg
                        });
                    }
                }
            })
            .catch((error) => {
                console.log("post error: " + error);
            });
    }

    render() {
        // might be used in future
        // const {classes} = this.props;

        return (

            <div className="login-page">
            <MuiThemeProvider theme = {MainTheme}>

              <NavigationBar className="nav-bar"/>

              <div className="login-title">

                      {/* display2 for correct font size */}
                      <Typography variant = 'display2' color = 'inherit'>Login </Typography>
                    </div>

                    <form className="login-form" noValidate autoComplete="on" onSubmit={this.handleSubmit}>
                        <TextField
                            id="name-input"
                            label="Username"
                            value={this.state.name}
                            onChange={this.handleNameInput('name')}
                            margin="normal"
                            variant="outlined"
                            error={this.state.usernameError}
                        />
                        {
                            this.state.usernameError
                            ?
                            <FormHelperText error={true}>{this.state.errorMsg}</FormHelperText>
                            :
                            <div></div>
                        }
                        {/* <br/> */}
                        <TextField
                            id="password-input"
                            label="Password"
                            value={this.state.password}
                            onChange={this.handlePasswordInput('password')}
                            type="password"
                            margin="normal"
                            variant="outlined"
                            error={this.state.passwordError}
                        />
                        {
                            this.state.passwordError
                            ?
                            <FormHelperText error={true}>{this.state.errorMsg}</FormHelperText>
                            :
                            <div></div>
                        }
                        <Button className = "login-page-button" type="submit" variant="contained" color="inherit">
                          Login
                        </Button>
                    </form>
            </MuiThemeProvider>
            </div>

        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
