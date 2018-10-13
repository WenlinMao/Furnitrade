import React, { Component } from 'react';
// import teal from '@material-ui/core/colors/teal';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import landing from '../../static/images/test.gif';
import NavigationBar from '../common/NavigationBar';

var sectionStyle = {
  width: "100%",
  height: "800px",
};

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#134074', 
      }
    },
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },
  });

  // set up the breakpoints
  const styles = theme => ({
    root: {
      [theme.breakpoints.between('sm', 'md')]: {
        backgroundColor: 'red',
      },
    },
  });

  class MainPage extends Component {
    render() {
      return (
        <MuiThemeProvider theme = {theme}>
        
        <NavigationBar/>
        <div class = "img-intro">
          <img src = {landing}></img>
          {/* TODO */}
          <h1> Hello, World</h1>
          <h2>this is a test message</h2>
        </div>
        </MuiThemeProvider>
      );
    }
  }
  
  export default MainPage;