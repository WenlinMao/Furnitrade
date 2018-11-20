import React, { Component } from 'react';
import NavigationBar from '../common/NavigationBar';
import { Button, TextField } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import "./ProfilePage.css";
import Dialog from '../common/Dialog';

import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {getLocal} from '../../utils/util';
import {UploadImg} from '../../UploadImg.js';

// This is profile page - used to update and modify user info
// Goal & Requirements:
//      - Use container structure to divide page into a few parts
//      - Display should be "column"
//      - In each row, there could possibly be a new container, display can be
//        either "row" or "column"
//      - Use the theme colors provided in MainPage.js

// 2 major parts
//     - Part One: nav bar
//         - Nav bar should be the same
//         - title "furnitrade" and logo should redirect the user to MainPage
//         - drawer stays the same --(temporary) --(if you think you can update it, free
//           free to do so)

//     - Part Two: user info
//         - Sub-part One - Left-hand-side
//             - User Photo - include a Button for uploading new photo if user
//                 has no profile photo. Otherwise, the button is for changing
//                 profile photo
//             - User First and Last Name - Under the photo, include a "save" or
//                 "update" button
//             - (Optional) brief introduction - brief introduction of user filled by user
//                 himself or herself
//         - Sub-part Two - Right-hand-side
//             - Address information
//             - email information
//             - university information - should be a drop down menu which offers university List

// Note:
//     - feel free to redesign the layout. Keep dis shit good looking tho.
//     - feel free to use a new theme. Just make sure the color stays the same
const nameRegex = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

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

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: 'test-propic.jpg',
      username: 'Jack Ma',
      email: 'jackma@alibaba.com',
      city:'San Diego',
      zipcode:'92122',
      state: 'California',
      university: 'University of California, San Diego',
      password: '1234',
      readOnly: true,
      emailError: false,
      nameError: false
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // this.onDrop = this.onDrop.bind(this);
    // this.handleEmailInput=this.handleEmailInput.bind(this);
    // this.handleNameInput=this.handleNameInput.bind(this);
  }

  // send get request, get the user profile
  componentDidMount() {
    let username = getLocal("username");
    const token = localStorage.getItem('usertoken');
    // const decoded = jwt_decode(token);
    // change the logic later
    let reqData = {
      'username': username
    };
    if (token){
      axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/user/profile',
        withCredentials: false,
        crossdomain: true,
        data: reqData,
        responseType: 'json',
        headers: {
            "Authorization": `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response.data);
        let code = response.data.status;
        if (code === 200) {
          this.setState({
            username: response.data.username,
            email: response.data.email,
            address: response.data.address,
            // university: response.data.univeristy,
            password: response.data.password
          });
        } else if (code === 316) {
          console.log("user not logged in");
        }
      }).catch((error) => {
        console.log("get profile: " + error);
      });
    }
  }

  // need to change
  handleChange = event => {
    this.handleEmailInput();
    this.handleNameInput();
    this.setState({
      address: event.target.address,
      univeristy: event.target.univeristy
    });
  }

  handleNameInput = name => event => {

    if (event.target.value.match(nameRegex)) {
      this.setState({
        username: event.target.value,
        nameRegex
      });
    } else {
      this.setState({
        nameError: true
      });
    }
  }

  handleEmailInput = email => event => {
    if (event.target.value.match(emailRegex)) {
      this.setState({
        email: event.target.value,
        emailRegex
      });
    } else {
      this.setState({
        emailError: true
      });
    }
  }

  handleEdit = () => {
    this.setState({
      readOnly: false
    });
  }

  handleSave = () => {
    this.setState({
      readOnly: true
    });
    let reqData = {
      'username': this.state.username,
      'email': this.state.email,
      'address': this.state.address,
      'password': this.state.password,
    };
    const token = localStorage.getItem('usertoken');
    console.log("Saving profile data,", reqData);
    if (token){
        axios({
          method: 'post',
          url: 'http://127.0.0.1:5000/user/edit',
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
  }

  changePassword = (newPassword) => {
    this.setState({password: newPassword});
  }

  onDrop = event => {
    this.setState({
      picture: event.target.picture
    });
  }


  render() {
    /* the save/edit button */
    let button;
    if (this.state.readOnly) {
        button = <Button type="submit" variant="contained" color="primary" onClick={this.handleEdit}>
              Edit
        </Button>
    } else {
        button = <Button type="submit" variant="contained" color="primary" onClick={this.handleSave}>
              Save
        </Button>
    }

    return (

      <MuiThemeProvider theme = {MainTheme}>
      <div className="profile-page-container">
          {/* Major part one - nav bar */}
          <NavigationBar className="nav-bar"/>

          {/* Major part two - user info */}
          <div className="user-info-container">


            {/* left hand side of user info - photo & names */}
            <div className="info-lhs">
            <div className="pro-image">
            <img className="user-photo" title="user-photo"
            src={require("../../static/images/"+this.state.picture)} className="user-photo"
            alt = "used to store user info"
            // todo
            width="100" height="100"
            />
            <Button onClick={this.onDrop}>Update picture</Button>
              </div>
              <TextField

                label="Username"
                defaultValue={this.state.username}
                className="standard-read-only-input"
                margin="normal"
                InputProps={{
                    readOnly: this.state.readOnly,
                }}
                error={this.state.nameError}
                variant="filled"/>
              <TextField

                  label="E-mail"
                  defaultValue={this.state.email}
                  className="standard-read-only-input"
                  margin="normal"
                  InputProps={{readOnly: this.state.readOnly,}}
                  error={this.state.emailError}
                  variant="filled"/>



            </div>

            {/* right hand side of user info - address */}
            <div className="info-rhs">
            <TextField

                label="State"
                defaultValue={this.state.state}
                className="standard-read-only-input"
                margin="normal"
                InputProps={{readOnly: this.state.readOnly,}}
                variant="filled"/>

                <TextField

                    label="City"
                    defaultValue={this.state.city}
                    className="standard-read-only-input"
                    margin="normal"
                    InputProps={{readOnly: this.state.readOnly,}}
                    variant="filled"/>
            <TextField

                label="University"
                defaultValue={this.state.university}
                className="standard-read-only-input"
                margin="normal"
                InputProps={{readOnly: this.state.readOnly,}}
                variant="filled"/>
            {/* Save/ Edit button */}
              {button}
              <UploadImg />
              <Dialog password={this.state.password} onConfirm={this.changePassword} />
            </div>

          </div>

      </div>
      </MuiThemeProvider >
    );
  }
}

  export default ProfilePage;
