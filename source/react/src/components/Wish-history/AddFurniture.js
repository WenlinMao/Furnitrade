import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './MyFurniture.css';
import './AddFurniture.css';

import PropTypes from 'prop-types';
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
