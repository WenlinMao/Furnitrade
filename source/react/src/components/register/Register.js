import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {setLocal, getLocal} from '../../utils/util';
import FormHelperText from '@material-ui/core/FormHelperText';
import "./Register.css";
import Tooltip from '@material-ui/core/Tooltip';
import {UploadImg} from '../uploadImg/UploadImg';
import md5 from 'md5';


/* reg epx */
const nameRegex = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%&?@]).{8,20}/;
// const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#\$%&\?@]).{8,20}/;

/* name condition */
const name_length = /.{4,20}/;
const name_no_symbol = /(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
/* password condition */
const password_lower = /(?=.*[a-z])/;
const password_upper = /(?=.*[A-Z])/;
const password_number = /(?=.*\d)/;
const password_symbol = /(?=.*[!#$%&?@])/;
// const password_symbol = /(?=.*[!#\$%&\?])/;
const password_length = /.{8,20}/;

/**
 * TODO:
 * Forget password
 * Remember me
 *
 * DONE:
 * Input syntax validation by regex and red error status
 * Create account button is disabled until syntax validation passed
 * Username rule / password rule by tooltips
 * Error message by helper text
 * Send request, local storage and redirect to homepage (current routing)
 */


  /** Material UI builtin theme used in Tooltip */
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    lightTooltip: {
        background: theme.palette.grey[200],
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
        fontSize: 9,
    },
    arrowPopper: {
        '&[x-placement*="right"] $arrowArrow': {
            left: 0,
            marginLeft: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${theme.palette.grey[200]} transparent transparent`,
            },
        }
    },
    arrowArrow: {
        position: 'absolute',
        fontSize: 7,
        width: '5em',
        height: '5em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    }
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
            errorMsg: '',
            arrowRef: null,
            // individual regex check
            lower: false,
            upper: false,
            number: false,
            symbol: false,
            length: false,
            nameNoSymbol: true,
            nameLength: false,
            validEmail: false,
            hasLogin: false,
            filesToBeSent: [],
        };
        this.child = React.createRef();
    }
    componentWillMount() {
        if(getLocal("username") !== "" ){
            this.setState({hasLogin: true});
             // TODO: GET request
          }
          else {
            this.setState({hasLogin: false});
          }
    }

    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        });
    };

    handleNameInput = name => event => {
        let input = event.target.value;
        this.setState({username: event.target.value});

        if(event.target.value.match(nameRegex)) {
            this.setState({username: event.target.value, nameError: false});
        }
        else {
            this.setState({nameError: true});
        }

        if(input.match(name_length)) {
            this.setState({nameLength: true});
        }
        else {
            this.setState({nameLength: false});
        }

        if(input.match(name_no_symbol)) {
            this.setState({nameNoSymbol: true});
        }
        else {
            this.setState({name_no_symbol: false});
        }
    }

    handleEmailInput = email => event => {
        this.setState({email: event.target.value});
        if(event.target.value.match(emailRegex)) {
            this.setState({email: event.target.value, emailError: false, validEmail: true});
        }
        else {
            this.setState({emailError: true, validEmail: false});
        }
    }

    handlePasswordInput = password => event => {
        this.setState({password: event.target.value, passwordError: false});
        let input = event.target.value;
        if(input.match(passwordRegex)) {
            this.setState({password: input, passwordError: false});
        }
        else {
            this.setState({passwordError: true});
        }

        if(input.match(password_lower)) {
            this.setState({lower: true});
        }
        else {
            this.setState({lower: false});
        }

        if(input.match(password_upper)) {
            this.setState({upper: true});
        }
        else {
            this.setState({upper: false});
        }

        if(input.match(password_number)) {
            this.setState({number: true});
        }
        else {
            this.setState({number: false});
        }

        if(input.match(password_symbol)) {
            this.setState({symbol: true});
        }
        else {
            this.setState({symbol: false});
        }

        if(input.match(password_length)) {
            this.setState({length: true});
        }
        else {
            this.setState({length: false});
        }

        if(event.target.value !== this.state.password){
            // console.log("not same");
            this.setState({confirmPasswordError: true});
        }
        else {
            this.setState({confirmPasswordError: false});
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
        let emptyStatus = this.state.name === "" || this.state.email === "" || this.state.password === "" ||
            this.state.address === "" || this.state.confirmPassword === "";
        let errorStatus = this.state.nameError || this.state.passwordError || this.state.confirmPasswordError || this.state.emailError;

        return emptyStatus || errorStatus;
    }

    // close modal
    handleClose = () => {
        this.setState({
            open: false
        });
    }

    handleBeforeUpload = (files) => {
        this.setState({
            filesToBeSent: files
        });
        console.log(this.state.filesToBeSent)
    }

    // call back handle when uploadImg finished
    handleUploadImg = (img_pathes) => {
        console.log(img_pathes[0])

        // change image pathes in database after uploadImg to s3
        var token = getLocal("usertoken")
        let config = {
            headers: {"Authorization": `Bearer ${token}`},
            params: {
                img_pathes: img_pathes[0]
            },
        }

        axios.get('http://127.0.0.1:5000/user/change_img', config)
        .then((response) => {
            let code = response.data.status;
            if (code === 200) {
                console.log(response);
            } else if (code === 400) {
                localStorage.removeItem('usertoken');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // Post request
    handleSubmit = (e) => {
        e.preventDefault();
        let reqData = {
            'username': this.state.username,
            'email': this.state.email,
            'address': this.state.address,
            'password': md5(this.state.password),
        };
        console.log(reqData);
        const token = localStorage.getItem('usertoken');
        // console.log("token is", token);
        // TODO: check what should happen if token is Null
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
                    "Authorization": `Bearer ${token}`
                }
            })
            // handle success
            .then((response) => {
                console.log(response.data);
                let code = response.data.status;
                if (code === 200) {
                    // successfully register and login
                    // trigger for render user page or non-user page
                    setLocal("username", reqData.username);
                    // set user jwt token for later access
                    setLocal("usertoken", response.data.token);
                    console.log("localStorgae", getLocal("username"));

                    // get token for userid
                    var token = getLocal("usertoken")
                    var jwt_decode = require('jwt-decode');
                    var decoded = jwt_decode(token);
                    console.log(decoded)
                    // start execute upload image process
                    this.child.current.beginUpload(decoded.user_id);
                    // redirect to hompage
                    this.props.history.push("/");
                } else {
                    //    this.setState({errorMsg: response.data.msg, open: true});
                    if (code === 310 || code === 315) {
                        this.setState({
                            nameError: true,
                            emailError: false,
                            errorMsg: response.data.msg
                        });
                    } else if (code === 318) {
                        this.setState({
                            nameError: false,
                            emailError: true,
                            errorMsg: response.data.msg
                        });
                    }
                }
            })
            // handle error
            .catch((error) => {
                console.log("post error: " + error);
            });
    }

    render() {
        const {classes} = this.props;
        const check = "far fa-check-circle";
        const times = "far fa-times-circle";
        let {lower, upper, number, symbol, length, validEmail, nameLength, nameNoSymbol} = this.state;

        return (
            // <div className="register-container">
            <div>
                {/* add NavigationBar to register page */}
                <NavBar hasLogin={this.state.hasLogin} className="nav-bar"/>
                <div className="register">
                    <div className="register-items">
                    <h2>Create Your Furnitrade Account</h2>
                        <form className="register-form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                            <Tooltip
                                title={
                                    <React.Fragment>
                                        4 ~ 20 characters  <i className={nameLength?check:times}></i> <br/>
                                        No special characters <i className={nameNoSymbol?check:times}></i>
                                        <span className={classes.arrowArrow} ref={this.handleArrowRef} />
                                    </React.Fragment>
                                }
                                classes={{ popper: classes.arrowPopper ,tooltip: classes.lightTooltip}}
                                placement="right"
                                PopperProps={{
                                    popperOptions: {
                                    modifiers: {
                                        arrow: {
                                        enabled: Boolean(this.state.arrowRef),
                                        element: this.state.arrowRef,
                                        },
                                    },
                                    },
                                }}
                            >
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
                            </Tooltip>
                            {
                                this.state.nameError && this.state.errorMsg !== ""
                                ?
                                <FormHelperText error={true}>{this.state.errorMsg}</FormHelperText>
                                :
                                <div></div>
                            }
                            <Tooltip
                                title={
                                    <React.Fragment>
                                        Valid email address <i className={validEmail?check:times}></i>
                                        <span className={classes.arrowArrow} ref={this.handleArrowRef} />
                                    </React.Fragment>
                                }
                                classes={{ popper: classes.arrowPopper ,tooltip: classes.lightTooltip}}
                                placement="right"
                                PopperProps={{
                                    popperOptions: {
                                    modifiers: {
                                        arrow: {
                                        enabled: Boolean(this.state.arrowRef),
                                        element: this.state.arrowRef,
                                        },
                                    },
                                    },
                                }}
                            >
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
                            </Tooltip>
                            {
                                this.state.emailError && this.state.errorMsg !== ""
                                ?
                                <FormHelperText error={true}> {this.state.errorMsg} </FormHelperText>
                                :
                                <div></div>
                            }
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
                            <Tooltip
                                title={
                                    <React.Fragment>
                                        8 ~ 20 characters <i className={length?check:times}></i> <br/>
                                        At least 1 uppercase letter <i className={upper?check:times}></i> <br/>
                                        At least 1 lowercase letter <i className={lower?check:times}></i> <br/>
                                        At least 1 number <i className={number?check:times}></i> <br/>
                                        At least 1 special character <i className={symbol?check:times}></i>
                                        <span className={classes.arrowArrow} ref={this.handleArrowRef} />
                                    </React.Fragment>
                                }
                                classes={{ popper: classes.arrowPopper ,tooltip: classes.lightTooltip}}
                                placement="right"
                                PopperProps={{
                                    popperOptions: {
                                    modifiers: {
                                        arrow: {
                                        enabled: Boolean(this.state.arrowRef),
                                        element: this.state.arrowRef,
                                        },
                                    },
                                    },
                                }}
                            >
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
                            </Tooltip>
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

                            <UploadImg
                              inputClass="from-register"
                              resource_type="user"
                              beforeUpload={this.handleBeforeUpload}
                              onUploadImg={this.handleUploadImg}
                              disabled={this.checkButtonStatus()}
                              ref={this.child}
                              hint={"Please Upload a Profile Image ( 1 only )"}
                              />


                            {/* Show different button depending on input validality */}
                            { (this.checkButtonStatus()
                                || (this.state.filesToBeSent
                                    && this.state.filesToBeSent.length <= 0)) ?
                            <Button
                              className = "register-button"
                              disabled={(this.checkButtonStatus()
                                          || (this.state.filesToBeSent
                                            && this.state.filesToBeSent.length <= 0))}
                              variant="contained" >Create Account</Button> :
                            <button
                              disabled={this.checkButtonStatus()}
                              variant="contained"
                              type="submit">CREATE ACCOUNT</button>
                            }
                        </form>
                    </div>
                    <Wave/>
                {/* this is the end of register tag */}
                </div>
            </div>
        );
    }
}
Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
