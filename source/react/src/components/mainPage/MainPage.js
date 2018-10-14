import React, { Component } from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import NavigationBar from '../common/NavigationBar';
import { fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

var textStyle = {
  fadeIn: {
    animation: 'x 3s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
};

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

  class MainPage extends Component {
    render() {
      return (
        <MuiThemeProvider theme = {MainTheme}>
        
          <NavigationBar/>
          <div class = "img-intro">
            {/* <img src = {landing}></img> */}
            {/* TODO */}
            <StyleRoot>
            <div class="slogan-msg" style={textStyle.fadeIn}>
              <h1> Hello, World</h1>
              <h2>this is a test message</h2>
            </div>
            </StyleRoot>
          </div>
        </MuiThemeProvider>
      );
    }
  }
  
  export default withStyles(textStyle)(MainPage)
  // export default MainPage;