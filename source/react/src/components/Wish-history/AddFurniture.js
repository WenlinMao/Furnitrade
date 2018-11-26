import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './MyFurniture.css';
import './AddFurniture.css';

import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import {setLocal, getLocal} from '../../utils/util';
import {UploadImg} from '../uploadImg/UploadImg';
// import '../uploadImg/UploadImg'


class Add extends Component{
  constructor(props) {
      super(props);
      this.state = {
          name: '',
          price: '',
          description: '',
          address: '',
      };
      this.child = React.createRef();
  }

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };

    // returm true if any of inputs are invalid
    checkButtonStatus = () => {
        
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

    render(){
        const { classes } = this.props;

        return(
          <div>
              {/*part 1: Nav bar*/}
              <NavBar/>
              <div className="heading">
                <h2>Add your furniture</h2>
                <Wave/>
              </div>

              <UploadImg resource_type="user"
                name={this.state.username}
                beforeUpload={this.handleBeforeUpload}
                onUploadImg={this.handleUploadImg}
                disabled={this.checkButtonStatus()}
                ref={this.child}
                />

              <form className="form">
                <TextField
                  id="standard-name"
                  label="Name"
                  className={this.props.textField}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />

                <TextField
                  id="standard-name"
                  label="$"
                  className={this.props.textField}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />

                <TextField
                  id="outlined-multiline-static"
                  label="Add a description"
                  multiline
                  rows="5"
                  className={this.props.textField}
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  id="outlined-multiline-flexible"
                  label="Add an address"
                  multiline
                  rowsMax="4"
                  onChange={this.handleChange('multiline')}
                  className={this.props.textField}
                  margin="normal"
                  variant="outlined"
                />
                <button> Submit </button>
              </form>

        {/* the very last div tag */}
        </div>
    )
  }

}
Add.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Add
