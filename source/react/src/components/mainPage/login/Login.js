import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles, MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// * import navbar
import NavigationBar from '../../common/NavigationBar';
import axios from 'axios';


// TODO: apply CORRECT navibar theme
// TODO: Temporary styles
// TODO: Background re-design
// TODO: helper error text when login fail

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
    },*/
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
            password: ''
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
            }
      })
      .then((response) => {
          console.log(response.data);
      })
      .catch((error) => {
          console.log("post error: " + error);
      });
    }

    render() {
        // might be used in future
        const {classes} = this.props;

        return (

            <div className="login-page">
            <MuiThemeProvider theme = {MainTheme}>

              <NavigationBar className="nav-bar"/>

              <div className="login-title">
                      <Typography variant = 'display4' color = 'inherit'>Login </Typography>
                    </div>

                    <form className="login-form" noValidate autoComplete="on" onSubmit={this.handleSubmit}>
                        <TextField
                            id="name-input"
                            label="Username"
                            value={this.state.name}
                            onChange={this.handleNameInput('name')}
                            margin="normal"
                            variant="outlined"
                        />
                        <br/>
                        <TextField
                            id="password-input"
                            label="Password"
                            value={this.state.password}
                            onChange={this.handlePasswordInput('password')}
                            type="password"
                            margin="normal"
                            variant="outlined"
                        />
                        {/* TODO: button color adjustment*/ }
                        <div className="login-button">
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                        </div>
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
