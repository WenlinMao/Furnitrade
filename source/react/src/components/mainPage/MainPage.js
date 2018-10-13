import React, { Component } from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import NavigationBar from '../common/NavigationBar';

var sectionStyle = {
  width: "100%",
  height: "800px",
};

const theme = createMuiTheme({
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
    error: {
      light: '#f7ca7f',
      main: '#F6BD60',
      dark: '#ac8443',
    },
  },
    typography: {
      fontFamily: '"Righteous", sans-serif',
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
          {/* <img src = {landing}></img> */}
          {/* TODO */}
          <h1> Hello, World</h1>
          <h2>this is a test message</h2>
        </div>
        </MuiThemeProvider>
      );
    }
  }
  
  export default MainPage;