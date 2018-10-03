import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = {
  root:{
    // TODO
  },

  title:{

  }

};

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#3A8FB7', 
      }
    },
    typography: {
    //   fontFamily: '"Poppins", sans-serif',
    },
  });

  class MainPage extends Component {
    render() {

      const {classes} = this.props;
      return (
        <MuiThemeProvider theme = {theme}>
        <div>
            {/* items - to be put in the main page */}
        </div>
        </MuiThemeProvider>
     );
    }
  }
  
  mainPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(mainPage);