import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import { Button}  from "@material-ui/core";
import "./ProfilePage.css";
import Dialog from '../common/dialog/Dialog';
import TextField from '@material-ui/core/TextField';
//import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {getLocal} from '../../utils/util';

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

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: 'test-propic.jpg',
      username: '',
      email: '',
      city:'San Diego',
      zipcode:'92122',
      address: '',
      university: 'University of California, San Diego',
      password: '1234',
      readOnly: true,
      emailError: false,
      nameError: false,
      hasLogin: false
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // this.onDrop = this.onDrop.bind(this);
    // this.handleEmailInput=this.handleEmailInput.bind(this);
    // this.handleNameInput=this.handleNameInput.bind(this);
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

  // send get request, get the user profile
  componentDidMount() {
    let username = getLocal("username");
    const token = localStorage.getItem('usertoken');
    // const decoded = jwt_decode(token);
    // change the logic later
    let reqData = {
      'username': username
    };
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
        }  else if (code === 400) {
            localStorage.removeItem('usertoken');
            this.props.history.push("/Login");
        }
    }).catch((error) => {
        console.log("get profile: " + error);
    });

  }

  // need to change
  // handleChange = event => {
  //   this.handleEmailInput();
  //   this.handleNameInput();
  //   this.setState({
  //     address: event.target.address,
  //     univeristy: event.target.univeristy
  //   });
  // }

  handleNameInput = name => event => {
    this.setState({username: event.target.value});
    if (event.target.value.match(nameRegex)) {
      this.setState({
        username: event.target.value,
      });
    } else {
      this.setState({
        nameError: true
      });
    }
  }

  handleEmailInput = email => event => {
    this.setState({email: event.target.email});
    if (event.target.value.match(emailRegex)) {
      this.setState({
        email: event.target.value,
      });
    } else {
      this.setState({
        emailError: true
      });
    }
  }

  handleAddressInput = address => event =>{
    this.setState({address: event.target.value});
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
    console.log(reqData);
    const token = localStorage.getItem('usertoken');
    console.log("Saving profile data,", reqData);
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
            } else if (code === 400) {
                localStorage.removeItem('usertoken');
                this.props.history.push("/Login");
            }
        }
    })
    // handle error
    .catch((error) => {
        console.log("post error: " + error);
    });

  }

  // Move this logic to Dialog
  // changePassword = (newPassword) => {
  //   this.setState({password: newPassword});
  // }

  onDrop = event => {
    this.setState({
      picture: event.target.picture
    });
  }


  render() {
    /* the save/edit button */
    let button;
    if (this.state.readOnly) {
        button = <Button type="submit" variant="contained" onClick={this.handleEdit}>
              Edit
        </Button>
    } else {
        button = <Button type="submit" variant="contained" onClick={this.handleSave}>
              Save
        </Button>
    }

    return (
      <div>
        {/* Major part one - nav bar */}
        <NavBar hasLogin={this.state.hasLogin} className="nav-bar"/>
        {/* Major part two - user info */}
        <div className="profilepage">
            <div className="info-container">


              {/* left hand side of user info - photo & names */}
              <div className="info-lhs">

                <div className="pic">
                  <img src={require("../../static/images/"+this.state.picture)} alt="user info pic" onClick={this.onDrop}/>
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
                    variant="filled"
                    value={this.state.username}
                    onChange={this.handleNameInput('name')}
                />
                <TextField

                      label="E-mail"
                      defaultValue={this.state.email}
                      className="standard-read-only-input"
                      margin="normal"
                      InputProps={{readOnly: this.state.readOnly,}}
                      error={this.state.emailError}
                      variant="filled"
                      value={this.state.email}
                      onChange={this.handleEmailInput('email')}
                />
              </div>

              {/* right hand side of user info - address */}
              <div className="info-rhs">
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
                <TextField
                  label="Address"
                  floatingLabelFixed={true}
                  defaultValue={this.state.address}
                  className="standard-read-only-input"
                  margin="normal"
                  InputProps={{readOnly: this.state.readOnly,}}
                  variant="filled"
                  value={this.state.address}
                  onChange={this.handleAddressInput('address')}/>

              {/* Save/ Edit button */}
                {button}
    <Dialog password={this.state.password} onConfirm={this.changePassword} />
              </div>

            </div>
            <Wave/>
        </div>
      {/* the very last div tag */}
      </div>
    );
  }
}

  export default ProfilePage;
