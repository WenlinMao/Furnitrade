import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import axios from 'axios';
import {setLocal/*, getLocal*/} from '../../../utils/util';
import Wave from '../../common/Wave';
import "./Login.css";
import { Link } from 'react-router-dom';
import logo from '../../../static/images/logo_v1.svg';
// import passwordHash from 'password-hash';
import md5 from 'md5';

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

};

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
        this.setState({username: event.target.value, usernameError: false});
    }

    handlePasswordInput = password => event => {
        this.setState({password: event.target.value, passwordError: false});
    }

    // send post request
    handleSubmit = (e) => {
        e.preventDefault();
        let reqData = {
            'username': this.state.username,
            'password': md5(this.state.password),
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
                    setLocal('username', reqData.username)
                    setLocal('usertoken', response.data.token);
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
        <div>
            <div className="login-page">
            <Link to="/"><embed src={logo} width="270"></embed></Link>
              <div className="login-container">

                    {/* display2 for correct font size */}
                    <h2>Login To Your Furnitrade</h2>

                    <form className="login-form" noValidate autoComplete="on" onSubmit={this.handleSubmit}>
                        <TextField
                            className="textfield"
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
                        <TextField
                            className="textfield"
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
                        <div className="buttons">
                            <Link to="/"><button type="button">Go Back</button></Link>
                            <button id="login-button" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            <Wave/>
            </div>
        </div>
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
