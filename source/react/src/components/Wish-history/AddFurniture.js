import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './MyFurniture.css';
import Button from '@material-ui/core/Button';
import './AddFurniture.css';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import '../uploadImg/UploadImg'


class Add extends Component{


    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };
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

              <div className="form">
              <form>
                <TextField
                  id="standard-name"
                  label="Name"
                  className={this.props.textField}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
                <br/>
                <TextField
                  id="standard-name"
                  label="$"
                  className={this.props.textField}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
                <br/>
                <TextField
                  id="outlined-multiline-static"
                  label="Add a description"
                  multiline
                  rows="5"
                  className={this.props.textField}
                  margin="normal"
                  variant="outlined"
                />
                <br/>
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
              </form>
              </div>
        </div>
    )
  }

}
Add.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Add
