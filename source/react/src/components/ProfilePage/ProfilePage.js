import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import { Button}  from "@material-ui/core";
import "./ProfilePage.css";
import Dialog from '../profilePage/dialog/Dialog';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {getLocal} from '../../utils/util';
import {UploadImg} from '../uploadImg/UploadImg'
import FormHelperText from '@material-ui/core/FormHelperText';
const nameRegex = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;


class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img_pathes:[],
      picture: "",
      username: '',
      email: '',
      city:'San Diego',
      zipcode:'92122',
      address: '',
      university: 'University of California, San Diego',
      readOnly: true,
      emailError: false,
      nameError: false,
      hasLogin: false
    };
    this.child = React.createRef();

  }
  componentWillMount() {
    if(getLocal("username") !== "" ){
        this.setState({hasLogin: true});
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
            user_id: response.data.user_id,
            picture: "https://s3.amazonaws.com/furnitrade-dev-attachments/"
                      + response.data.profile,
            // university: response.data.univeristy,
            // password: response.data.password
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

  handleNameInput = name => event => {
    this.setState({username: event.target.value});
    if (event.target.value.match(nameRegex)) {
      this.setState({
        username: event.target.value,
        nameError: false,
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
        emailError: false,
      });
    } else {
      this.setState({
        emailError: true,
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

  handleBeforeUpload = (files) => {
         this.setState({
             filesToBeSent: files
         });
         console.log(this.state.filesToBeSent)
     }


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
                 window.location.reload();
             } else if (code === 400) {
                 localStorage.removeItem('usertoken');
             }
         })
         .catch((error) => {
             console.log(error);
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
      // 'password': this.state.password,
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
          this.setState({
            emailError:false,
            nameError:false,
          });
          // get token for userid
          var token = getLocal("usertoken")
          var jwt_decode = require('jwt-decode');
          var decoded = jwt_decode(token);
          console.log(decoded)
          this.child.current.beginUpload(decoded.user_id);

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

  onDrop = (uploaded) => {
    this.setState({picture:uploaded});
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

                <div className="pic"
                  style={{
                    backgroundImage: `url(${this.state.picture})`,
                    backgroundSize: 'cover',
                  }}
                  >

                  <UploadImg
                    inputClass="from-profile"
                    resource_type="user"
                    onUploadImg={this.handleUploadImg}
                    ref={this.child} hint="Update"
                    />
                </div>
                <div className="textfield">
                  <TextField
                      label="Username"
                      defaultValue={this.state.username}
                      className="standard-read-only-input"
                      // margin="normal"
                      InputProps={{ readOnly: this.state.readOnly, }}
                      error={this.state.nameError}
                      variant="filled"
                      value={this.state.username}
                      onChange={this.handleNameInput('name')}
                  />
                </div>
                {
                    this.state.nameError && this.state.errorMsg !== ""
                    ?
                    <FormHelperText error={true}>{this.state.errorMsg}</FormHelperText>
                    :
                    <div></div>
                }
                <div className="textfield">
                  <TextField
                        label="E-mail"
                        defaultValue={this.state.email}
                        className="standard-read-only-input"
                        //margin="normal"
                        InputProps={{readOnly: this.state.readOnly,}}
                        error={this.state.emailError}
                        variant="filled"
                        value={this.state.email}
                        onChange={this.handleEmailInput('email')}
                  />
                </div>
                {
                    this.state.emailError && this.state.errorMsg !== ""
                    ?
                    <FormHelperText error={true}>{this.state.errorMsg}</FormHelperText>
                    :
                    <div></div>
                }
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
                {/* Reset password */}
                <Dialog />

                {/* Save/ Edit button */}
                {button}
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
